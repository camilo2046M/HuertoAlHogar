import api from '../api/AxiosConfig.js';

const API_BASE_URL = '/posts'; // Se concatena a /api

class PostService {
    getAllPosts() {
        return api.get(API_BASE_URL);
    }
}

export default new PostService();