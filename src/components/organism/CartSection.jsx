import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../molecules/CartItem';
import Button from '../atoms/Button';
import styles from '../../styles/CartSection.module.css';
import buttonStyles from '../../styles/Button.module.css';  

function CartSection({ cartItems, cartTotal, onClearCart, onAddToCart, ...props }) { 

    return (
        <section className={styles.carritoSeccion}>
            <h2 className={styles.seccionTitulo}>Mi Carrito</h2>
            <div className={styles.carritoLista}>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr>
                                <td colSpan="4">Tu carrito está vacío</td>
                            </tr>
                        ) : (
                            cartItems.map(item => (
                                <CartItem
                                    key={item.nombre}
                                    item={item}
                                    onRemove={props.onRemoveItem}
                                    onIncrease={props.onIncreaseQuantity}
                                    onDecrease={props.onDecreaseQuantity}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.accionesCarrito}>
                <Button className="btn secondary" onClick={onClearCart}> 
                    Vaciar Carrito
                </Button>
                {cartItems.length > 0 && (
                    <Link to="/checkout" className={buttonStyles.btn}> 
                        Finalizar Compra
                    </Link>
                )}
            </div>
            <h3 className={styles.totalCarrito}>Total: $<span id="totalCarrito">{cartTotal}</span></h3>
        </section>
    );
}

export default CartSection;