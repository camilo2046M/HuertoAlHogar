import React, { useState } from 'react';
import MapViewer from '../molecules/MapViewer.jsx';

const locations = [
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425998.7441418561!2d-70.95947141116672!3d-33.47235168616523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1757650287905!5m2!1ses!2scl", // Santiago
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107015.64893783003!2d-71.69344916022898!3d-33.05017336389951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde3de20cec7%3A0xeb0a3a8cbfe19b76!2sValpara%C3%ADso!5e0!3m2!1ses!2scl!4v1757650198091!5m2!1ses!2scl", // Valparaíso
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107069.9045672596!2d-71.61265616188503!3d-33.00550183264753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de84ead41255%3A0x8e5fde76df3d413f!2zVmnDsWEgZGVsIE1hciwgVmFscGFyYcOtc28!5e0!3m2!1ses!2scl!4v1757650029336!5m2!1ses!2scl"  // Viña del Mar
];

function MapSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {

    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };


  const currentMapSrc = locations[currentIndex];

  return (
    <section id="maps">
      <h2>Nuestras Ubicaciones</h2>
      <p>Operamos en más de 9 puntos a lo largo de Chile, incluyendo:</p>
      <ul>
        <li>Santiago</li>
        <li>Puerto Montt</li>
        <li>Villarica</li>
        <li>Nacimiento</li>
        <li>Viña del Mar</li>
        <li>Valparaíso</li>
        <li>Concepción</li>
      </ul>
      <p>A continuación, puedes ver nuestras ubicaciones en el mapa:</p>
      
      <MapViewer 
        currentMapSrc={currentMapSrc}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
    </section>
  );
}

export default MapSection;