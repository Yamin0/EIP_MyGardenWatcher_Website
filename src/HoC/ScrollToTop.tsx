import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

class ScrollToTop extends React.Component<RouteComponentProps> {
    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<{}>, snapshot?: any) {
        const prevPath: string = prevProps.location.pathname;
        const currPath: string = this.props.location.pathname;
        if (prevPath !== currPath && (!this.props.location.hash || this.props.location.hash === "")) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
