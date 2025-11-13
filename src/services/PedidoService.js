import axios from 'axios';

// La URL base de NUESTRO backend de pedidos
const API_BASE_URL = 'http://localhost:9090/api/pedidos';

class PedidoService {

    /**
     * Envía la solicitud de checkout al backend.
     * @param {Object} pedidoRequest - El objeto PedidoRequestDto
     */
    crearPedido(pedidoRequest) {
        return axios.post(API_BASE_URL, pedidoRequest);
    }
    
    getPedidosPorUsuario(usuarioId) {
        return axios.get(`${API_BASE_URL}/usuario/${usuarioId}`);
    }
    // (Aquí podríamos añadir getPedidosPorUsuario, etc.)
}

export default new PedidoService();