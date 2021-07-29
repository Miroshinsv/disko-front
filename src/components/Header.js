import React from "react";

function Header({ onLogout }) {
  // console.log(onLogout)

    return (
        <>
            <img scr="" alt="Логотип проека" />
            <nav>
              <li className="navbar__element">
                <button className="navbar__title hover-opacity" onClick={onLogout}>Выход</button>
              </li>
            </nav>
        </>
    );
}

export default Header;
