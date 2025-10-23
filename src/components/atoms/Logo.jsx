import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../../styles/Logo.module.css';

function Logo() {
  return (
  
    <Link to="/" className="styles.logo">
      <img 
        src="./images/Logo.png" 
        alt="Logo de HuertoHogar" 
        className={styles.logoImg} 
      />
      HuertoHogar
    </Link>
  );
}

export default Logo;