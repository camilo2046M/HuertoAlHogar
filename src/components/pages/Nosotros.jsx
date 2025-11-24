import React from 'react';
import MapSection from '../organism/MapSection';
import { Container } from 'react-bootstrap'; // Usamos Bootstrap para el layout base
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import styles from '../../styles/Nosotros.module.css'; // Importamos los estilos

function Nosotros() {
  return (
    <div className={styles.pageContainer}>
      <Container>
        
        {/* Sección de Introducción */}
        <section className={styles.section}>
          <h1 className={styles.mainTitle}>Sobre Nosotros</h1>
          <p className={styles.text}>
            HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo
            directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos
            en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt,
            Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra misión es conectar a las
            familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
          </p>
        </section>

        {/* Misión y Visión (Ahora lado a lado en pantallas grandes) */}
        <div className="row mb-5">
          <div className="col-md-6">
            <h2 className={styles.subTitle}>Nuestra Misión</h2>
            <p className={styles.text}>
              Proporcionar productos frescos y de calidad directamente desde el campo hasta
              la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos
              comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores
              locales.
            </p>
          </div>
          <div className="col-md-6">
            <h2 className={styles.subTitle}>Nuestra Visión</h2>
            <p className={styles.text}>
              Ser la tienda online líder en la distribución de productos frescos y naturales en
              Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la
              sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional.
            </p>
          </div>
        </div>

        {/* Redes Sociales */}
        <section className={styles.section}>
          <h2 className={styles.subTitle}>Síguenos</h2>
          <ul className={styles.socialList}>
            <li className={styles.socialItem}><FaFacebook size={24} /> HuertoHogarChile</li>
            <li className={styles.socialItem}><FaInstagram size={24} /> @HuertoHogarChile</li>
            <li className={styles.socialItem}><FaTwitter size={24} /> @HuertoHogar_CL</li>
            <li className={styles.socialItem}><FaWhatsapp size={24} /> +56 9 1234 5678</li>
          </ul>
        </section>

        {/* Mapa (Ya tienes el componente, solo lo renderizamos) */}
        <MapSection />
        
      </Container>
    </div>
  );
}

export default Nosotros;