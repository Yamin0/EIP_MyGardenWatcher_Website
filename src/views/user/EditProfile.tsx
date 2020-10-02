import * as React from "react";
import {UserService} from "../../services/UserService";
// @ts-ignore
import DatePicker from "react-datepicker";
// @ts-ignore
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import User from "../../interfaces/User";
import UserMenu from "../shared/UserMenu";

registerLocale('fr', fr);

interface IEditProfileProps {
    user: User,
    checkToken(): void,
    getUser(): void,
    disconnect(): void
}

interface IEditProfileState {
    formUser: User,
    repeatEmail: string,
    newPassword: string,
    repeatNewPassword: string,
    loading: boolean,
    error: string,
    changePassword: boolean,
    editInfo: boolean
}

interface ICustomInputProps {
    value: Date,
    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const ExampleCustomInput: React.FunctionComponent<ICustomInputProps> = ({ value , onClick}) => (
    <button className="form-control edit-profile-datepicker" type="button" onClick={onClick}>
        {value}
    </button>
);

class EditProfile extends React.Component<IEditProfileProps, IEditProfileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formUser: this.props.user,
            repeatEmail: "",
            newPassword: "",
            repeatNewPassword: "",
            loading: false,
            error: "",
            changePassword: false,
            editInfo: false
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    private handleDateChange(date: Date) {
        this.setState((state) => ({
            editInfo: date.toDateString() !== this.props.user.birthdate.toDateString(),
            formUser: {
                ...state.formUser,
                birthdate: date
            }
        }));
    }

    private handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.checked;

