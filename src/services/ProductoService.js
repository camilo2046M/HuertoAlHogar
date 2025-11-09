import axios from 'axios';

// 1. URL base de NUESTRO backend Spring Boot
const API_BASE_URL = 'http://localhost:9090/api/productos';

class ProductoService {

    // (GET /api/productos) - Adaptado para paginación
    getAllProductos(page = 0, size = 10, sort = 'nombre,asc') {
        return axios.get(API_BASE_URL, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        });
    }

    // (GET /api/productos/{id})
    getProductoById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    // (POST /api/productos)
    createProducto(producto) {
        return axios.post(API_BASE_URL, producto);
    }

    // (PUT /api/productos/{id})
    updateProducto(id, producto) {
        return axios.put(`${API_BASE_URL}/${id}`, producto);
    }

    // (DELETE /api/productos/{id})
    deleteProducto(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }

    // (GET /api/productos/buscar) - El que creamos
    searchProductos(nombre) {
        return axios.get(`${API_BASE_URL}/buscar`, {
            params: { nombre: nombre }
        });
    }

    getProductosByCategoria(categoria) {
        return axios.get(`${API_BASE_URL}/categoria/${categoria}`);
    }
}

// Exportamos una instancia de la clase
export default new ProductoService();