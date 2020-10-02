import * as React from "react";
import Form from "./Form";
import User from "../../interfaces/User";

class ContactPro extends React.Component<{user: User, isAuthenticated: boolean}> {
    render() {
        return (
            <div className="contact-pro container">
                <h1 className="main-title">
                    Contact professionnel
                </h1>
                <Form user={this.props.user} isFormPro={true} isAuthenticated={this.props.isAuthenticated}/>
            </div>
        )
    }
}

export default ContactPro;
