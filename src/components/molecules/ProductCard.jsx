import React from "react";
import Button from "../atoms/Button.jsx";

function ProductCard({ producto, onAddToCart }) {
  
  const { 
    imagenSrc, 
    nombre, 
    origen, 
    precio, 
    descripcion, 
    disponibilidad 
  } = producto;

  const handleAgregarClick = () => {
    onAddToCart(producto); 
  };

  return (
    <div className="producto">
      <img src={imagenSrc} alt={nombre} />
      <h3>{nombre}</h3>
      

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