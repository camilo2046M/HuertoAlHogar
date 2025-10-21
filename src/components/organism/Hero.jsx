import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Del campo a tu hogar</h2>
        <p>Productos frescos, locales y sostenibles</p>
        

        <Link className="btn" to="/catalogo">Ver catálogo</Link>
      </div>
    </section>
  );
}

export default Hero;