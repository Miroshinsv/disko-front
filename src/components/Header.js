import React from "react";
import logo from '../../src/images/logoHeder.png';

function Header({ onLogout }) {

    return (
        <header className="header block-size">
            <img className="header__logo" src={logo} alt="Логотип проека" />
            <nav>
              <li className="navbar__element">
                <button className="navbar__title hover-opacity" onClick={onLogout}>Выход</button>
              </li>
            </nav>
        </header>
    );
}

export default Header;
