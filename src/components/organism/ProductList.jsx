import React from 'react';
import ProductCard from '../molecules/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductList({ titulo, productos = [], onAddToCart }) {
  
  if (!productos || productos.length === 0) {
    return (
      <Container as="section" className="catalogo-seccion py-4">
        <h2 className="seccion-titulo">{titulo}</h2>
        <p>No se encontraron productos que coincidan con tu búsqueda en esta categoría.</p>
      </Container>
    );
  }

  return (
    <Container as="section" className="catalogo-seccion py-4"> 
      <h2 className="seccion-titulo">{titulo}</h2>
      
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