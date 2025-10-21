import React from "react";
import Button from "../atoms/Button.jsx";

function MapViewer({ currentMapSrc, onPrevClick, onNextClick }) {
  return (
    <div className="map-container">
      <Button id="prev" onClick={onPrevClick}>
        ⬅
      </Button>
      
      <iframe 
        id="mapFrame"
        src={currentMapSrc} 
        allowFullScreen="" 
        loading="lazy"
        title="Nuestras Ubicaciones" 
      >
      </iframe>
      
      <Button id="next" onClick={onNextClick}>
        ➡
      </Button>
    </div>
  );
}

export default MapViewer;