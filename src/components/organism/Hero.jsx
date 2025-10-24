import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate que Link está importado
import styles from '../../styles/Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2>Del campo a tu hogar</h2>
        <p>Productos frescos, locales y sostenibles</p>
        
        <Link className="btn" to="/catalogo">Ver catálogo</Link> 
      </div>
    </section>
  );
}

export default Hero;