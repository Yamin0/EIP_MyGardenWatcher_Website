import * as React from "react";
import Register from "./Register";
import Login from "./Login";

interface ISignInProps {

}

interface ISignInState {

}

class SignIn extends React.Component<ISignInProps, ISignInState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="sign-in container">
                <h1 className="main-title">
                    Mon Compte
                </h1>
                <div className="row">
                    <Register/>
                    <Login/>
                </div>
            </div>
        )
    }
}

export default SignIn;
