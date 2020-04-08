import * as React from "react";
import {UserService} from "../../services/UserService";
import { createBrowserHistory } from 'history';

interface IRegisterProps {
    connect(): void,
}

interface IRegisterState {
    email: string,
    password: string,
    repeatPassword: string,
    loading: boolean,
    error: string
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
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
            (document.getElementById("registerRepeatPassword") as HTMLInputElement).setCustomValidity("password mismatch");
        } else if ((name === "password" && value === this.state.repeatPassword) ||
            (name === "repeatPassword" && value === this.state.password)) {
            (document.getElementById("registerRepeatPassword") as HTMLInputElement).setCustomValidity("");
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
            UserService.register(this.state.email, this.state.password)
                .then(
                    () => {
                        const from ={ pathname: "/edit-profile" };
                        createBrowserHistory().push(from);
                        window.location.reload();
                        this.props.connect();
                    }, error => {
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <div className="register container">
                <h1 className="main-title orange text-center">
                    Créer un compte
                </h1>
                <div className="row no-gutters">

                    <div className="col-6">
                        <img src="/images/visuel-register.jpeg" className="img-fluid" alt=""/>
                    </div>

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
                                    id="registerEmail"
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
                                    id="registerPassword"
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
                                    id="registerRepeatPassword"
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
                                className="btn btn-green register-btn"
                                disabled={this.state.loading}
                            >
                                Je m'inscris
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default Register;
