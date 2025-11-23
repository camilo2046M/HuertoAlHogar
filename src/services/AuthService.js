import axios from 'axios';

// Usamos la ruta de autenticación
const AUTH_URL = 'http://localhost:9090/api/auth';

class AuthService {

    login(correo, password) {
        return axios.post(`${AUTH_URL}/login`, {
            correo: correo,
            password: password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // Guardamos el username solo como referencia rápida
                localStorage.setItem('username', response.data.username); 
            }
            return response.data; 
        });
    }

    register(usuario) {
        return axios.post(`${AUTH_URL}/register`, usuario);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
    
    // 👇 ESTE ES EL ARREGLO CLAVE
    getPerfil() {
        // 1. Recuperamos el token aquí mismo
        const token = localStorage.getItem('token');
        
        // 2. Hacemos la llamada configurando el header manualmente
        // (No usamos AxiosConfig aquí para evitar dependencias circulares o rutas incorrectas)
        return axios.get(`${AUTH_URL}/perfil`, {
             headers: { Authorization: `Bearer ${token}` } 
        });
    }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

// Exportaciones auxiliares
export const logout = () => authServiceInstance.logout();
export const isAuthenticated = () => !!localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');