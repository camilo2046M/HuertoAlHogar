import React from 'react';
import ProductList from '../organism/ProductList.jsx';

const frutas = [
  { 
    nombre: 'Manzanas Fuji', 
    origen: 'Villarica', 
    precio: '$2.500 / kg',
    imagenSrc: '/images/manzana.jpg',
    descripcion: 'Manzana crujiente y dulce.', 
    disponibilidad: 'En stock' 
  },
  { 
    nombre: 'Naranjas Valencia', 
    origen: 'Concepción', 
    precio: '$2.200 / kg',
    imagenSrc: '/images/naranja.jpg'
  },
  { 
    nombre: 'Plátanos Cavendish', 
    origen: 'Santiago', 
    precio: '$1.900 / kg',
    imagenSrc: '/images/platanos.jpg'
  }
];

const verduras = [
  { 
    nombre: 'Zanahorias Orgánicas', 
    origen: 'Valparaíso', 
    precio: '$1.800 / kg',
    imagenSrc: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=600&q=80'
  },
  { 
    nombre: 'Espinacas Frescas', 
    origen: 'Viña del Mar', 
    precio: '$2.000 / bolsa',
    imagenSrc: '/images/espinaca.jpg'
  },
  { 
    nombre: 'Pimientos Tricolores', 
    origen: 'Puerto Montt', 
    precio: '$2.700 / bandeja',
    imagenSrc: '/images/pimenton.jpg'
  }
];

const organicos = [
  { 
    nombre: 'Miel Orgánica', 
    origen: 'Nacimiento', 
    precio: '$5.000 / frasco',
    imagenSrc: '/images/miel.jpg'
  },
  { 
    nombre: 'Quinua Orgánica', 
    origen: 'Villarica', 
    precio: '$4.200 / bolsa',
    imagenSrc: '/images/quinuo.jpg'
  }
];

const lacteos = [
  { 
    nombre: 'Leche Entera', 
    origen: 'Concepción', 
    precio: '$1.500 / litro',
    imagenSrc: '/images/leche.jpg'
  }
];


function Catalogo({ onAddToCart }) {
  return (
    <>
      <section className="hero">
        <h2>Catálogo de Productos</h2>
        <p>Selecciona productos frescos y locales para tu hogar</p>
      </section>


      
      <ProductList 
        titulo="🍎 Frutas Frescas" 
        productos={frutas} 
        onAddToCart={onAddToCart} 
      />
      
      <ProductList 
        titulo="🥕 Verduras Orgánicas" 
        productos={verduras} 
        onAddToCart={onAddToCart} 
      />

      <ProductList 
        titulo="🌿 Productos Orgánicos" 
        productos={organicos} 
        onAddToCart={onAddToCart} 
      />

      <ProductList 
        titulo="🥛 Productos Lácteos" 
        productos={lacteos} 
        onAddToCart={onAddToCart} 
      />
    </>
  );
}

export default Catalogo;