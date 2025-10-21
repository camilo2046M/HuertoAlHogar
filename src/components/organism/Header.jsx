import React  from "react";
import Logo from "../atoms/Logo.jsx";
import NavBar from "../molecules/NavBar.jsx";


function Header({ onCrearCuentaClick, user }) {
  return (
    <header>
      <Logo />
      <NavBar 
        onCrearCuentaClick={onCrearCuentaClick} 
        user={user} 
      />
    </header>
  );
}

export default Header;