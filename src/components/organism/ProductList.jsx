import React from 'react';
import ProductCard from '../molecules/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/ProductList.module.css'; // 👈 Importa los estilos

function ProductList({ titulo, productos = [], onAddToCart }) {
  
  // Si no hay productos...
  if (!productos || productos.length === 0) {
    return (
      // Usa styles.sectionContainer para el espaciado
      <Container as="section" className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{titulo}</h2>
        <p>No se encontraron productos que coincidan con tu búsqueda en esta categoría.</p>
      </Container>
    );
  }

  return (
    // Usa styles.sectionContainer
    <Container as="section" className={styles.sectionContainer}> 
      {/* Usa styles.sectionTitle para el estilo con subrayado */}
      <h2 className={styles.sectionTitle}>{titulo}</h2>
      
      <Row>
        {productos.map(producto => (
          <Col xs={12} md={6} lg={4} key={producto.nombre} className="mb-4">
            <ProductCard
              producto={producto}
              onAddToCart={onAddToCart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;