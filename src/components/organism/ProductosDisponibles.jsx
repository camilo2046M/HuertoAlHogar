import React from "react";
import Button from "../atoms/Button.jsx";

const productos = [
  { nombre: "Manzana", precio: "$500 / kg", imagen: "/images/manzana.jpg" },
  { nombre: "Miel", precio: "$1.000 / frasco", imagen: "/images/miel.jpg" },
  { nombre: "Leche", precio: "$1.200 / litro", imagen: "/images/leche.jpg" },
];

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