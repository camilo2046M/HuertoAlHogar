// 👇 1. CORRECCIÓN: Usa '..' para subir de carpeta (de 'services' a 'src' y luego a 'api')
import api from '../api/AxiosConfig.js'; 

// 👇 2. CORRECCIÓN: Quita '/api' porque ya está en la configuración de Axios
const API_BASE_URL = '/productos'; 

class ProductoService {

    getAllProductos(page = 0, size = 10, sort = 'nombre,asc') {
        return api.get(API_BASE_URL, {
            params: { page, size, sort }
        });
    }

    getProductoById(id) {
        return api.get(`${API_BASE_URL}/${id}`);
    }

    createProducto(producto) {
        return api.post(API_BASE_URL, producto);
    }

    updateProducto(id, producto) {
        return api.put(`${API_BASE_URL}/${id}`, producto);
    }

    deleteProducto(id) {
        return api.delete(`${API_BASE_URL}/${id}`);
    }

    searchProductos(nombre) {
        return api.get(`${API_BASE_URL}/buscar`, {
            params: { nombre }
        });
    }
    
    getProductosByCategoria(categoria) {
        return api.get(`${API_BASE_URL}/categoria/${categoria}`);
    }
}

export default new ProductoService();