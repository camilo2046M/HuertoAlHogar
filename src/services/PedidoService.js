import api from '../api/AxiosConfig.js';

const API_BASE_URL = '/pedidos';

class PedidoService {

    crearPedido(pedidoRequest) {
        return api.post(API_BASE_URL, pedidoRequest);
    }

    getPedidosPorUsuario(usuarioId) {
        return api.get(`${API_BASE_URL}/usuario/${usuarioId}`);
    }
}

export default new PedidoService();