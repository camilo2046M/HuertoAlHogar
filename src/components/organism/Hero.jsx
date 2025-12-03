import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Hero.module.css';
// Importamos estilos del botón para reutilizarlos
import buttonStyles from '../../styles/Button.module.css';

function Hero() {
  return (
    <section className={styles.heroSection}>
      <Container>
        <Row className="align-items-center"> {/* Alineación vertical centrada */}
          
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <Col lg={6} md={6} className="mb-4 mb-md-0">
            <div className={styles.textContent}>
              <span className={styles.badge}>100% Orgánico & Local</span>
              <h1 className={styles.title}>
                Del campo chileno <br />
                <span className={styles.highlight}>directo a tu hogar</span>
              </h1>
              <p className={styles.description}>
                Conectamos a tu familia con agricultores locales. Productos frescos, 
                de temporada y cultivados con cariño, entregados en tu puerta.
              </p>
              <div className={styles.actions}>
                <Link to="/catalogo" className={`${buttonStyles.btn} ${styles.ctaBtn}`}>
                  Ver Catálogo Fresco
                </Link>
                <Link to="/nosotros" className={buttonStyles.btn}>
                  Conoce nuestra historia →
                </Link>
              </div>
            </div>
          </Col>

          {/* COLUMNA DERECHA: IMAGEN DESTACADA */}
          <Col lg={6} md={6}>
            <div className={styles.imageWrapper}>
              {/* Usamos una imagen de Unsplash de alta calidad */}
              <img 
                src="./images/heroimg2.png" 
                alt="Canasta de verduras frescas" 
                className={styles.heroImage} 
              />
              {/* Elemento decorativo flotante (opcional) */}
              <div className={styles.floatingCard}>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Hero;