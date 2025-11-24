import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
// 👇 1. Importa el nuevo servicio
import PedidoService from '../../services/PedidoService'; 

// 👇 2. Recibe 'user' y 'cartItems'
function CheckoutForm({ user, cartItems, cartTotal, onCheckoutSubmit }) {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    // Pre-llenamos con datos del usuario si existe
    nombre: user?.nombre || '', 
    correo: user?.correo || '',
    direccion: user?.direccion || '',
    telefono: user?.telefono || '',
    fechaEntrega: '' 
  });

const [isLoading, setIsLoading] = useState(false); // 1. Añadimos estado de carga

useEffect(() => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Serás redirigido al catálogo.");
      navigate('/catalogo');
    }
  }, [cartItems, navigate]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  // 👇 2. TU FUNCIÓN 'handleSubmit' SE REEMPLAZA POR ESTA
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- Validación (igual que antes) ---
    if (!user) {
      alert("Debes iniciar sesión para realizar un pedido.");
      navigate('/'); 
      return;
    }
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      navigate('/catalogo');
      return;
    }
    if (formData.fechaEntrega === '') {
      alert("Por favor, selecciona una fecha de entrega.");
      return;
    }

    // Activa el estado de carga para deshabilitar el botón
    setIsLoading(true);

    // --- Preparar el DTO (igual que antes) ---
    const itemsDto = cartItems.map(item => ({
      productoId: item.id,
      cantidad: item.cantidad
    }));

    const pedidoRequest = {
      usuarioId: user.id,
      items: itemsDto,
      direccionEntrega: formData.direccion,
      telefonoEntrega: formData.telefono,
      fechaEntregaPreferida: formData.fechaEntrega
    };

    // --- Llamada a la API (AHORA ES DIFERENTE) ---
    try {
      // 3. Llama al backend, que ahora devuelve { "urlPago": "..." }
      const response = await PedidoService.crearPedido(pedidoRequest);
      const urlDePago = response.data.urlPago;

      // 4. Limpia el carrito en React
      onCheckoutSubmit(); 
      
      // 5. ¡LA MAGIA! Redirige al usuario a la pasarela de pago
      window.location.href = urlDePago;

    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
      setIsLoading(false); // Reactiva el botón si hay un error
    }
  };

return (
    // Asegúrate de que el 'onSubmit' esté en la etiqueta <form>
    <form onSubmit={handleSubmit}>
      <h4>Información de Despacho</h4>
      
      {/* --- AQUÍ ESTÁN LOS CAMPOS QUE FALTAN --- */}

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

      {/* --- FIN DE LOS CAMPOS QUE FALTAN --- */}


      {/* Y aquí está el campo de fecha que ya tenías */}
      <div className="mb-3">
        <label htmlFor="fechaEntrega" className="form-label">Fecha de Entrega Preferida</label>
        <input 
          type="date" 
          id="fechaEntrega" 
          className="form-control" // Estilo de Bootstrap
          value={formData.fechaEntrega} 
          onChange={handleChange} 
         min={new Date().toISOString().split('T')[0]} 
          required
        />
      </div>

      <hr className="my-4" />

      <h3 className="mb-3">Total del Pedido: ${cartTotal}</h3>
 <Button 
        type="submit" 
        className="btn btn-primary btn-lg" 
        disabled={isLoading} // Deshabilitado mientras se procesa
      >
        {isLoading ? 'Procesando...' : 'Ir a Pagar'}
      </Button>
    </form>
  );
};

export default CheckoutForm;