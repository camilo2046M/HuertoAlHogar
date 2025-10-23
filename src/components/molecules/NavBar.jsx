import React from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button.jsx";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function NavBar({ onCrearCuentaClick,onLoginClick,onLogoutClick, user }) { 
  
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/perfil">Perfil</Link>
      
      <div className="nav-item-dropdown">
        
        <Link to="/nosotros" className="nav-link">Nosotros</Link>
        <div className="dropdown-content">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook /> Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter /> Twitter
          </a>
        </div>
      </div>

          {user ? (
            <Button onClick={onLogoutClick}>
              Cerrar Sesión
            </Button>
            ) : (
            <>
            <Button onClick={onLoginClick}>
             Iniciar Sesión
            </Button>
            <Button onClick={onCrearCuentaClick}>
             Crear Cuenta
            </Button>
        </>
      )}
    </nav>
  );
}

export default NavBar;