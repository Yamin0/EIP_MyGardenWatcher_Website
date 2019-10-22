import * as React from "react";

interface IFormProps {
    isFormPro: boolean
}

interface IFormState {
    firstName: string,
    lastName: string,
    email: string,
    title: string,
    message: string,
}

class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            title: "",
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        }
    }

    render() {
        return (
                <form className="form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="col-form-label">Nom</label>
                            <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required={true}/>
                            <div className="invalid-feedback">
                                Ce champ est obligatoire.
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">Prénom</label>
                            <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required={true}/>
                            <div className="invalid-feedback">
                                Ce champ est obligatoire.
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">Email</label>
                            <input
                                id="contactEmail"
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
                    </div>
                        <div className="form-group">
                            <label className="col-form-label">Objet</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                maxLength={40}
                                required={true}
                            />
                            <small className="form-text text-muted">(max: 40 caractères)</small>                            <div className="invalid-feedback">
                                Ce champ est obligatoire.
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Message</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                required={true}
                                minLength={80}
                            />
                            <small className="form-text text-muted">Vous avez actuellement {this.state.message.length} caractères (min: 80 caractères)</small>
                            <div className="invalid-feedback">
                                Ce champ est obligatoire et doit comporter au minimum 80 caractères.
                            </div>
                        </div>
                    <button type="submit" className="btn btn-orange">Envoyer</button>
                </form>
        )
    }
}

export default Form;
