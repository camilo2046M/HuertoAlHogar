import React  from "react";
import Logo from "../atoms/Logo.jsx";
import NavBar from "../molecules/NavBar.jsx";
import '../../styles/Header.module.css';


function Header({ onCrearCuentaClick,onLoginClick,onLogoutClick, user }) {
  return (
    <header className="{styles.header}">
      <Logo />
      <NavBar 
        onCrearCuentaClick={onCrearCuentaClick} 
        onLoginClick={onLoginClick} 
        onLogoutClick={onLogoutClick}
        user={user} 
      />
    </header>
  );
}

export default Header;