import React , {useState, useMemo} from 'react';
import ProductList from '../organism/ProductList.jsx';
import FilterControls from '../organism/FilterControls';
import { frutas, verduras, organicos, lacteos } from '../../data/productos.js';




const processProducts = (products, searchTerm, sortOrder) => {
  let processed = [...products];

  processed = processed.filter(p => {
    if (searchTerm === '') {
      return true;
    }
    return p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const getPrice = (precioString) => {

    const cleanPrice = precioString
      .replace('$', '')
      .replace(/\./g, '') 
      .replace(',', '.'); 
    return parseFloat(cleanPrice);
  };

  if (sortOrder === 'price-asc') {
    processed.sort((a, b) => getPrice(a.precio) - getPrice(b.precio));
  } else if (sortOrder === 'price-desc') {
    processed.sort((a, b) => getPrice(b.precio) - getPrice(a.precio));
  }
  
  return processed;
};

function Catalogo({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  const processedFrutas = useMemo(() => processProducts(frutas, searchTerm, sortOrder), [searchTerm, sortOrder]);
  const processedVerduras = useMemo(() => processProducts(verduras, searchTerm, sortOrder), [searchTerm, sortOrder]);
  const processedOrganicos = useMemo(() => processProducts(organicos, searchTerm, sortOrder), [searchTerm, sortOrder]);
  const processedLacteos = useMemo(() => processProducts(lacteos, searchTerm, sortOrder), [searchTerm, sortOrder]);

  return (
    <>
      <section className="hero">
        <h2>Catálogo de Productos</h2>
        <p>Selecciona productos frescos y locales para tu hogar</p>
      </section>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      


      {(selectedCategory === 'all' || selectedCategory === 'frutas') && processedFrutas.length > 0 && (
        <ProductList 
          titulo="🍎 Frutas Frescas" 
          productos={processedFrutas} 
          onAddToCart={onAddToCart} 
        />
      )}
      
      {(selectedCategory === 'all' || selectedCategory === 'verduras') && processedVerduras.length > 0 && (
        <ProductList 
          titulo="🥕 Verduras Orgánicas" 
          productos={processedVerduras} 
          onAddToCart={onAddToCart} 
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'organicos') && processedOrganicos.length > 0  &&(
        <ProductList 
          titulo="🌿 Productos Orgánicos" 
          productos={processedOrganicos} 
          onAddToCart={onAddToCart} 
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'lacteos') && processedLacteos.length > 0 && (
        <ProductList 
          titulo="🥛 Productos Lácteos" 
          productos={processedLacteos} 
          onAddToCart={onAddToCart} 
        />
      )}
    </>
  );
}

export default Catalogo;