import * as React from "react";
import {UserService} from "../../services/UserService";
import {createBrowserHistory} from "history";

interface IRegisterProps {
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
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            ...this.state,
            [name]: value,
        });
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
                        const from ={ pathname: "/" };
                        createBrowserHistory().push(from);
                        window.location.reload();
                    },
                    error => {
                        this.setState({ error: error.statusText, loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <form className="form col-6 needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                <div className="form-wrapper">
                    <h2 className="second-title">Accéder à mon espace personnel</h2>
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
                        />
                        <div className="invalid-feedback">
                            Merci d'entrer une adresse email valide.
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            id="loginPassword"
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            minLength={8}
                            required={true}/>
                        <div className="invalid-feedback">
                            Votre mot de passe ne contient pas assez de caractères.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-green" disabled={this.state.loading}>Je me connecte</button>
                    {this.state.error &&
                    <div className="alert alert-danger">
                        {this.state.error}
                    </div>}
                </div>
            </form>
        )
    }
}

export default Login;
