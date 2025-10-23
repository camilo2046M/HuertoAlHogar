import React from 'react';
import CheckoutForm from '../organism/CheckoutForm';
import Container from 'react-bootstrap/Container';

function Checkout({ user, cartItems, cartTotal, onCheckoutSubmit }) {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <CheckoutForm 
        user={user}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onCheckoutSubmit={onCheckoutSubmit}
      />
    </Container>
  );
}

export default Checkout;