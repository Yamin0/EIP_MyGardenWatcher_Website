import * as React from "react";
import { HashLink } from 'react-router-hash-link';
import Login from "../user/Login";
import {UserService} from "../../services/UserService";
import {Link} from "react-router-dom";
import {useState} from "react";

interface IBurgerMenuProps {
    isAuthenticated: boolean,
    isLoginOpen: boolean,
    connect(): void,
    disconnect(): void,
    toggleLogin(status: boolean): void
}

const BurgerMenu: React.FunctionComponent<IBurgerMenuProps> =  ({isAuthenticated, isLoginOpen, connect, disconnect, toggleLogin}) => {
    const [burger, setBurger] = useState(false);

    const closeLogin = () => toggleLogin(false);
    const toggle = () => toggleLogin(!isLoginOpen);
    const logout = () => {
        UserService.logout();
        disconnect();
    }

    return (
        <header className="row menu">
            <ul>
                <li className="menu-logo d-inline-block">
                    <HashLink to="/#mgw-carousel" onClick={() => setBurger(false)}  scroll={el => el.scrollIntoView({ behavior: 'smooth' })}>
                        <img src="/images/logos/mgw-logo-text-black-carrot-grey-shadowed.png" className="menu-logo-image"
                             alt="My Garden Watcher"/>
                    </HashLink>
                </li>
                <li className={"menu-elem burger d-inline-block" + (burger ? " open" : "")}>
                    <button className="btn" onClick={() => setBurger(!burger)}>
                        <span className="oi oi-menu"/>
                    </button>
                </li>
                {
                    burger &&
                        <>
                            <li className="menu-elem">
                                <HashLink to="#concept" onClick={() => setBurger(false)} scroll={el => el.scrollIntoView({ behavior: 'smooth' })} className="menu-elem-link">Le concept</HashLink>
                            </li>
                            <li className="menu-elem">
                                <HashLink to="/#vision" onClick={() => setBurger(false)} scroll={el => el.scrollIntoView({ behavior: 'smooth' })} className="menu-elem-link">Notre vision</HashLink>
                            </li>
                            <li className="menu-elem">
                                <HashLink to="/#solution" onClick={() => setBurger(false)} scroll={el => el.scrollIntoView({ behavior: 'smooth' })} className="menu-elem-link">Notre solution</HashLink>
                            </li>
                            <li className="menu-elem">
                                <HashLink to="/#team" onClick={() => setBurger(false)} scroll={el => el.scrollIntoView({ behavior: 'smooth' })} className="menu-elem-link">L'équipe</HashLink>
                            </li>

                            <li className="menu-elem">
                                <Link onClick={() => setBurger(false)} to="/beta" className="menu-elem-link">La Bêta</Link>
                            </li>

                            <li className="menu-elem">
                                <Link onClick={() => setBurger(false)} to="/plants" className="menu-elem-link">Les plantes</Link>
                            </li>

                            <li className="menu-elem">
                                <Link onClick={() => setBurger(false)} to="/contact-single" className="menu-elem-link">Nous contacter</Link>
                            </li>

                            <li className="menu-elem account">
                                <Link onClick={() => setBurger(false)} to="/download-app" className="menu-elem-link btn-orange btn-login">
                                    <span className="oi oi-lock-locked icon-right"/>
                                    Espace Client
                                </Link>
                            </li>
                        </>
                }
            </ul>
        </header>
    )
};

export default BurgerMenu;
