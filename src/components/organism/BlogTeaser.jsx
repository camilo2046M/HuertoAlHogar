import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogPostCard from '../molecules/BlogPostCard';
import PostService from '../../services/PostService';
import buttonStyles from '../../styles/Button.module.css';
function BlogTeaser() {
  // 2. Estado para los posts
  const [posts, setPosts] = useState([]);

  // 3. Cargar desde la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        // Tomamos solo los primeros 2 para el teaser
        setPosts(response.data.slice(0, 2));
      } catch (error) {
        console.error("Error al cargar el blog:", error);
      }
    };

    fetchPosts();
  }, []);

  // Si no hay posts, no mostramos la sección
  if (posts.length === 0) return null;

  return (
    <Container as="section" className="py-5" style={{ backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', marginBottom: '2.5rem' }}>
        Visita Nuestro Blog
      </h2>
      <Row>
        {posts.map(post => (
          <Col md={6} key={post.id} className="mb-4">
            <BlogPostCard post={post} size="small" />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/blog" className={buttonStyles.btn}>Ver todos los artículos</Link>
      </div>
    </Container>
  );
}

export default BlogTeaser;