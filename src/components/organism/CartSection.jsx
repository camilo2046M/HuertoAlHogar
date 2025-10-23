import React, {useMemo} from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../molecules/CartItem.jsx';
import Button from '../atoms/Button.jsx';

const productosDisponibles = [
  { nombre: "Manzana", precio: "$500 / kg", imagen: "/images/manzana.jpg" },
  { nombre: "Miel", precio: "$1.000 / frasco", imagen: "/images/miel.jpg" },
  { nombre: "Leche", precio: "$1.200 / litro", imagen: "/images/leche.jpg" },
];

function CartSection({ 
  cartItems, 
  cartTotal,
  onClearCart, 
  onAddToCart, 
  onRemoveItem, 
  onIncreaseQuantity, 
  onDecreaseQuantity 
}) {


  const handleAgregarAleatorio = () => {
    const randomProd = productosDisponibles[Math.floor(Math.random() * productosDisponibles.length)];
    onAddToCart(randomProd);
  };

  return (
    <section id="Second" className="carrito-seccion">
      <h2 className="seccion-titulo">Mi Carrito</h2>
      <div id="carritoLista" className="carrito-lista">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="carritoCuerpo">

            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="3">Tu carrito está vacío</td>
              </tr>
            ) : (

              cartItems.map(item => (
                <CartItem key={item.nombre}
                 item={item}
                 onRemove={onRemoveItem}
                 onIncrease={onIncreaseQuantity}
                 onDecrease={onDecreaseQuantity} 
                 />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <Button className="btn" onClick={handleAgregarAleatorio}>
        Agregar Producto Aleatorio
      </Button>
      
      <h3>Total: $<span id="totalCarrito">{cartTotal}</span></h3>      
     
      <Button className="btn" onClick={onClearCart}>
        Vaciar Carrito
      </Button>
      {cartItems.length > 0 && (
        <Link to="/checkout" className="btn" style={{ marginLeft: '10px' }}>
          Finalizar Compra
        </Link>
      )}
    </section>
  );
}

export default CartSection;