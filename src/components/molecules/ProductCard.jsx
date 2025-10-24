import React from 'react';
import Button from '../atoms/Button';
import StarRating from '../atoms/StarRating'; 
import styles from '../../styles/ProductCard.module.css';

function ProductCard({ producto, onAddToCart }) {

  const {
    imagenSrc,
    nombre,
    origen,
    precio,
    descripcion,
    disponibilidad,
    rating,
    reviewCount
  } = producto;

  const handleAgregarClick = () => {
    onAddToCart(producto);
  };

  return (
    <div className={styles.producto}>
      <img src={imagenSrc} alt={nombre} />
      <h3>{nombre}</h3>

      <div className={styles.ratingContainer}>
        <StarRating rating={rating} reviewCount={reviewCount} />
      </div>

      <p className={styles.meta}>Origen: {origen}</p>
      <p className={styles.precio}>{precio}</p>
      {descripcion && <p>{descripcion}</p>}
      {disponibilidad && <p>{disponibilidad}</p>}

      <Button className="btn small" onClick={handleAgregarClick}>
        Agregar al carrito
      </Button>
    </div>
  );
}

export default ProductCard;