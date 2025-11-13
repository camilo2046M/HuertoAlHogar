import React from 'react';
import { FaGift } from 'react-icons/fa'; // Importamos un ícono de regalo
import styles from '../../styles/LoyaltyPoints.module.css';

function LoyaltyPoints({ points }) {
  // Formatea el número (ej: 1250 -> 1.250)
  const formattedPoints = new Intl.NumberFormat('es-CL').format(points);

  return (
    <div className={styles.pointsCard}>
      <div className={styles.iconWrapper}>
        <FaGift size={30} />
      </div>
      <div className={styles.contentWrapper}>
        <span className={styles.points}>{formattedPoints} Puntos</span>
        <p className={styles.description}>
          ¡Sigue comprando para desbloquear descuentos exclusivos!
        </p>
      </div>
    </div>
  );
}

export default LoyaltyPoints;