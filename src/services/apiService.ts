import axios from 'axios';

const API_URL = 'http://192.168.150.106:3000/api';

export default {
  async login(email: string, senha: string) {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      senha,
    });

    return response.data;
  },

  async registrar(
    nome: string,
    email: string,
    senha: string
  ) {
    const response = await axios.post(`${API_URL}/registrar`, {
      nome,
      email,
      senha,
    });

    return response.data;
  }
};