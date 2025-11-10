import axios from 'axios';

// La URL base de NUESTRO backend de usuarios
const API_BASE_URL = 'http://localhost:9090/api/usuarios';

class AuthService {

    // Llama a POST /api/usuarios/login
    login(correo, password) {
        return axios.post(`${API_BASE_URL}/login`, {
            correo: correo,
            password: password
        });
    }

    // Llama a POST /api/usuarios/register
    register(usuario) {
        // 'usuario' debe ser un objeto como: { nombre: "...", correo: "...", password: "..." }
        return axios.post(`${API_BASE_URL}/register`, usuario);
    }

    // (Podríamos añadir más, como 'updateProfile', 'logout', etc.)
}

// Exportamos una instancia de la clase
export default new AuthService();