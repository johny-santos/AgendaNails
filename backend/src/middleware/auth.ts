import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ─────────────────────────────────────────────────────────────
// Middleware de Autenticação com JWT
// Valida token do header Authorization
// ─────────────────────────────────────────────────────────────

interface AuthenticatedRequest extends Request {
  usuarioId?: number;
}

export const autenticar = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Busca token no header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        sucesso: false,
        mensagem: 'Token não fornecido',
      });
      return;
    }

    // Token vem no formato "Bearer <token>"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    // Verifica e decodifica o token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'sua_chave_jwt_super_secreta'
    ) as { id: number };

    // Passa o ID do usuário para o controller via req
    req.usuarioId = decoded.id;

    next();
  } catch (erro) {
    res.status(401).json({
      sucesso: false,
      mensagem: 'Token inválido ou expirado',
    });
  }
};
