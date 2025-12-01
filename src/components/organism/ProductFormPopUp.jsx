import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import styles from '../../styles/RegisterPopUp.module.css'; // Reutilizamos estilos del popup
import ProductoService from '../../services/ProductoService';

function ProductFormPopUp({ onClose, onSuccess }) {
  
  const [formData, setFormData] = useState({
    nombre: '',
    origen: '',
    precio: '', // Ej: "$1.500 / kg"
    stock: '',
    categoria: 'Frutas', // Valor por defecto
    imagenSrc: '/images/placeholder.jpg', // Imagen por defecto o URL externa
    descripcion: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convertir stock a número
    const productToSend = {
        ...formData,
        stock: parseInt(formData.stock)
    };

    try {
      await ProductoService.createProducto(productToSend);
      alert("¡Producto creado con éxito!");
      onSuccess(); // Avisar al padre (Catalogo) para que recargue
      onClose();   // Cerrar el popup
    } catch (error) {
      console.error(error);
      alert("Error al crear producto. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} style={{ maxWidth: '500px' }}> {/* Un poco más ancho */}
        <h2>Nuevo Producto</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Input id="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            <Input id="origen" placeholder="Origen" value={formData.origen} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Input id="precio" placeholder="Precio ($1.000 / kg)" value={formData.precio} onChange={handleChange} required />
            <Input id="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          </div>

          {/* Select para Categoría */}
          <select 
            id="categoria" 
            className="form-select mb-3" 
            value={formData.categoria} 
            onChange={handleChange}
            style={{ padding: '0.75rem', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="Frutas">Frutas</option>
            <option value="Verduras">Verduras</option>
            <option value="Organicos">Orgánicos</option>
            <option value="Lacteos">Lácteos</option>
          </select>

          <Input id="imagenSrc" placeholder="URL de Imagen (/images/...)" value={formData.imagenSrc} onChange={handleChange} />
          
          <textarea 
            id="descripcion" 
            placeholder="Descripción del producto" 
            className="form-control mb-3"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </Button>
        </form>
        
        <button className={styles.close} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default ProductFormPopUp;