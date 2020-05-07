import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
    needAuth: boolean;
    activateLogin(): void;
}

class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (this.props.isAuthenticated !== this.props.needAuth) {
            redirectPath = this.props.authenticationPath;
        }

        if (redirectPath) {
            const renderComponent = () => {
                if (this.props.needAuth) this.props.activateLogin();
                return <Redirect to={{pathname: redirectPath}}/>
            };
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}

export default ProtectedRoute;
