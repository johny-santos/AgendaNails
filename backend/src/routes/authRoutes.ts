import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { autenticar } from '../middleware/auth';

// ─────────────────────────────────────────────────────────────
// Rotas de Autenticação
// POST /api/auth/registrar - Registrar nova profissional
// POST /api/auth/login - Fazer login profissional
// GET /api/auth/validar - Validar token (protegida)
// ─────────────────────────────────────────────────────────────

const router = Router();

// Rota pública: registrar nova profissional
router.post('/registrar', AuthController.registrar);

// Rota pública: fazer login profissional
router.post('/login', AuthController.login);

// Rota protegida: validar token (requer autenticação)
router.get('/validar', autenticar, AuthController.validarToken);

export default router;
