import React from 'react';
import { Router, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';
import Home from "./views/home/Home";
import ContactSingle from "./views/contact/ContactSingle";
import ContactPro from "./views/contact/ContactPro";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import ProtectedRoute from "./HoC/ProtectedRoute";
import Register from "./views/user/Register";
import EditProfile from "./views/user/EditProfile";
import User, {userInit} from "./interfaces/User";
import PlantList from "./views/plants/PlantList";
import PlantDetail from "./views/plants/PlantDetail";
import ForgotPassword from "./views/user/ForgotPassword";

export let history = createBrowserHistory();

export const apiUrl = "http://www.mygardenwatcher.fr:3001";

interface IAppState {
    user: User,
    isAuthenticated: boolean,
    isLoginOpen: boolean
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: userInit,
            isAuthenticated: !!window.localStorage.getItem("mgwAuthToken"),
            isLoginOpen: false
        };
        this.authenticate = this.authenticate.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.checkToken = this.checkToken.bind(this);
    }

    private authenticate(status: boolean) {
        this.setState({
            isAuthenticated: status
        });
    }

    private toggleLogin(status: boolean) {
        this.setState({
            isLoginOpen: status
        });
    }

    checkToken() {
        if (!window.localStorage.getItem("mgwAuthToken")) {
            this.authenticate(false);
            window.location.reload();
        }
    }

    render() {
        const { isAuthenticated, isLoginOpen } = this.state;
        const connect = () => this.authenticate(true);

        return (
            <Router history={history}>

                <Header
                    isAuthenticated={isAuthenticated}
                    isLoginOpen={isLoginOpen}
                    connect={connect}
                    toggleLogin={this.toggleLogin}
                />

                <Route exact path="/" component={Home} />
                <Route exact path="/contact-single" component={ContactSingle} />
                <Route exact path="/contact-pro" component={ContactPro} />
                <ProtectedRoute
                    path="/register"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/edit-profile"
                    needAuth={false}
                    render={() => <Register connect={connect} />}
                />
                <ProtectedRoute
                    path="/forgot-password"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/edit-profile"
                    needAuth={false}
                    render={() => <ForgotPassword />}
                />
                <ProtectedRoute
                    path="/edit-profile"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/register"
                    needAuth={true}
                    render={() => <EditProfile user={userInit} checkToken={this.checkToken} />}
                />
                <ProtectedRoute
                    path="/plants/:id/:name"
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/register"
                    needAuth={true}
                    render={() => <PlantDetail checkToken={this.checkToken} />}
                />
                <ProtectedRoute
                    path="/plants"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/register"
                    needAuth={true}
                    render={() => <PlantList checkToken={this.checkToken} />}
                />

                <Footer/>

            </Router>
        );
    }
}

export default App;
