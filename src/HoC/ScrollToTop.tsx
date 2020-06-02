import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

class ScrollToTop extends React.Component<RouteComponentProps> {
    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
