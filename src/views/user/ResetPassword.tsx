import * as React from "react";
import {UserService} from "../../services/UserService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {history} from "../../App";

interface RouteInfo {
    token: string,
}

interface IResetPasswordState {
    email: string,
    password: string,
    repeatPassword: string,
    loading: boolean,
    error: string
}

class ResetPassword extends React.Component<RouteComponentProps<RouteInfo>, IResetPasswordState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword: "",
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }

        const name = e.target.name;
        const value = e.target.value;

        if ((name === "password" && value !== this.state.repeatPassword) ||
            (name === "repeatPassword" && value !== this.state.password)) {
            (document.getElementById("repeatPassword") as HTMLInputElement).setCustomValidity("password mismatch");
        } else if ((name === "password" && value === this.state.repeatPassword) ||
            (name === "repeatPassword" && value === this.state.password)) {
            (document.getElementById("repeatPassword") as HTMLInputElement).setCustomValidity("");
        }

        this.setState((state) => ({
            ...state,
            [name]: value,
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            UserService.resetPassword(this.state.email, this.state.password, this.props.match.params.token)
                .then(() => {
                        alert("Votre mot de passe a bien été changé. Vous pouvez désormais vous connecter à votre espace client avec vos nouveaux identifiants.");
                        history.push("/");
                    }, error => {
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <div className="reset-password container">
                <h1 className="main-title text-center">
                    Réinitialisation de mot de passe
                </h1>
                <p className="reset-password-help">
                    Pour réinitialiser votre mot de passe, merci de rentrer votre adresse email ainsi que le nouveau mot de passe choisi. Lorsque le changement aura été validé, vous pourrez vous connecter à votre espace client avec vos nouveaux identifiants.
                </p>
                <div className="row no-gutters">
                    <form className="form col-6 needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                        <div className="form-wrapper">
                            {
                                this.state.loading ?
                                    <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }

                            {
                                this.state.error !== "" ?
                                    <div className="error">
                                        <span className="oi oi-warning"/>
                                        {this.state.error}
                                    </div>
                                    :
                                    ""
                            }

                            <div className="form-group">
                                <label className="col-form-label">Email</label>
                                <input
                                    id="resetPasswordEmail"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required={true}
                                />
                                <div className="invalid-feedback">
                                    Merci d'entrer une adresse email valide.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input
                                    id="password"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    minLength={8}
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                    required={true}/>
                                <div className="invalid-feedback">
                                    Votre mot de passe doit faire au moins 8 caractères, contenir une lettre minuscule, une lettre majuscule et un chiffre.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirmation du mot de passe</label>
                                <input
                                    id="repeatPassword"
                                    className="form-control"
                                    type="password"
                                    name="repeatPassword"
                                    value={this.state.repeatPassword}
                                    onChange={this.handleChange}
                                    required={true}
                                />
                                <div className="invalid-feedback">
                                    Les mots de passe que vous avez entré ne sont pas identiques.
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-orange reset-password-btn"
                                disabled={this.state.loading}
                            >
                                Valider
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default withRouter(ResetPassword);
