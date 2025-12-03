import axios from 'axios';

// Usamos la ruta de autenticación
// Usa tu IP real
const AUTH_URL = 'http://52.44.157.216:9090/api/auth';
class AuthService {

login(correo, password) {
        return axios.post(`${AUTH_URL}/login`, {
            correo: correo,
            password: password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                
                // 👇 1. GUARDAMOS EL ROL
                // Si el backend envía "role": "ADMIN", lo guardamos.
                // Si viene null, guardamos "USER" por defecto.
                localStorage.setItem('role', response.data.role || 'USER'); 
            }
            return response.data; 
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role'); // 👇 2. LIMPIAMOS EL ROL
    }
        register(usuario) {
        return axios.post(`${AUTH_URL}/register`, usuario);
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
export const getRole = () => localStorage.getItem('role');