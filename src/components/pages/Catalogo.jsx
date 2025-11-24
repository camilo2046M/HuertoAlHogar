import React , {useState, useEffect,useMemo} from 'react';
import ProductList from '../organism/ProductList.jsx';
import FilterControls from '../organism/FilterControls.jsx';
import ProductoService from '../../services/ProductoService.js';
import styles from '../../styles/Catalogo.module.css';

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
  const [frutas, setFrutas] = useState([]);
  const [verduras, setVerduras] = useState([]);
  const [organicos, setOrganicos] = useState([]);
  const [lacteos, setLacteos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    // Esta función carga los datos de todas las categorías
    const fetchCategorias = async () => {
      try {
        // Hacemos 4 llamadas a la API en paralelo
        const [frutasRes, verdurasRes, organicosRes, lacteosRes] = await Promise.all([
          ProductoService.getProductosByCategoria('Frutas'),
          ProductoService.getProductosByCategoria('Verduras'),
          ProductoService.getProductosByCategoria('Organicos'),
          ProductoService.getProductosByCategoria('Lacteos')
        ]);
        
        // Actualizamos los estados con los datos de la API
        setFrutas(frutasRes.data);
        setVerduras(verdurasRes.data);
        setOrganicos(organicosRes.data);
        setLacteos(lacteosRes.data);
        
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    };

    fetchCategorias();
  }, []);
const processedFrutas = useMemo(() => processProducts(frutas, searchTerm, sortOrder), [frutas, searchTerm, sortOrder]);
const processedVerduras = useMemo(() => processProducts(verduras, searchTerm, sortOrder), [verduras, searchTerm, sortOrder]);
const processedOrganicos = useMemo(() => processProducts(organicos, searchTerm, sortOrder), [organicos, searchTerm, sortOrder]);
const processedLacteos = useMemo(() => processProducts(lacteos, searchTerm, sortOrder), [lacteos, searchTerm, sortOrder]);

const totalResults = processedFrutas.length + processedVerduras.length + processedOrganicos.length + processedLacteos.length;

  return (
    <>
{/* 👇 2. REEMPLAZA LA SECCIÓN HERO ANTIGUA POR ESTO */}
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Catálogo de Productos</h1>
        <p className={styles.subtitle}>
          Selecciona productos frescos, locales y sostenibles para tu hogar
        </p>
      </header>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      
    {totalResults === 0 && (
        <div className="text-center py-5">
          <h3>No encontramos productos que coincidan con tu búsqueda.</h3>
          <p>Intenta con otro nombre o cambia los filtros.</p>
        </div>
      )}

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