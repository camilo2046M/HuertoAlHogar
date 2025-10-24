import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from '../../styles/NavBar.module.css';

function NavBar({ onCrearCuentaClick, onLoginClick, onLogoutClick, user }) {

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLink}>Inicio</Link>
      <Link to="/catalogo" className={styles.navLink}>Catálogo</Link>
      <Link to="/carrito" className={styles.navLink}>Carrito</Link>
      <Link to="/perfil" className={styles.navLink}>Perfil</Link>

      <div className={styles.navItemDropdown}>
        <Link to="/nosotros" className={styles.navLink}>Nosotros</Link> 
        <div className={styles.dropdownContent}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>
            <FaFacebook /> Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>
            <FaInstagram /> Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>
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