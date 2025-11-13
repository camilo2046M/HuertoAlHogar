import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/usuarios';

class AuthService {

    login(correo, password) {
        return axios.post(`${API_BASE_URL}/login`, {
            correo: correo,
            password: password
        });
    }

    register(usuario) {
        return axios.post(`${API_BASE_URL}/register`, usuario);
    }

}

export default new AuthService();