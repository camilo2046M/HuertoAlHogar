import React from 'react';
import Button from '../atoms/Button'; 
import StarRating from '../atoms/StarRating.jsx';

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
    <div className="producto">
      <img src={imagenSrc} alt={nombre} />
      <h3>{nombre}</h3>
      <div style={{ padding: '0 1rem' }}>
        <StarRating rating={rating} reviewCount={reviewCount} />
      </div>
      <p className="meta">Origen: {origen}</p>
      <p className="precio">{precio}</p>
      {descripcion && <p>{descripcion}</p>}
      {disponibilidad && <p>{disponibilidad}</p>}
      
      <Button className="btn small" onClick={handleAgregarClick}>
        Agregar al carrito
      </Button>
    </div>
  );
}

export default ProductCard;