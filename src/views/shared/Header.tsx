import * as React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Login from "../user/Login";
import {UserService} from "../../services/UserService";

interface IHeaderProps {
    isAuthenticated: boolean,
    isLoginOpen: boolean,
    connect(): void,
    disconnect(): void,
    toggleLogin(status: boolean): void
}

const Header: React.FunctionComponent<IHeaderProps> =  ({isAuthenticated, isLoginOpen, connect, disconnect, toggleLogin}) => {
    const closeLogin = () => toggleLogin(false);
    const toggle = () => toggleLogin(!isLoginOpen);
    const logout = () => {
        UserService.logout();
        disconnect();
    }

    return (
        <header className="row menu">
            <ul>
                <li className="menu-logo">
                    <Link to="/" onClick={() => {window.scrollTo(0, 0);}}>
                        <img src="/images/logos/mgw-logo-text-black-carrot-grey-shadowed.png" className="menu-logo-image"
                             alt="My Garden Watcher"/>
                    </Link>
                </li>
                <li className="menu-elem">
                    <HashLink to="/#concept" className="menu-elem-link">Le concept</HashLink>
                </li>
                <li className="menu-elem">
                    <HashLink to="/#vision" className="menu-elem-link">Notre vision</HashLink>
                </li>
                <li className="menu-elem">
                    <HashLink to="/#solution" className="menu-elem-link">Notre solution</HashLink>
                </li>
                <li className="menu-elem">
                    <HashLink to="/#team" className="menu-elem-link">L'équipe</HashLink>
                </li>

                <li className="menu-elem">
                    <Link to="/plants" className="menu-elem-link">Nos plantes</Link>
                </li>

                <li className="menu-elem">
                    <Link to="/contact-single" className="menu-elem-link">Nous contacter</Link>
                </li>

                <li className="menu-elem account">
                    {isAuthenticated ?
                        <Link to="/edit-profile" className="menu-elem-link btn-orange btn-account">
                            <span className="oi oi-person icon-right"/>
                            Mon Compte
                        </Link>
                        :
                        <button id="btn-login" className="menu-elem-link btn-orange" onClick={toggle}>
                            <span className="oi oi-lock-locked icon-right"/>
                            Espace Client
                        </button>
                    }
                    {
                        isAuthenticated &&
                            <p onClick={logout} className="btn-logout" title="Se déconnecter"><span className="oi oi-power-standby"/></p>
                    }
                    {
                        !isAuthenticated && isLoginOpen &&
                        <Login closePopin={closeLogin} connect={connect}/>
                    }

                </li>
            </ul>
        </header>
    )
};

export default Header;
