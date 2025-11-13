import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Importaremos un componente de tarjeta que crearemos a continuación
import BlogPostCard from '../molecules/BlogPostCard'; 

// 1. Datos simulados del blog
const mockPosts = [
  {
    id: 1,
    title: 'Los 5 Beneficios de Comer Productos Orgánicos',
    excerpt: 'Descubre cómo los alimentos orgánicos pueden mejorar tu salud y bienestar general, libres de químicos y pesticidas...',
    imageUrl: '/images/blog/organicos.jpg', // Necesitarás poner una imagen en public/images/blog/
    category: 'Salud',
    date: '10 de Noviembre, 2025'
  },
  {
    id: 2,
    title: 'Receta: Ensalada de Quínoa y Verduras de Temporada',
    excerpt: 'Una receta fácil, rápida y deliciosa para aprovechar al máximo las verduras frescas que encuentras en HuertoHogar...',
    imageUrl: '/images/blog/ensalada.jpg', // Necesitarás poner una imagen en public/images/blog/
    category: 'Recetas',
    date: '05 de Noviembre, 2025'
  }
];

function Blog() {
  return (
    <Container className="py-5">
      <h2 style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', marginBottom: '2.5rem' }}>
        Nuestro Blog
      </h2>
      <Row>
        {mockPosts.map(post => (
          // Usamos la grid de Bootstrap para la responsividad
          <Col md={6} lg={6} key={post.id} className="mb-4">
            <BlogPostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;