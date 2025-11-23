import React, { useState, useEffect } from 'react';
import ProfileSection from '../organism/ProfileSection';
// 1. Importa el nuevo componente
import OrderHistoryItem from '../molecules/OrderHistoryItem'; 
// 2. Importa el Container de Bootstrap para el layout
import Container from 'react-bootstrap/Container'; 
import PedidoService from '../../services/PedidoService';
import LoyaltyPoints from '../molecules/LoyaltyPoints';

function Perfil({ user, onUpdateProfile }) {

  const [orders, setOrders] = useState([]);
  const userPoints = 1250;

  useEffect(() => {
    // Si el usuario existe y está logueado...
  if (user && user.id) { // ✅ Solo entra si el usuario tiene ID real
      const fetchOrders = async () => {
        try {
          // Llama a la API con el ID del usuario
          const response = await PedidoService.getPedidosPorUsuario(user.id);
          setOrders(response.data); // Guarda los pedidos en el estado
        } catch (error) {
          console.error("Error al cargar el historial de pedidos:", error);
        }
      };

      fetchOrders();
    } else {
      // Si el usuario cierra sesión, limpia la lista de pedidos
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      {/* Esta es la sección de perfil que ya teníamos */}
      <ProfileSection 
        user={user} 
        onUpdateProfile={onUpdateProfile} 
      />

      {/* 👇 4. AÑADE LA NUEVA SECCIÓN "MIS PEDIDOS" 👇 */}
      <Container className="py-4">
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Mis Pedidos
        </h2>
        
        {/* Verifica si el usuario está logueado */}
        {user ? (
          <div className="order-list-container">
            {/* 👇 6. Mapea sobre el estado 'orders' (real) */}
            {orders.length > 0 ? (
              orders.map(order => (
                <OrderHistoryItem key={order.id} order={order} />
              ))
            ) : (
              // Si está logueado pero no tiene pedidos
              <p>Aún no has realizado ningún pedido.</p>
            )}
          </div>
        ) : (
          <p>Inicia sesión para ver tu historial de pedidos.</p>
        )}
      </Container>
      <Container className="pb-5"> {/* pb-5 = padding-bottom 5 */}
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Mis Puntos
        </h2>
        
        {user ? (
          <LoyaltyPoints points={userPoints} />
        ) : (
          <p>Inicia sesión para ver tus puntos.</p>
        )}
      </Container>
    </>
  );
}

export default Perfil;