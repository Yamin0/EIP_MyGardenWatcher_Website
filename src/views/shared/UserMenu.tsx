import * as React from "react";
import {Link} from "react-router-dom";
import {UserService} from "../../services/UserService";

const UserMenu: React.FunctionComponent = () => {
    return (
        <nav className="user-menu">
            <Link to="/edit-profile" className="menu-elem-link"><span className="oi oi-person"/>Mon profil</Link>
            <Link to="/carrots" className="menu-elem-link"><span className="oi oi-wrench"/>Mes carottes</Link>
            <p onClick={UserService.logout} className="user-menu-logout"><span className="oi oi-power-standby"/>Se déconnecter</p>
        </nav>
    )
};
//            <Link to="/alerts" className="menu-elem-link"><span className="oi oi-bell"/>Mes alertes</Link>
export default UserMenu;
