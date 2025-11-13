import React from 'react';
import styles from '../../styles/OrderHistoryItem.module.css'
// 👇 1. El argumento ahora se llama 'estado' (opcional, pero más claro)
function OrderHistoryItem({ order }) {
  const getStatusClass = (estado) => {
    
    // 👇 2. AÑADIMOS ESTA LÍNEA (Guard Clause)
    // Si el estado es nulo o undefined, devuelve un estilo por defecto
    if (!estado) {
        return styles.default;
    }

    // 👇 3. Ahora 'estado.toLowerCase()' funcionará
    switch (estado.toLowerCase()) {
      case 'entregado':
        return styles.entregado;
      case 'enviado':
        return styles.enviado;
      case 'preparacion':
      case 'pendiente_pago': // Añadimos el estado inicial
        return styles.preparacion;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.orderHeader}>
        <h4>Pedido #{order.id}</h4>
        <span>{order.fechaCreacion || order.date}</span> {/* Usamos el campo real 'fechaCreacion' */}
      </div>
      <div className={styles.orderDetails}>
        <p>Total: ${new Intl.NumberFormat('es-CL').format(order.total)}</p>
        
        {/* 👇 4. USA 'order.estado' aquí */}
        <span className={`${styles.status} ${getStatusClass(order.estado)}`}>
          {order.estado} {/* 5. Y 'order.estado' aquí */}
        </span>
      </div>
    </div>
  );
}

export default OrderHistoryItem;