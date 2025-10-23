import React from "react";
import Hero from "../organism/Hero.jsx";
import ProductList from "../organism/ProductList.jsx";

const productosDestacados = [
  { 
    nombre: 'Manzanas Fuji', 
    origen: 'Villarica', 
    precio: '$2.500 / kg',
    imagenSrc: '/images/manzana.jpg'
  },
  { 
    nombre: 'Zanahorias Orgánicas', 
    origen: 'Valparaíso', 
    precio: '$1.800 / kg',
    imagenSrc: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=600&q=80'
  },
  { 
    nombre: 'Miel Orgánica', 
    origen: 'Nacimiento', 
    precio: '$5.000 / frasco',
    imagenSrc: '/images/miel.jpg'
  }
];


function Home({onAddToCart}) {
  return (
    <>
      <Hero />
      <ProductList 
        titulo="Productos Destacados"
        productos={productosDestacados}
        onAddToCart={onAddToCart}
      />
    </>
  );
}

export default Home;