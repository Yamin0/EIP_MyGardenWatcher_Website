import * as React from "react";
import {Link} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Header: React.FunctionComponent<{}> =  () => {
    return (
        <header className="row menu">
            <ul>
                <li className="menu-logo">
                    <Link to="/">
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
                    <Link to="/contact" className="menu-elem-link">Contact</Link>
                </li>
                <li className="menu-elem account">
                    <Link to="/sign-in" className="menu-elem-link btn-orange">
                        <span className="oi oi-person icon-right"/>
                        Mon Compte
                    </Link>
                </li>
            </ul>
        </header>
    )
};

export default Header;
