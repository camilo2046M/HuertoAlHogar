import React from "react";
import Button from '../atoms/Button.jsx';

function CartItem({ item , onRemove, onIncrease, onDecrease}) {

  
  return (
    <tr>
      <td>
        <img src={item.imagen} alt={item.nombre} width="50" /> 
        {item.nombre}
      </td>
      <td>${item.precio}</td>
      <td>
        <Button className="btn small" onClick={() => onDecrease(item.nombre)}>
          -
        </Button>
        <span style={{ margin: '0 10px' }}>{item.cantidad}</span>
        <Button className="btn small" onClick={() => onIncrease(item.nombre)}>
          +
        </Button>
      </td>
      <td>
        <Button className="btn small danger" onClick={() => onRemove(item.nombre)}>
          Eliminar
        </Button>
      </td>

    </tr>
  );
}

export default CartItem;