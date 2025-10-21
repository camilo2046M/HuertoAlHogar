import React from "react";
import ProductCard from "../molecules/ProductCard";

function ProductList({ titulo, productos, onAddToCart }) {
  
  if (!productos || productos.length === 0) {
    return (
      <section className="catalogo-seccion">
        <h2 className="seccion-titulo">{titulo}</h2>
        <p>No hay productos en esta categoría por el momento.</p>
      </section>
    );
  }

  return (
    <section className="catalogo-seccion"> 
      <h2 className="seccion-titulo">{titulo}</h2>
      <div className="catalogo">
        {productos.map(producto => (
          <ProductCard
            key={producto.nombre} 
            producto={producto} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;