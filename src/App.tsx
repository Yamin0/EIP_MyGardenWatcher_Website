import React from 'react';
import { Router, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';
import Home from "./views/home/Home";
import Contact from "./views/contact/Contact";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import SignIn from "./views/user/SignIn";
import ProtectedRoute from "./HoC/ProtectedRoute";
import {UserService} from "./services/UserService";

interface IAppState {
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const isAuthenticated: boolean = !!window.localStorage.getItem("mgwAuthToken");
        console.log(isAuthenticated);

        return (
            <Router history={createBrowserHistory()}>

                <Header isAuthenticated={isAuthenticated}/>

                <Route exact path="/" component={Home} />
                <Route exact path="/contact-single" component={Contact} />
                <Route exact path="/contact-pro" component={Contact} />
                <Route exact path="/sign-in" render={() => isAuthenticated ? <Home/> : <SignIn />} />
                <ProtectedRoute path="/edit-profile" exact isAuthenticated={isAuthenticated} authenticationPath="/sign-in"  render={() => <SignIn />} />
                <ProtectedRoute path="/sign-out" exact isAuthenticated={isAuthenticated} authenticationPath="/sign-in"  render={() => <div>
                    <button onClick={UserService.logout} style={{paddingTop: "300px"}}>Se déconnecter</button>
                </div>} />

                <Footer/>

            </Router>
        );
    }
}

export default App;
