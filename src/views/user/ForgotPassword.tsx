import * as React from "react";
import {UserService} from "../../services/UserService";
import {history} from "../../App";

interface IForgotPasswordState {
    email: string,
    loading: boolean,
    error: string
}

class ForgotPassword extends React.Component<{}, IForgotPasswordState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
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
        this.setState({
            email: e.target.value
        });
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            UserService.forgotPassword(this.state.email)
                .then(() => {
                    alert("Votre demande de réinitialisation de mot de passe a bien été envoyée. Vous allez recevoir un mail à l'adresse indiquée, merci de le consulter et d'en suivre les instructions.");
                    history.push("/");
                }, error => {
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <div className="forgot-password container">
                <h1 className="main-title text-center">
                    Mot de passe oublié
                </h1>
                <p className="forgot-password-help">
                    Pour réinitialiser votre mot de passe, merci de rentrer votre adresse email. Vous recevrez un mail vous permettant d'entrer un nouveau mot de passe.
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
                                    id="forgotPasswordEmail"
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

                            <button
                                type="submit"
                                className="btn btn-orange forgot-password-btn"
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

export default ForgotPassword;
