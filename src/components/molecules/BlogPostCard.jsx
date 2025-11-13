import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/BlogPostCard.module.css'; 

// 👇 1. Acepta la nueva prop 'size'
function BlogPostCard({ post, size = 'large' }) { // 'large' es el por defecto
  
  // 2. Combina el estilo base con el estilo de tamaño
  const cardClassName = `${styles.card} ${size === 'small' ? styles.smallCard : ''}`;

  return (
    // 3. Usa el className combinado
    <Link to={`/blog/${post.id}`} className={cardClassName}>
      <img src={post.imageUrl} alt={post.title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <span className={styles.category}>{post.category}</span>
        <h3 className={styles.title}>{post.title}</h3>
        
        {/* 4. Solo muestra el extracto si la tarjeta es grande */}
        {size === 'large' && (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}
        
        <span className={styles.date}>{post.date}</span>
      </div>
    </Link>
  );
}

export default BlogPostCard;