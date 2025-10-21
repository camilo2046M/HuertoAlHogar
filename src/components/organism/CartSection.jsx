import React, {useMemo} from 'react';
import CartItem from '../molecules/CartItem.jsx';
import Button from '../atoms/Button.jsx';

const productosDisponibles = [
  { nombre: "Manzana", precio: 500, imagen: "/images/manzana.jpg" },
  { nombre: "Miel", precio: 1000, imagen: "/images/miel.jpg" },
  { nombre: "Leche", precio: 1200, imagen: "/images/leche.jpg" },
];

function CartSection({ cartItems, onClearCart, onAddToCart }) {

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }, [cartItems]);

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
            </tr>
          </thead>
          <tbody id="carritoCuerpo">

            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="3">Tu carrito está vacío</td>
              </tr>
            ) : (

              cartItems.map(item => (
                <CartItem key={item.nombre} item={item} />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <Button className="btn" onClick={handleAgregarAleatorio}>
        Agregar Producto Aleatorio
      </Button>
      
      <h3>Total: $<span id="totalCarrito">{total}</span></h3>
      
      <Button className="btn" onClick={onClearCart}>
        Vaciar Carrito
      </Button>
    </section>
  );
}

export default CartSection;