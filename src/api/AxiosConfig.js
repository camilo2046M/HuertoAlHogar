import axios from 'axios';

// La URL base de tu backend
const api = axios.create({
    baseURL: 'http://52.44.157.216:9090/api',
});

// 🔐 Interceptor REQUEST: Agrega el token a cada petición saliente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔐 Interceptor RESPONSE: Maneja errores de sesión (401/403)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Si el token venció o es inválido, cerramos sesión
            localStorage.removeItem('token');
            localStorage.removeItem('username'); // O 'user'
            // Opcional: Redirigir al login o recargar la página
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default api;