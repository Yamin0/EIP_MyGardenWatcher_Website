import * as React from "react";
import {UserService} from "../../services/UserService";
import { createBrowserHistory } from 'history';

interface IRegisterProps {
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

        this.setState({
            ...this.state,
            [name]: value,
        });
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget.parentElement as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            UserService.register(this.state.email, this.state.password)
                .then(
                    () => {
                        const from ={ pathname: "/" };
                        createBrowserHistory().push(from);
                    },
                    error => {
                        this.setState({ error, loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <form className="form col-6 needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                <h2 className="second-title">Inscription</h2>
                <div className="form-group">
                    <label className="col-form-label">Email</label>
                    <input id="registerEmail" className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange} required={true}/>
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
                    <input id="registerRepeatPassword" className="form-control" type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} required={true}/>
                    <div className="invalid-feedback">
                        Les mots de passe que vous avez entré ne sont pas identiques.
                    </div>
                </div>
                <button type="submit" className="btn btn-green" disabled={this.state.loading}>Je m'inscris</button>
                {this.state.error &&
                <div className="alert alert-danger">
                    {this.state.error}
                </div>}
            </form>
        )
    }
}

export default Register;
