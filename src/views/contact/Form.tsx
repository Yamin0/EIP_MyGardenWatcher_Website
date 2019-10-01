import * as React from "react";

interface IFormProps {
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
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    render() {
        return (
                <form className="form">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Nom</label>
                            <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Prénom</label>
                            <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Email</label>
                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                    </div>
                        <div className="form-group">
                            <label>Objet</label>
                            <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-control" rows={5} name="message" value={this.state.message} onChange={this.handleChange}/>
                        </div>
                    <button type="submit" className="btn btn-orange">Envoyer</button>
                </form>
        )
    }
}

export default Form;
