import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from '../atoms/Button';
import { FaTimesCircle } from 'react-icons/fa';

function PagoFallido() {
  return (
    <Container className="py-5 text-center">
      <div style={{ color: '#dc3545', marginBottom: '20px' }}>
        <FaTimesCircle size={80} />
      </div>
      <h2 className="mb-3">El pago no se completó</h2>
      <p className="lead mb-4">
        Hubo un problema con el pago o la operación fue cancelada.
        No se te ha cobrado nada.
      </p>
      
      <Link to="/carrito">
        <Button className="btn">Volver al Carrito</Button>
      </Link>
    </Container>
  );
}

export default PagoFallido;