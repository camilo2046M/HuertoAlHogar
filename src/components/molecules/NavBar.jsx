import React from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button.jsx";

function NavBar({ onCrearCuentaClick, user }) { 
  
  return (
    <nav>
      
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/perfil">Perfil</Link>
      <Link to="/nosotros">Nosotros</Link>
      

      {!user && (
        <Button onClick={onCrearCuentaClick}>
          Crear Cuenta
        </Button>
      )}
    </nav>
  );
}

export default NavBar;