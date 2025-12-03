import React from 'react';
import Button from '../atoms/Button';
import styles from '../../styles/CartItem.module.css';

function CartItem({ item, onRemove, onIncrease, onDecrease }) {

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(item.precio);
  
  return (
    <tr className={styles.cartItemRow}>
      <td>
        <div className={styles.productInfo}>
          <img src={item.imagenSrc} alt={item.nombre} className={styles.productImage} /> 
          {item.nombre}
        </div>
      </td>

      <td>{precioFormateado}</td>

      <td>
        <div className={styles.quantityControl}>
          <Button className="small" onClick={() => onDecrease(item.nombre)}>
            -
          </Button>
          <span>{item.cantidad}</span>
          <Button className="small" onClick={() => onIncrease(item.nombre)}>
            +
          </Button>
        </div>
      </td>

      <td>
        <Button className="small danger" onClick={() => onRemove(item.nombre)}>
          Eliminar
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;