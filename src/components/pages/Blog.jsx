import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogPostCard from '../molecules/BlogPostCard'; 
import PostService from '../../services/PostService'; // 👈 Importa el servicio

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        setPosts(response.data); // Aquí mostramos todos
      } catch (error) {
        console.error("Error al cargar el blog:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container className="py-5">
      <h2 style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', marginBottom: '2.5rem' }}>
        Nuestro Blog
      </h2>
      <Row>
        {posts.length > 0 ? (
          posts.map(post => (
            <Col md={6} lg={6} key={post.id} className="mb-4">
              <BlogPostCard post={post} />
            </Col>
          ))
        ) : (
          <p className="text-center">Cargando artículos...</p>
        )}
      </Row>
    </Container>
  );
}

export default Blog;