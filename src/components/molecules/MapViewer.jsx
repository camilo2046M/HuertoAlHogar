import React from 'react';
import Button from '../atoms/Button'; 
import styles from '../../styles/MapViewer.module.css';

function MapViewer({ currentMapSrc, onPrevClick, onNextClick }) {
  return (
    <div className={styles.mapContainer}>
      <Button className={styles.navButton} onClick={onPrevClick}>
        ⬅
      </Button>

      <iframe
        id="mapFrame" 
        className={styles.mapFrame}
        src={currentMapSrc}
        allowFullScreen=""
        loading="lazy"
        title="Nuestras Ubicaciones"
      >
      </iframe>

      <Button className={styles.navButton} onClick={onNextClick}>
        ➡
      </Button>
    </div>
  );
}

export default MapViewer;