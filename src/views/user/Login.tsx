import * as React from "react";

interface IRegisterProps {
}

interface IRegisterState {
    email: string,
    password: string,
    repeatPassword: string
}

class Login extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <form className="col-6">

            </form>
        )
    }
}

export default Login;
