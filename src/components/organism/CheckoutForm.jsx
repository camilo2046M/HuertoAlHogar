import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function CheckoutForm({ user, cartItems, cartTotal, onCheckoutSubmit }) {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    direccion: user?.direccion || '',
    telefono: user?.telefono || '',
    fechaEntrega: '' 
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Añade productos antes de comprar.");
      navigate('/catalogo');
      return;
    }

    if (formData.fechaEntrega === '') {
      alert("Por favor, selecciona una fecha de entrega.");
      return;
    }
    
    console.log("Pedido Enviado:", {
      cliente: formData,
      items: cartItems,
      total: cartTotal
    });
    
    alert(`¡Pedido Confirmado!
    
    Gracias por tu compra, ${formData.nombre}.
    Total: $${cartTotal}
    Entrega programada para: ${formData.fechaEntrega}
    
    (Esto es una boleta simulada)`);

    onCheckoutSubmit();
    
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Información de Despacho</h4>
      
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
        <Input id="nombre" value={formData.nombre} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Correo</label>
        <Input type="email" id="correo" value={formData.correo} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="direccion" className="form-label">Dirección de Entrega</label>
        <Input id="direccion" value={formData.direccion} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Teléfono</label>
        <Input id="telefono" value={formData.telefono} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="fechaEntrega" className="form-label">Fecha de Entrega Preferida</label>
        <input 
          type="date" 
          id="fechaEntrega" 
          className="form-control" 
          value={formData.fechaEntrega} 
          onChange={handleChange} 
          required 
        />
      </div>

      <hr className="my-4" />

      <h3 className="mb-3">Total del Pedido: ${cartTotal}</h3>
      
      <Button type="submit" className="btn btn-primary btn-lg">
        Confirmar Pedido y Pagar
      </Button>
    </form>
  );
}

export default CheckoutForm;