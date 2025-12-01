import React from 'react';
import Button from '../atoms/Button';
import StarRating from '../atoms/StarRating'; 
import styles from '../../styles/ProductCard.module.css';
import { useAuth } from '../../context/AuthContext';


function ProductCard({ producto, onAddToCart, onDelete }) {

  const { role } = useAuth();

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

      {role === 'ADMIN' ? (
        // Si es ADMIN, mostramos botón de borrar
        <Button className="btn danger small" onClick={() => onDelete(producto.id)}>
          Eliminar Producto
        </Button>
      ) : (
        // Si es USER o Invitado, mostramos botón de comprar
        <Button className="btn small" onClick={() => onAddToCart(producto)}>
          Agregar al carrito
        </Button>
      )}
    </div>
  );
}

export default ProductCard;