        console.log((this.props.user as any)[name]);
        this.setState((state) => ({
            editInfo: value !== (this.props.user as any)[name],
            formUser: {
                ...state.formUser,
                [name]: value,
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

        if (this.state.newPassword !== "") {
            if ((name === "newPassword" && value !== "" && value !== this.state.repeatNewPassword) ||
                (name === "repeatNewPassword" && value !== this.state.newPassword)) {
                (document.getElementById("EditProfileRepeatNewPassword") as HTMLInputElement).setCustomValidity("password mismatch");
            } else if ((name === "newPassword" && value !== "" && value === this.state.repeatNewPassword) ||
                (name === "repeatNewPassword" && value === this.state.newPassword)) {
                (document.getElementById("EditProfileRepeatNewPassword") as HTMLInputElement).setCustomValidity("");
            }
            else if (name === "newPassword" && value === "") {
                (document.getElementById("EditProfileRepeatNewPassword") as HTMLInputElement).setCustomValidity("");
            }
        }

        if (this.state.formUser.mail !== this.props.user.mail) {
            if ((name === "email" && value !== this.state.repeatEmail) ||
                (name === "repeatEmail" && value !== this.state.formUser.mail)) {
                (document.getElementById("EditProfileRepeatEmail") as HTMLInputElement).setCustomValidity("email mismatch");
            } else if ((name === "email" && value === this.state.repeatEmail) ||
                (name === "repeatEmail" && value === this.state.formUser.mail)) {
                (document.getElementById("EditProfileRepeatEmail") as HTMLInputElement).setCustomValidity("");
            }
        }

        let repeatProps = {};
        if (name === "email" && value === this.props.user.mail) repeatProps = { repeatEmail: "" };
        if (name === "newPassword" && value === "") repeatProps = { repeatNewPassword: "" };

        if (name === "repeatEmail" || name === "newPassword" || name === "repeatNewPassword") {
            this.setState((state) => ({
                ...state,
                ...repeatProps,
                changePassword: (name.includes("Password") ? value !== (this.props as any)[name] : false),
                editInfo: (name.includes("Password") ? false : value !== (this.props as any)[name]),
                [name]: value,
            }));
        } else {
            this.setState((state) => ({
                ...state,
                ...repeatProps,
                editInfo: name === "password" ? state.editInfo : value !== (this.props as any)[name],
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
        } else if (this.state.changePassword && this.state.editInfo) {
            this.setState({
                error: "Vous ne pouvez pas éditer vos informations personnelles et modifier votre mot de passe en même temps. Merci de recommencer.",
                formUser: this.props.user,
                newPassword: "",
                repeatNewPassword: "",
                repeatEmail: ""
            });
        } else if (!this.state.changePassword && !this.state.editInfo) {
          return;
        } else {
            this.setState({ loading: true });
            if (this.state.changePassword && !this.state.editInfo) {
                UserService.changePassword(this.props.user.mail, this.state.formUser.password, this.state.newPassword)
                    .then(
                        () => {
                            alert("Votre mot de passe a bien été modifié.");
                            this.setState({
                                formUser: this.props.user,
                                repeatEmail: "",
                                newPassword: "",
                                repeatNewPassword: "",
                                loading: false,
                                error: "",
                                changePassword: false,
                                editInfo: false
                            });
                            window.location.reload();
                        },
                        error => {
                            window.scrollTo(0, 0);
                            this.setState({ error: error.toString(), loading: false })
                        }
                    );
            }
            if (this.state.editInfo && !this.state.changePassword) {
                UserService.setUser(this.state.formUser)
                    .then(
                        () => {
                            alert("Vos informations personnelles ont bien été modifiées.");
                            this.setState({loading: false});
                            window.location.reload();
                            this.props.getUser();
                            },
                        error => {
                            window.scrollTo(0, 0);
                            this.setState({ error: error.toString(), loading: false })
                        }
                    );
            }
        }
    }

    private handleDeleteAccount(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        (document.getElementsByClassName("modal-backdrop")[0] as HTMLDivElement).remove();
        this.setState({loading: true});
        UserService.deleteAccount()
            .then(this.props.disconnect,
                error => {
                this.setState({error: error.toString(), loading: false});
                }
            )
    }

    componentDidMount(): void {
        this.props.checkToken();
        this.props.getUser();
    }

    componentDidUpdate(prevProps: Readonly<IEditProfileProps>, prevState: Readonly<IEditProfileState>, snapshot?: any) {
        if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
            this.setState({
                formUser: this.props.user,
                repeatEmail: "",
                newPassword: "",
                repeatNewPassword: "",
                loading: false,
                error: "",
                changePassword: false,
                editInfo: false
            })
        }
    }

    render() {
        const { mail, password, firstName, lastName, geoLoc, birthdate, receiveMail } = this.state.formUser;

        return (
            <div className="edit-profile container">
                <h1 className="main-title orange text-center">
                    Mon espace client
                </h1>
                <div className="row">
                    <UserMenu disconnect={this.props.disconnect}/>
                    <form className="form col-9 needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                        {this.state.loading &&
                            <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }

                        {
                            this.state.error !== "" &&
                                <div className="error">
                                    <span className="oi oi-warning"/>
                                    {this.state.error}
                                </div>
                        }

                        <div className="row">
                            <h4 className="text-left col-12 edit-profile-subtitle">Modifier mes informations personnelles</h4>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="LastName" className="col-form-label col-md-3">
                                Nom
                            </label>
                            <input
                                className="form-control col-md-9"
                                type="text"
                                name="lastName"
                                id="LastName"
                                value={lastName}
                                onChange={this.handleChange}
                                disabled={this.state.changePassword}
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
                                disabled={this.state.changePassword}
                            />
                        </div>

                        <div className="form-group row">
                            <label htmlFor="Address" className="col-form-label col-md-3">
                                Adresse postale
                            </label>
                            <input
                                className="form-control col-md-9"
                                type="text"
                                name="geoLoc"
                                id="Address"
                                value={geoLoc}
                                onChange={this.handleChange}
                                disabled={this.state.changePassword}
                            />
                        </div>

                        <div className="form-group row no-gutters">
                            <label htmlFor="EditProfileBirthDate" className="col-form-label col-md-3 edit-profile-label">
                                Date de naissance
                            </label>
                            <div className="col-md-9">
                                <DatePicker
                                    selected={birthdate}
                                    onChange={this.handleDateChange}
                                    id="EditProfileBirthDate"
                                    dropdownMode="select"
                                    locale="fr"
                                    maxDate={new Date()}
                                    showYearDropdown
                                    showMonthDropdown
                                    dateFormat="dd/MM/yyyy"
                                    customInput={React.createElement(ExampleCustomInput)}
                                    disabled={this.state.changePassword}
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
                                name="mail"
                                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                value={mail}
                                onChange={this.handleChange}
                                required={true}
                                disabled={this.state.changePassword}
                            />
                            <div className="invalid-feedback">
                                Merci d'entrer une adresse email valide.
                            </div>
                        </div>

                        {
                            mail !== this.props.user.mail &&
                                <div className="form-group row">
                                    <label htmlFor="EditProfileRepeatEmail" className="col-form-label col-md-3">
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
                        }

                        <input
                            className="edit-profile-newsletter"
                            id="AcceptNewsletter"
                            type="checkbox"
                            checked={receiveMail}
                            name="receiveMail"
                            onChange={this.handleCheckboxChange}
                            disabled={this.state.changePassword}
                        />
                        <label htmlFor="AcceptNewsletter" className="col-form-label col-md-11">
                            J'accepte de recevoir des mails de promotion de la part de MyGardenWatcher.
                        </label>


                        <div className="row">
                            <h4 className="text-left col-12 edit-profile-subtitle second">Changer de mot de passe</h4>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="EditProfileNewPassword" className="col-form-label col-md-3">
                                Nouveau mot de passe
                            </label>
                            <input
                                id="EditProfileNewPassword"
                                className="form-control col-md-9"
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                minLength={8}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                disabled={this.state.editInfo}
                            />
                            <div className="invalid-feedback">
                                Votre mot de passe doit faire au moins 8 caractères, contenir une lettre minuscule, une lettre majuscule et un chiffre.
                            </div>
                        </div>
                        {
                            this.state.newPassword !== "" &&
                            <div className="form-group row">
                                <label htmlFor="EditProfileRepeatNewPassword" className="col-form-label col-md-3">
                                    Confirmation du nouveau mot de passe
                                </label>
                                <input
                                    id="EditProfileRepeatNewPassword"
                                    className="form-control col-md-9"
                                    type="password"
                                    name="repeatNewPassword"
                                    value={this.state.repeatNewPassword}
                                    onChange={this.handleChange}
                                    required={this.state.newPassword !== ""}
                                    disabled={this.state.editInfo}
                                />
                                <div className="invalid-feedback">
                                    Les mots de passe que vous avez entrés ne sont pas identiques.
                                </div>
                            </div>
                        }

                        <div className="row">
                            <p className="text-left col-12 edit-profile-password">
                                Pour valider vos changements, merci de rentrer votre mot de passe actuel.
                            </p>
                        </div>

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

                        <div className="row justify-content-start">
                            <button
                                type="submit"
                                className="btn btn-green edit-profile-button"
                                disabled={(!this.state.editInfo && !this.state.changePassword) || this.state.loading}
                            >
                                Valider
                            </button>
                        </div>

                        <div className="row">
                            <button
                                type="button"
                                className="btn btn-orange edit-profile-delete"
                                data-toggle="modal"
                                data-target="#deleteModal"
                            >
                                Supprimer mon compte
                            </button>
                        </div>

                        <div className="modal delete fade" id="deleteModal" tabIndex={-1} role="dialog"
                             aria-labelledby="deleteModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="deleteModalLabel">
                                            Êtes-vous sûr de vouloir supprimer votre compte utilisateur ?
                                        </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Attention, c'est une suppression définitive, vous ne pourrez plus récupérer votre compte par la suite.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-green" data-dismiss="modal">
                                            Annuler
                                        </button>
                                        <button type="button" className="btn btn-orange" onClick={this.handleDeleteAccount}>Supprimer définitivement</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="row">

                </div>
            </div>
        )
    }
}

export default EditProfile;
