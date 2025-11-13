import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogPostCard from '../molecules/BlogPostCard';

// 1. Datos simulados (puedes importarlos de otro lado si quieres)
//    Solo necesitamos los 2 más recientes.
const mockPosts = [
  {
    id: 1,
    title: 'Los 5 Beneficios de Comer Productos Orgánicos',
    imageUrl: '/images/blog/organicos.jpg',
    category: 'Salud',
    date: '10 de Noviembre, 2025'
  },
  {
    id: 2,
    title: 'Receta: Ensalada de Quínoa y Verduras de Temporada',
    imageUrl: '/images/blog/ensalada.jpg',
    category: 'Recetas',
    date: '05 de Noviembre, 2025'
  }
];

function BlogTeaser() {
  return (
    <Container as="section" className="py-5" style={{ backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', marginBottom: '2.5rem' }}>
        Visita Nuestro Blog
      </h2>
      <Row>
        {mockPosts.map(post => (
          <Col md={6} key={post.id} className="mb-4">
            {/* 2. Usamos el componente de tarjeta CON el tamaño 'small' */}
            <BlogPostCard post={post} size="small" />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/blog" className="btn">Ver todos los artículos</Link>
      </div>
    </Container>
  );
}

export default BlogTeaser;