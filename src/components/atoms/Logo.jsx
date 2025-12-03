import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Logo.module.css';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img 
        src="../images/Logo.png" // (Asegúrate que este nombre sea correcto en Linux/AWS)
        alt="Logo HuertoHogar" 
        className={styles.logoImg} 
      />
      {/* Envolvemos el texto para darle color específico si es necesario */}
      <span className={styles.logoText}>HuertoHogar</span>
    </Link>
  );
}

export default Logo;