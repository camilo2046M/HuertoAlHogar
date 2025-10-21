import React from "react";
import Button from "../atoms/Button.jsx";
function ProductosDisponibles({ productos, onAddToCart }) {
  return (
    <section id="First" className="productos-seccion">
      <h2>Productos Disponibles</h2>
      <div id="productosLista">
        {productos.map((producto) => (
          <div key={producto.nombre}> 
            <span>{producto.nombre} - ${producto.precio}</span>
            <Button onClick={() => onAddToCart(producto)}>
              Agregar al carrito
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductosDisponibles;