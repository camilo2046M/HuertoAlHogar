import React from "react";
import CartSection from "../organism/CartSection.jsx";
import ProductosDisponibles from "../organism/ProductosDisponibles.jsx";

const productos = [
  { nombre: "Manzana", precio: 500, imagen: "./images/manzana.jpg" },
  { nombre: "Miel", precio: 1000, imagen: "./images/miel.jpg" },
  { nombre: "Leche", precio: 1200, imagen: "./images/leche.jpg" },
];

function Carrito({ 
  cartItems, 
  cartTotal,
  onClearCart, 
  onAddToCart, 
  onRemoveItem, 
  onIncreaseQuantity, 
  onDecreaseQuantity 
}) {
  
  return (
    <>
      <ProductosDisponibles 
        productos={productos} 
        onAddToCart={onAddToCart} 
      />
      
      <CartSection 
        cartItems={cartItems} 
        cartTotal={cartTotal}
        onClearCart={onClearCart} 
        onAddToCart={onAddToCart} 
        onRemoveItem={onRemoveItem}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
      />
    </>
  );
}

export default Carrito;