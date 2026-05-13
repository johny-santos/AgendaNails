import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { autenticar } from '../middleware/auth';

// ─────────────────────────────────────────────────────────────
// Rotas de Autenticação
// POST /api/auth/registrar - Registrar novo usuário
// POST /api/auth/login - Fazer login
// GET /api/auth/validar - Validar token (protegida)
// ─────────────────────────────────────────────────────────────

const router = Router();

// Rota pública: registrar novo usuário
router.post('/registrar', AuthController.registrar);

// Rota pública: fazer login
router.post('/login', AuthController.login);

// Rota protegida: validar token (requer autenticação)
router.get('/validar', autenticar, AuthController.validarToken);

export default router;
