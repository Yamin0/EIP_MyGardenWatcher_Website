import 'bootstrap/dist/css/bootstrap.min.css';
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
import ResetPassword from "./views/user/ResetPassword";
import {UserService} from "./services/UserService";
import ScrollToTop from "./HoC/ScrollToTop";
import Beta from "./views/beta/Beta";
import CarrotList from "./views/carrots/CarrotList";

export let history = createBrowserHistory();

export const apiUrl = process.env.NODE_ENV === 'development' ? "http://mygardenwatcher.fr:3001" : "https://mygardenwatcher.fr:2929";

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
        this.getUser = this.getUser.bind(this);
        this.clearUser = this.clearUser.bind(this);
    }

    componentDidMount(): void {
        if (this.state.isAuthenticated) this.getUser();
    }

    private authenticate(status: boolean) {
        this.setState({
            isAuthenticated: status
        });
    }

    private getUser() {
        UserService.getUser()
            .then(user => {
                this.setState({
                    user: user as User
                })
            });
    }

    private clearUser() {
        this.setState({
            user: userInit
        })
    }

    private toggleLogin(status: boolean) {
        this.setState({
            isLoginOpen: status
        });
    }

    checkToken() {
        if (!window.localStorage.getItem("mgwAuthToken")) {
            this.authenticate(false);
            history.push(window.location.pathname);
        }
    }

    render() {
        const { isAuthenticated, isLoginOpen } = this.state;
        const connect = () => {
            this.authenticate(true);
            this.getUser();
        }
        const disconnect = () => {
            this.authenticate(false);
            this.clearUser();
        }
        const activateLogin = () => this.toggleLogin(true);
        return (
            <Router history={history}>
                <ScrollToTop />

                <Header
                    isAuthenticated={isAuthenticated}
                    isLoginOpen={isLoginOpen}
                    connect={connect}
                    disconnect={disconnect}
                    toggleLogin={this.toggleLogin}
                />

                <Route exact path="/" component={Home} />
                <Route exact path="/beta" component={Beta} />
                <Route exact path="/contact-single"
                       render={() => <ContactSingle user={this.state.user} isAuthenticated={isAuthenticated} />}
                />
                <Route exact path="/contact-pro"
                       render={() => <ContactPro user={this.state.user} isAuthenticated={isAuthenticated} />}
                />
                <ProtectedRoute
                    path="/register"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/edit-profile"
                    needAuth={false}
                    activateLogin={activateLogin}
                    render={() => <Register connect={connect} />}
                />
                <ProtectedRoute
                    path="/forgot-password"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/edit-profile"
                    needAuth={false}
                    activateLogin={activateLogin}
                    render={() => <ForgotPassword />}
                />
                <ProtectedRoute
                    path="/reset-password/:token"
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/edit-profile"
                    needAuth={false}
                    activateLogin={activateLogin}
                    render={() => <ResetPassword />}
                />
                <ProtectedRoute
                    path="/edit-profile"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/register"
                    needAuth={true}
                    activateLogin={activateLogin}
                    render={() => <EditProfile user={this.state.user} getUser={this.getUser} checkToken={this.checkToken} disconnect={disconnect} />}
                />
                <ProtectedRoute
                    path="/carrots"
                    exact
                    isAuthenticated={isAuthenticated}
                    authenticationPath="/register"
                    needAuth={true}
                    activateLogin={activateLogin}
                    render={() => <CarrotList disconnect={disconnect} />}
                />
                <Route
                    path="/plants/:id/:name?"
                    render={() => <PlantDetail isAuthenticated={isAuthenticated} />}
                />
                <Route
                    exact
                    path="/plants"
                    render={() => <PlantList />}
                />

                <Footer/>

            </Router>
        );
    }
}

export default App;
