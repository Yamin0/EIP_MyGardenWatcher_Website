import * as React from "react";
import Form from "./Form";

interface IContactProps {
}

interface IContactState {

}

class ContactPro extends React.Component<IContactProps, IContactState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="contact container">
                <h1 className="main-title">
                    Contact professionnel
                </h1>
                <Form isFormPro={true}/>
            </div>
        )
    }
}

export default ContactPro;
