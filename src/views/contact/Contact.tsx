import * as React from "react";
import Form from "./Form";

interface IContactProps {
}

interface IContactState {

}

class Contact extends React.Component<IContactProps, IContactState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="contact container">
                <h1 className="main-title">
                    Contactez-nous
                </h1>
                <Form/>
            </div>
        )
    }
}

export default Contact;
