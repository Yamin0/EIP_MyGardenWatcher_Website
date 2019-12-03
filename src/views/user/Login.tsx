import * as React from "react";
import {UserService} from "../../services/UserService";
import {history} from "../../App";
// @ts-ignore
import ClickOutComponent from "react-clickout-handler";
import {Link} from "react-router-dom";

interface IRegisterProps {
    connect(): void,
    closePopin(): void
}

interface IRegisterState {
    email: string,
    password: string,
    loading: boolean,
    error: string
}

class Login extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnClickOutsidePopin = this.handleOnClickOutsidePopin.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }

        const name = e.target.name;
        const value = e.target.value;

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
            UserService.login(this.state.email, this.state.password)
                .then(
                    () => {
                        const from ={ pathname: window.location.pathname };
                        history.push(from);
                        window.location.reload();
                        this.props.connect();
                    },
                    error => {
                        this.setState({ error: error.statusText, loading: false })
                    }
                );
        }
    }

    private handleOnClickOutsidePopin(event: React.MouseEvent): void {
        if ((event.target as HTMLButtonElement).id !== "btn-login") {
            this.props.closePopin();
        }
    }

    render() {
        return (
            <ClickOutComponent onClickOut={this.handleOnClickOutsidePopin}>
                <div className={"login" + (this.state.loading ? " loading" : "")} id="popin-login">
                    <span title="Fermer la popin" onClick={this.props.closePopin} className="login-close">&times;</span>
                    <form className="form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
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

                            <h2 className="second-title login-title">Se connecter</h2>
                            <div className="form-group">
                                <label className="col-form-label">Email</label>
                                <input
                                    id="loginEmail"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required={true}
                                    tabIndex={1}
                                />
                                <div className="invalid-feedback">
                                    Merci d'entrer une adresse email valide.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Mot de passe</label>
                                <Link to="/forgot-password" className="login-password-link">Mot de passe oublié ?</Link>
                                <input
                                    id="loginPassword"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    minLength={8}
                                    required={true}
                                    tabIndex={2}
                                />
                                <div className="invalid-feedback">
                                    Votre mot de passe ne contient pas assez de caractères.
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-green"
                                disabled={this.state.loading}
                            >
                                Connexion
                            </button>

                            <Link to="/register" className="login-link">S'inscrire</Link>

                            {
                                this.state.error &&
                                <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            }
                        </div>
                    </form>

                </div>
            </ClickOutComponent>
        )
    }
}

export default Login;
