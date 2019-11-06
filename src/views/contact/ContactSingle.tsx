import * as React from "react";
import Form from "./Form";
import {Link} from "react-router-dom";

interface IContactProps {
}

interface IContactState {

}

class ContactSingle extends React.Component<IContactProps, IContactState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="contact-single container">
                <h1 className="main-title">
                    Nous contacter
                </h1>
                <div className="contact-pro-form">
                    Vous êtes une entreprise et souhaitez échanger à propos de l'avenir de notre projet ?
                    <Link to="/contact-pro" className="contact-pro-form-link">C'est ici</Link>
                </div>
                <Form isFormPro={false}/>
            </div>
        )
    }
}

export default ContactSingle;
