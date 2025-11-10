import React, { useState, useEffect } from 'react'; // 1. Importa useState y useEffect
import Hero from '../organism/Hero.jsx';
import ProductList from '../organism/ProductList.jsx';
import ProductoService from '../../services/ProductoService.js'; // 2. Importa el servicio

function Home({ onAddToCart }) {
  
  // 3. Crea un estado para guardar los productos que lleguen de la API
  const [productosDestacados, setProductosDestacados] = useState([]);

  // 4. useEffect para cargar los datos de la API cuando el componente se monta
  useEffect(() => {
    
    const fetchDestacados = async () => {
      try {
        // 5. Llama al servicio pidiendo la página 0, tamaño 3
        const response = await ProductoService.getAllProductos(0, 3);
        
        // 6. Guarda los productos (vienen dentro de 'content' en la paginación)
        setProductosDestacados(response.data.content);
        
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
        // Manejo de error (opcional)
      }
    };

    fetchDestacados();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  // El resto del componente es igual, pero ahora 'productosDestacados'
  // se llena con datos reales de la API.
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