import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api.config';

// ─────────────────────────────────────────────────────────────
// Serviço de API com Axios
// Gerencia requisições HTTP para o backend
// Inclui interceptor para adicionar token JWT automaticamente
// ─────────────────────────────────────────────────────────────

class ApiService {
  private api: AxiosInstance;

  constructor() {
    // Cria instância do axios com URL base
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token JWT nas requisições
    this.api.interceptors.request.use(
      async (config) => {
        try {
          // Busca token armazenado no dispositivo
          const token = await AsyncStorage.getItem('auth_token');
          if (token) {
            // Adiciona token no header Authorization
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (erro) {
          console.error('Erro ao buscar token:', erro);
        }
        return config;
      },
      (erro) => {
        return Promise.reject(erro);
      }
    );

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response) => response,
      async (erro) => {
        if (erro.response?.status === 401) {
          // Token expirou ou é inválido - limpa storage
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('usuario');
        }
        return Promise.reject(erro);
      }
    );
  }

  // ── Métodos de Autenticação ──

  async registrar(nome: string, email: string, senha: string, telefone?: string) {
    try {
      const response = await this.api.post('/auth/registrar', {
        nome,
        email,
        senha,
        telefone: telefone || null,
        tipo_usuario: 'CLIENTE',
      });

      // Se registro foi bem-sucedido, salva token e dados do usuário
      if (response.data.token) {
        await this.salvarAutenticacao(response.data.token, response.data.usuario);
      }

      return response.data;
    } catch (erro: any) {
      throw {
        mensagem: erro.response?.data?.mensagem || 'Erro ao registrar',
        status: erro.response?.status,
      };
    }
  }

  async login(email: string, senha: string) {
    try {
      const response = await this.api.post('/auth/login', {
        email,
        senha,
      });

      // Se login foi bem-sucedido, salva token e dados do usuário
      if (response.data.token) {
        await this.salvarAutenticacao(response.data.token, response.data.usuario);
      }

      return response.data;
    } catch (erro: any) {
      throw {
        mensagem: erro.response?.data?.mensagem || 'Erro ao fazer login',
        status: erro.response?.status,
      };
    }
  }

  async validarToken() {
    try {
      const response = await this.api.get('/auth/validar');
      return response.data;
    } catch (erro: any) {
      throw {
        mensagem: erro.response?.data?.mensagem || 'Erro ao validar token',
        status: erro.response?.status,
      };
    }
  }

  // ── Métodos auxiliares ──

  private async salvarAutenticacao(token: string, usuario: any) {
    try {
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (erro) {
      console.error('Erro ao salvar autenticação:', erro);
    }
  }

  async obterTokenArmazenado(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (erro) {
      console.error('Erro ao obter token:', erro);
      return null;
    }
  }

  async obterUsuarioArmazenado() {
    try {
      const usuarioJson = await AsyncStorage.getItem('usuario');
      return usuarioJson ? JSON.parse(usuarioJson) : null;
    } catch (erro) {
      console.error('Erro ao obter usuário:', erro);
      return null;
    }
  }

  async limparAutenticacao() {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('usuario');
    } catch (erro) {
      console.error('Erro ao limpar autenticação:', erro);
    }
  }
}

// Exporta instância única (singleton)
export default new ApiService();
