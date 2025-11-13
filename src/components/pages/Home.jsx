import React, { useState, useEffect } from 'react'; 
import Hero from '../organism/Hero.jsx';
import ProductList from '../organism/ProductList.jsx';
import ProductoService from '../../services/ProductoService.js'; 
import BlogTeaser from '../organism/BlogTeaser.jsx';

function Home({ onAddToCart }) {
  
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    
    const fetchDestacados = async () => {
      try {
        const response = await ProductoService.getAllProductos(0, 3);
        
        setProductosDestacados(response.data.content);
        
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      }
    };

    fetchDestacados();
  }, []); 


  return (
    <>
      <Hero />
      <ProductList 
        titulo="Productos Destacados"
        productos={productosDestacados}
        onAddToCart={onAddToCart}
      />
      <BlogTeaser />
    </>
  );
  
}

export default Home;