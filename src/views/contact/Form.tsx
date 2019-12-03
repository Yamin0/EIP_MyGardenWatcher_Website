import * as React from "react";
import {ContactService} from "../../services/ContactService";

enum EAskingType {
    NONE,
}

interface IFormProps {
    isFormPro: boolean
}

interface IFormState {
    companyName: string,
    firstName: string,
    lastName: string,
    type: EAskingType,
    email: string,
    phone: string,
    companyDescription: string,
    title: string,
    message: string,
    loading: boolean,
    error: string
}

class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            companyName: "",
            firstName: "",
            lastName: "",
            type: EAskingType.NONE,
            email: "",
            phone: "",
            companyDescription: "",
            title: "",
            message: "",
            loading: false,
            error: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "phone" && value !== "" && !value.match(/^[0-9]+$/)) {
            return;
        }

        if (name === "phone" && value === "") {
            (e.target.parentElement as HTMLElement).classList.remove("was-validated");
        }

        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }
        this.setState((state) => ({
            ...state,
            [name]: value
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            (this.props.isFormPro ? ContactService.contactPro() : ContactService.contactSingle())
                .then(() => { window.location.reload(); },
                    (error) => {
                    this.setState({ error: error.statusText, loading: false })
                });
        }
    }

    render() {
        return (
                <form className="form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
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
                            <div className="">
                                {this.state.error}
                            </div>
                            :
                            ""
                    }

                    <div className="form-row">
                        {
                            this.props.isFormPro ?
                                <div className="form-group col-md-4">
                                    <label htmlFor="CompanyName" className="col-form-label">
                                        Dénomination sociale de l'entreprise*
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="companyName"
                                        id="CompanyName"
                                        value={this.state.companyName}
                                        onChange={this.handleChange}
                                        required={true}
                                    />
                                    <div className="invalid-feedback">
                                        Ce champ est obligatoire.
                                    </div>
                                </div>
                                :
                                ""
                        }

                        <div className="form-group col-md-4">
                            <label htmlFor="LastName" className="col-form-label">
                                Nom{this.props.isFormPro ? " du représentant" : "*"}
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="lastName"
                                id="LastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                required={!this.props.isFormPro}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="FirstName" className="col-form-label">
                                Prénom{this.props.isFormPro ? " du représentant" : "*"}
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="firstName"
                                id="FirstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                required={!this.props.isFormPro}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="Email" className="col-form-label">
                                Email{this.props.isFormPro ? " du représentant" : ""}*
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                id="Email"
                                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required={true}
                            />
                            <div className="invalid-feedback">
                                Merci d'entrer une adresse email valide.
                            </div>
                        </div>

                        {
                            this.props.isFormPro ?
                                <div className="form-group col-md-4">
                                    <label htmlFor="PhoneNumber" className="col-form-label">
                                        Numéro de téléphone du représentant
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                        id="PhoneNumber"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        pattern="[0-9]{10}"
                                    />
                                    <div className="invalid-feedback">
                                        Merci d'entrer une numéro de téléphone valide (XX XX XX XX XX) composé uniquement de chiffres.
                                    </div>

                                </div>
                                :
                                ""
                        }
                    </div>

                    {
                        !this.props.isFormPro ?
                            <div className="form-group">
                                <label className="col-form-label">
                                    Type de demande*
                                </label>
                                <select
                                    className="form-control"
                                    value={this.state.title}
                                    required={true}
                                >
                                    <option value={EAskingType.NONE}>Autre</option>
                                    <option value={EAskingType.NONE}>Mise en place du produit</option>
                                    <option value={EAskingType.NONE}>Utilisation du produit</option>
                                    <option value={EAskingType.NONE}>Support technique pour l'objet connecté</option>
                                    <option value={EAskingType.NONE}>Matériel cassé / détérioré</option>
                                    <option value={EAskingType.NONE}>Problème de compte utilisateur</option>
                                    <option value={EAskingType.NONE}>Problème d'utilisation de l'application mobile</option>
                                    <option value={EAskingType.NONE}>A propos du projet</option>
                                </select>
                                <div className="invalid-feedback">
                                    Ce champ est obligatoire.
                                </div>
                            </div>
                            :
                            ""
                    }

                    {
                        this.props.isFormPro ?
                            <div className="form-group">
                                <label htmlFor="CompanyDescription" className="col-form-label">
                                    Description des activités de la société*
                                </label>
                                <textarea
                                    className="form-control"
                                    name="companyDescription"
                                    id="CompanyDescription"
                                    value={this.state.companyDescription}
                                    onChange={this.handleChange}
                                    maxLength={100}
                                    required={true}
                                    rows={2}
                                />
                                <small className="form-text text-muted">
                                    (max: 40 caractères)
                                </small>
                                <div className="invalid-feedback">
                                    Ce champ est obligatoire.
                                </div>
                            </div>
                            :
                            ""
                    }

                    <div className="form-group">
                        <label htmlFor="MessageTitle" className="col-form-label">
                            {this.props.isFormPro ? "Motif de la prise de contact*" : "Objet de la demande*"}
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            id="MessageTitle"
                            value={this.state.title}
                            onChange={this.handleChange}
                            maxLength={40}
                            required={true}
                        />
                        <small className="form-text text-muted">
                            (max: 40 caractères)
                        </small>
                        <div className="invalid-feedback">
                            Ce champ est obligatoire.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="MessageContent" className="col-form-label">
                            Message{this.props.isFormPro ? " de la société" : ""}*
                        </label>
                        <textarea
                            className="form-control"
                            rows={5}
                            name="message"
                            id="MessageContent"
                            value={this.state.message}
                            onChange={this.handleChange}
                            required={true}
                            minLength={80}
                        />
                        <small className="form-text text-muted">
                            Vous avez actuellement {this.state.message.length} caractères (min: 80 caractères)
                        </small>
                        <div className="invalid-feedback">
                            Ce champ est obligatoire et doit comporter au minimum 80 caractères.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-orange">Envoyer</button>
                    <small className="form-text text-muted form-annex">
                        *: ces champs sont obligatoires
                    </small>

                </form>
        )
    }
}

export default Form;
