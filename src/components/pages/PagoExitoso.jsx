import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FaCheckCircle } from 'react-icons/fa';
// 👇 1. Importamos los estilos del botón para usarlos en el Link
import styles from '../../styles/Button.module.css';
import { Button } from 'react-bootstrap';

function PagoExitoso({ onClearCart }) {
  const [searchParams] = useSearchParams();
  const pedidoId = searchParams.get("pedido_id");

  useEffect(() => {
    // 👇 2. SOLUCIÓN DEL BUCLE:
    // Ejecutamos esto SOLO UNA VEZ al montar el componente.
    if (onClearCart) {
        onClearCart();
    }
    // eslint-disable-next-line
  }, []); // 👈 El array vacío [] rompe el bucle infinito.

  return (
    <Container className="py-5 text-center">
      <div style={{ color: '#2E8B57', marginBottom: '20px' }}>
        <FaCheckCircle size={80} />
      </div>
      <h2 className="mb-3">¡Pago Realizado con Éxito!</h2>
      <p className="lead mb-4">
        Muchas gracias por tu compra. Tu pedido <strong>#{pedidoId}</strong> ha sido registrado.
      </p>
      <p className="text-muted">
        Te hemos enviado un correo con los detalles (simulado).
        Puedes ver el estado de tu pedido en tu perfil.
      </p>
      
      <div className="d-flex justify-content-center gap-3 mt-4">
        {/* 👇 3. SOLUCIÓN DE REDIRECCIÓN:
            Usamos <Link> directamente con la clase del botón. 
            Ya no hay un <Button> adentro. */}
            
        <Link to="/perfil" className={styles.btn}>
          Ir a Mis Pedidos
        </Link>
        
        <Link to="/" className={`${styles.btn} ${styles.secondary}`}>
          Volver al Inicio
        </Link>
      </div>
    </Container>
  );
}

export default PagoExitoso;