import React from "react";

function CartItem({ item }) {

  
  return (
    <tr>
      <td>
        <img src={item.imagen} alt={item.nombre} width="50" /> 
        {item.nombre}
      </td>
      <td>${item.precio}</td>
      <td>
 
        {item.cantidad} 
      </td>

    </tr>
  );
}

export default CartItem;