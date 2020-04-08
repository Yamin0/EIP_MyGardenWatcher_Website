import * as React from "react";
import Form from "./Form";

class ContactPro extends React.Component<{}> {
    render() {
        return (
            <div className="contact-pro container">
                <h1 className="main-title">
                    Contact professionnel
                </h1>
                <Form isFormPro={true}/>
            </div>
        )
    }
}

export default ContactPro;
