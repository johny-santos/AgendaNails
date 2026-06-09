// ─────────────────────────────────────────────────────────────
// Configuração da API Backend
// URL do servidor que roda em seu IP local
// ─────────────────────────────────────────────────────────────

export const API_BASE_URL = 'https://next-player-nemeses.ngrok-free.dev/api';

// Endpoints específicos
export const AUTH_ENDPOINTS = {
  registrar: `${API_BASE_URL}/auth/registrar`,
  login: `${API_BASE_URL}/auth/login`,
  validar: `${API_BASE_URL}/auth/validar`,
};
