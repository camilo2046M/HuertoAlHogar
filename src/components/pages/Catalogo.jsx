import React, { useState, useEffect, useMemo } from 'react';
import ProductList from '../organism/ProductList.jsx';
import FilterControls from '../organism/FilterControls.jsx';
import ProductoService from '../../services/ProductoService.js';
import styles from '../../styles/Catalogo.module.css'; 
import { useAuth } from '../../context/AuthContext'; 
import Button from '../atoms/Button';
import ProductFormPopUp from '../organism/ProductFormPopUp.jsx';
import ProductDetailPopUp from '../organism/ProductDetailPopUp';

const processProducts = (products, searchTerm, sortOrder) => {
  let processed = [...products];

  // 1. Filtro por Nombre
  processed = processed.filter(p => {
    if (searchTerm === '') return true;
    return p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Función segura para obtener el precio numérico
  const getPrice = (precio) => {
    // Si ya es número, devuélvelo
    if (typeof precio === 'number') return precio;
    
    // Si es string, límpialo
    if (typeof precio === 'string') {
        const cleanPrice = precio
          .replace('$', '')
          .replace(/\./g, '') 
          .replace(',', '.'); 
        return parseFloat(cleanPrice) || 0;
    }
    return 0;
  };

  // 2. Ordenamiento
  if (sortOrder === 'price-asc') {
    processed.sort((a, b) => getPrice(a.precio) - getPrice(b.precio));
  } else if (sortOrder === 'price-desc') {
    processed.sort((a, b) => getPrice(b.precio) - getPrice(a.precio));
  }
  
  return processed;
};

function Catalogo({ onAddToCart }) {
  // --- ESTADOS ---
  const [frutas, setFrutas] = useState([]);
  const [verduras, setVerduras] = useState([]);
  const [organicos, setOrganicos] = useState([]);
  const [lacteos, setLacteos] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Estado para el Popup de Admin
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  
  // Obtener el rol del contexto
  const { role } = useAuth();

  // --- CARGA DE DATOS (Unificada) ---
  const fetchCategorias = async () => {
      try {
        const [frutasRes, verdurasRes, organicosRes, lacteosRes] = await Promise.all([
          ProductoService.getProductosByCategoria('Frutas'),
          ProductoService.getProductosByCategoria('Verduras'),
          ProductoService.getProductosByCategoria('Organicos'),
          ProductoService.getProductosByCategoria('Lacteos')
        ]);
        setFrutas(frutasRes.data);
        setVerduras(verdurasRes.data);
        setOrganicos(organicosRes.data);
        setLacteos(lacteosRes.data);
      } catch (error) {
        console.error("Error al cargar catálogo:", error);
      }
  };

  // Un solo useEffect para cargar al inicio
  useEffect(() => {
    fetchCategorias();
  }, []);

    const [selectedProduct, setSelectedProduct] = useState(null);

  // --- PROCESAMIENTO (useMemo) ---
  // Asegúrate de incluir los estados de datos en las dependencias
  const processedFrutas = useMemo(() => processProducts(frutas, searchTerm, sortOrder), [frutas, searchTerm, sortOrder]);
  const processedVerduras = useMemo(() => processProducts(verduras, searchTerm, sortOrder), [verduras, searchTerm, sortOrder]);
  const processedOrganicos = useMemo(() => processProducts(organicos, searchTerm, sortOrder), [organicos, searchTerm, sortOrder]);
  const processedLacteos = useMemo(() => processProducts(lacteos, searchTerm, sortOrder), [lacteos, searchTerm, sortOrder]);

  const totalResults = processedFrutas.length + processedVerduras.length + processedOrganicos.length + processedLacteos.length;
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await ProductoService.deleteProducto(productId);
        alert("Producto eliminado.");
        fetchCategorias(); // Recarga la lista para que desaparezca
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el producto.");
      }
    }
  };

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Catálogo de Productos</h1>
        <p className={styles.subtitle}>
          Selecciona productos frescos, locales y sostenibles para tu hogar
        </p>
        
        {/* Botón Solo para Admin */}
        {role === 'ADMIN' && (
            <div style={{ marginTop: '1.5rem' }}>
                <Button onClick={() => setIsProductPopupOpen(true)}>
                    + Agregar Nuevo Producto
                </Button>
            </div>
        )}
      </header>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      
      {/* Mensaje si no hay resultados en la búsqueda */}
      {totalResults === 0 && (
        <div className="text-center py-5">
          <h3>No encontramos productos que coincidan con tu búsqueda.</h3>
          <p>Intenta con otro nombre o cambia los filtros.</p>
        </div>
      )}

      {/* Listas de Productos */}
      {(selectedCategory === 'all' || selectedCategory === 'frutas') && processedFrutas.length > 0 && (
        <ProductList 
          titulo="🍎 Frutas Frescas" 
          productos={processedFrutas} 
          onAddToCart={onAddToCart} 
          onDelete={handleDeleteProduct}
          onViewDetails={(producto) => setSelectedProduct(producto)}
        />
      )}
      
      {(selectedCategory === 'all' || selectedCategory === 'verduras') && processedVerduras.length > 0 && (
        <ProductList 
          titulo="🥕 Verduras Orgánicas" 
          productos={processedVerduras} 
          onAddToCart={onAddToCart} 
          onDelete={handleDeleteProduct}
          onViewDetails={(producto) => setSelectedProduct(producto)}
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'organicos') && processedOrganicos.length > 0  &&(
        <ProductList 
          titulo="🌿 Productos Orgánicos" 
          productos={processedOrganicos} 
          onAddToCart={onAddToCart} 
          onDelete={handleDeleteProduct}
          onViewDetails={(producto) => setSelectedProduct(producto)}
        />
      )}

      {(selectedCategory === 'all' || selectedCategory === 'lacteos') && processedLacteos.length > 0 && (
        <ProductList 
          titulo="🥛 Productos Lácteos" 
          productos={processedLacteos} 
          onAddToCart={onAddToCart} 
          onDelete={handleDeleteProduct}
          onViewDetails={(producto) => setSelectedProduct(producto)}
        />
      )}

      {selectedProduct && (
         <ProductDetailPopUp 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={onAddToCart}
         />
       )}

      {/* Popup de Creación */}
      {isProductPopupOpen && (
        <ProductFormPopUp 
          onClose={() => setIsProductPopupOpen(false)} 
          onSuccess={() => {
              fetchCategorias(); // Recargar lista al guardar
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          />
        )}
    </>
  );
}

export default Catalogo;