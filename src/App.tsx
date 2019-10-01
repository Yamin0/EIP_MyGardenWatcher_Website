import React from 'react';
import { Router, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';
import Home from "./views/home/Home";
import Contact from "./views/contact/Contact";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import SignIn from "./views/user/SignIn";
import ProtectedRoute from "./HoC/ProtectedRoute";

interface IAppState {
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const isAuthenticated: boolean = !!window.localStorage.getItem("token");

        return (
            <Router history={createBrowserHistory()}>

                <Header/>

                <Route exact path="/" component={Home} />
                <Route exact path="/contact" render={() => <Contact />} />
                <Route exact path="/sign-in" render={() => <SignIn />} />
                <ProtectedRoute path="/edit-profile" exact isAuthenticated={isAuthenticated} authenticationPath="/sign-in"  render={() => <SignIn />} />

                <Footer/>

            </Router>
        );
    }
}

export default App;
