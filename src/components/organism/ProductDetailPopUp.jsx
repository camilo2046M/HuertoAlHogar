import React from 'react';
import Button from '../atoms/Button';
// Asegúrate de que esta ruta sea correcta (o usa un module.css propio)
import styles from '../../styles/RegisterPopUp.module.css'; 
import { FaTimes } from 'react-icons/fa';
import stylesDetail from '../../styles/ProductDetailPopUp.module.css';

function ProductDetailPopUp({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const precioFormateado = new Intl.NumberFormat('es-CL', {
      style: 'currency', currency: 'CLP'
  }).format(product.precio);

  return (
    // 2. Usa styles.overlay
    <div className={stylesDetail.overlay} onClick={onClose}>
      
      {/* 3. Usa stylesDetail.popup */}
      <div className={stylesDetail.popup} onClick={(e) => e.stopPropagation()}>
        
        {/* Botón Cerrar */}
        <button className={stylesDetail.closeBtn} onClick={onClose}>
            <FaTimes />
        </button>

        {/* Contenedor de Imagen */}
        <div className={stylesDetail.imageContainer}>
            <img 
              src={product.imagenSrc} 
              alt={product.nombre} 
              className={stylesDetail.productImage} 
            />
        </div>

        {/* Contenedor de Info */}
        <div className={stylesDetail.infoContainer}>
          <span className={stylesDetail.category}>
            {product.categoria}
          </span>
          
          <h2 className={stylesDetail.title}>
            {product.nombre}
          </h2>
          
          <p className={stylesDetail.price}>
            {precioFormateado}
          </p>
          
          <p className={stylesDetail.description}>
            {product.descripcion || "Producto fresco y seleccionado de nuestros mejores proveedores locales."}
          </p>
          
          <div className={stylesDetail.meta}>
            📍 Origen: {product.origen}
          </div>
          
          <div className={stylesDetail.actionArea}>
             <Button onClick={() => { onAddToCart(product); onClose(); }}>
                Agregar al Carrito
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default ProductDetailPopUp;