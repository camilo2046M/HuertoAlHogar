import React from "react";
import CartSection from "../organism/CartSection.jsx";



function Carrito({ 
  cartItems, 
  cartTotal,
  onClearCart, 
  onRemoveItem, 
  onIncreaseQuantity, 
  onDecreaseQuantity 
}) {
  
  return (
    <>
      <CartSection 
        cartItems={cartItems} 
        cartTotal={cartTotal}
        onClearCart={onClearCart} 
        onRemoveItem={onRemoveItem}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
      />
    </>
  );
}

export default Carrito;