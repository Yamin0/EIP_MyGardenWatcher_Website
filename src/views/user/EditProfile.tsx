import * as React from "react";
import {UserService} from "../../services/UserService";
// @ts-ignore
import DatePicker from "react-datepicker";
// @ts-ignore
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import User from "../../interfaces/User";

registerLocale('fr', fr);

interface IEditProfileProps {
    user: User,
    checkToken(): void
}

interface IEditProfileState {
    formUser: User,
    repeatEmail: string,
    repeatNewPassword: string,
    loading: boolean,
    error: string
}

class EditProfile extends React.Component<IEditProfileProps, IEditProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formUser: this.props.user,
            repeatEmail: "",
            repeatNewPassword: "",
            loading: false,
            error: ""
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleDateChange(date: string) {
        this.setState((state) => ({
            formUser: {
                ...state.formUser,
                birthDay: new Date(date)
            }
        }));
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }

        const name = e.target.name;
        const value = e.target.value;

        if (!e.target.required && value === "") {
            (e.target.parentElement as HTMLElement).classList.remove("was-validated");
        }

        if (this.state.formUser.newPassword !== "") {
            if ((name === "newPassword" && value !== "" && value !== this.state.repeatNewPassword) ||
                (name === "repeatNewPassword" && value !== this.state.formUser.newPassword)) {
                (document.getElementById("EditProfileRepeatNewPassword") as HTMLInputElement).setCustomValidity("password mismatch");
            } else if ((name === "newPassword" && value !== "" && value === this.state.repeatNewPassword) ||
                (name === "repeatNewPassword" && value === this.state.formUser.newPassword)) {
                (document.getElementById("EditProfileRepeatNewPassword") as HTMLInputElement).setCustomValidity("");
            }
        }

        if (this.state.formUser.email !== this.props.user.email) {
            if ((name === "email" && value !== this.state.repeatEmail) ||
                (name === "repeatEmail" && value !== this.state.formUser.email)) {
                (document.getElementById("EditProfileRepeatEmail") as HTMLInputElement).setCustomValidity("email mismatch");
            } else if ((name === "email" && value === this.state.repeatEmail) ||
                (name === "repeatEmail" && value === this.state.formUser.email)) {
                (document.getElementById("EditProfileRepeatEmail") as HTMLInputElement).setCustomValidity("");
            }
        }

        let repeatProps = {};
        if (name === "email" && value === this.props.user.email) repeatProps = { repeatEmail: "" };
        if (name === "newPassword" && value === "") repeatProps = { repeatNewPassword: "" };

        if (name === "repeatEmail" || name === "repeatNewPassword") {
            this.setState((state) => ({
                ...state,
                [name]: value,
            }));
        } else {
            this.setState((state) => ({
                ...state,
                ...repeatProps,
                formUser: {
                    ...state.formUser,
                    [name]: value,
                }
            }));
        }
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
/*            UserService.editProfile()
                .then(
                    () => {
                        window.location.reload();
                    },
                    error => {
                        this.setState({ error: error.statusText, loading: false })
                    }
                );*/
        }
    }

    componentDidMount(): void {
        this.props.checkToken();
    }

    render() {
        const { email, password, newPassword, firstName, lastName, address, birthDay } = this.state.formUser;

        return (
            <div className="edit-profile container">
                <h1 className="main-title text-center">
                    Mes informations personnelles
                </h1>
                <div className="row">
                    <form className="form col-9 needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                        {this.state.loading ?
                            <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            : ""}
                        {
                            this.state.error !== "" ?
                                <div className="">
                                    {this.state.error}
                                </div>
                                : ""
                        }

                        <div className="form-group row">
                            <label htmlFor="LastName" className="col-form-label col-md-3">
                                Nom
                            </label>
                            <input
                                className="form-control  col-md-9"
                                type="text"
                                name="lastName"
                                id="LastName"
                                value={lastName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="FirstName" className="col-form-label  col-md-3">
                                Prénom
                            </label>
                            <input
                                className="form-control col-md-9"
                                type="text"
                                name="firstName"
                                id="FirstName"
                                value={firstName}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group row">
                            <label htmlFor="Address" className="col-form-label col-md-3">
                                Adresse postale
                            </label>
                            <input
                                className="form-control col-md-9"
                                type="text"
                                name="address"
                                id="Address"
                                value={address}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group row no-gutters">
                            <label htmlFor="EditProfileBirthDate" className="col-form-label col-md-3 edit-profile-label">
                                Date de naissance
                            </label>
                            <div className="col-md-9">
                                <DatePicker
                                    selected={birthDay}
                                    onChange={this.handleDateChange}
                                    id="EditProfileBirthDate"
                                    dropdownMode="select"
                                    locale="fr"
                                    showYearDropdown
                                    showMonthDropdown
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control edit-profile-datepicker"
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="EditProfileEmail" className="col-form-label col-md-3">
                                Email
                            </label>
                            <input
                                id="EditProfileEmail"
                                className="form-control col-md-9"
                                type="email"
                                name="email"
                                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                value={email}
                                onChange={this.handleChange}
                                required={true}
                            />
                            <div className="invalid-feedback">
                                Merci d'entrer une adresse email valide.
                            </div>
                        </div>

                        {
                            email !== this.props.user.email ?
                                <div className="form-group row">
                                    <label htmlFor="EditProfileEmail" className="col-form-label col-md-3">
                                        Confirmation du nouvel email
                                    </label>
                                    <input
                                        id="EditProfileRepeatEmail"
                                        className="form-control col-md-9"
                                        type="email"
                                        name="repeatEmail"
                                        value={this.state.repeatEmail}
                                        onChange={this.handleChange}
                                        required={true}
                                    />
                                    <div className="invalid-feedback">
                                        Les adresses email que vous avez entrés ne sont pas identiques.
                                    </div>
                                </div>
                                : ""
                        }

                        <div className="form-group row">
                            <label htmlFor="EditProfileNewPassword" className="col-form-label col-md-3">
                                Nouveau mot de passe
                            </label>
                            <input
                                id="EditProfileNewPassword"
                                className="form-control col-md-9"
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={this.handleChange}
                                minLength={8}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                            />
                            <div className="invalid-feedback">
                                Votre mot de passe doit faire au moins 8 caractères, contenir une lettre minuscule, une lettre majuscule et un chiffre.
                            </div>
                        </div>

                        {
                            newPassword !== "" ?
                                <div className="form-group row">
                                    <label htmlFor="EditProfileRepeatNewPassword" className="col-form-label col-md-3">
                                        Confirmation du mot de passe
                                    </label>
                                    <input
                                        id="EditProfileRepeatNewPassword"
                                        className="form-control col-md-9"
                                        type="password"
                                        name="repeatNewPassword"
                                        value={this.state.repeatNewPassword}
                                        onChange={this.handleChange}
                                        required={true}
                                    />
                                    <div className="invalid-feedback">
                                        Les mots de passe que vous avez entrés ne sont pas identiques.
                                    </div>
                                </div>
                                : ""
                        }

                        <div className="form-group row">
                            <label htmlFor="EditProfilePassword" className="col-form-label col-md-3">
                                Mot de passe actuel
                            </label>
                            <input
                                id="EditProfilePassword"
                                className="form-control col-md-9"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                minLength={8}
                                required={true}
                            />
                            <div className="invalid-feedback">
                                Votre mot de passe ne contient pas assez de caractères.
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-green register-btn"
                            disabled={this.state.loading}
                        >
                            Valider
                        </button>

                        {
                            this.state.error &&
                            <div className="alert alert-danger">
                                {this.state.error}
                            </div>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProfile;
