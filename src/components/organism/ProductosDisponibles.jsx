import React from 'react';
import Button from '../atoms/Button';
import styles from '../../styles/ProductosDisponibles.module.css';
const productos = [
    { nombre: "Manzana", precio: "500 / kg", imagen: "/images/manzana.jpg" },
    { nombre: "Miel", precio: "1.000 / frasco", imagen: "/images/miel.jpg" },
    { nombre: "Leche", precio: "1.200 / litro", imagen: "/images/leche.jpg" },
];

function ProductosDisponibles({ onAddToCart }) { 
  return (
    <section className={styles.productosSeccion}>
      <h2>Productos Disponibles</h2>
      <div className={styles.productosLista}>
        {productos.map((producto) => (
          <div key={producto.nombre} className={styles.productoItem}>
            <span>{producto.nombre} - {producto.precio}</span>
            <Button className="small" onClick={() => onAddToCart(producto)}> 
              Agregar al carrito
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductosDisponibles;