import React from 'react';
import Button from '../atoms/Button';
import StarRating from '../atoms/StarRating'; 
import styles from '../../styles/ProductCard.module.css';
import { useAuth } from '../../context/AuthContext';
import { FaShareAlt, FaWhatsapp, FaTwitter } from 'react-icons/fa';

function ProductCard({ producto, onAddToCart, onDelete , onViewDetails}) {

  const { role } = useAuth();
  const shareProduct = (platform) => {
      const text = `¡Mira este producto de HuertoHogar: ${nombre}!`;
      const url = window.location.href;
      if (platform === 'whatsapp') {
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
      } else if (platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      }
      };

  const {
    imagenSrc,
    nombre,
    origen,
    precio,
    descripcion,
    disponibilidad,
    rating,
    reviewCount
  } = producto;

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);

  const handleAgregarClick = () => {
    onAddToCart(producto);
  };

  return (
      <div className={styles.producto}>
        <div style={{ position: 'relative' }}>
          <img 
        src={imagenSrc} 
        alt={nombre} 
        onClick={() => onViewDetails(producto)} 
        style={{ cursor: 'pointer' }} 
      />
          {/* Botones flotantes de compartir */}
          <div className={styles.shareButtons}>
               <button onClick={() => shareProduct('whatsapp')} className={styles.iconBtn} title="Compartir en WhatsApp"><FaWhatsapp /></button>
               <button onClick={() => shareProduct('twitter')} className={styles.iconBtn} title="Compartir en Twitter"><FaTwitter /></button>
        </div>
      </div>
      
      <h3 
        onClick={() => onViewDetails(producto)} 
        style={{ cursor: 'pointer' }}
      >
        {nombre}
      </h3>

      <div className={styles.ratingContainer}>
        <StarRating rating={rating} reviewCount={reviewCount} />
      </div>

      <p className={styles.meta}>Origen: {origen}</p>
      <p className={styles.precio}>{precioFormateado}</p> 
     {descripcion && <p>{descripcion}</p>}
      {disponibilidad && <p>{disponibilidad}</p>}

      {role === 'ADMIN' ? (
        // Si es ADMIN, mostramos botón de borrar
        <Button className="btn danger small" onClick={() => onDelete(producto.id)}>
          Eliminar Producto
        </Button>
      ) : (
        // Si es USER o Invitado, mostramos botón de comprar
        <Button className="btn small" onClick={() => onAddToCart(producto)}>
          Agregar al carrito
        </Button>
      )}
    </div>
  );
}

export default ProductCard;