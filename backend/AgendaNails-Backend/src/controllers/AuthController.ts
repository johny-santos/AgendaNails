import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

// ─────────────────────────────────────────────────────────────
// Controller de Autenticação
// Gerencia login, registro e validação de tokens JWT
// ─────────────────────────────────────────────────────────────

class AuthController {
  // ── Registrar novo usuário ──
  static async registrar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha, telefone, tipo_usuario } = req.body;

      // Valida campos obrigatórios
      if (!nome || !email || !senha) {
        res.status(400).json({
          sucesso: false,
          mensagem: 'Nome, email e senha são obrigatórios',
        });
        return;
      }

      // Verifica se email já existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        res.status(409).json({
          sucesso: false,
          mensagem: 'Email já cadastrado',
        });
        return;
      }

      // Cria novo usuário
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha,
        telefone: telefone || null,
        tipo_usuario: tipo_usuario || 'CLIENTE',
      });

      // Gera token JWT
      const token = jwt.sign(
        { id: novoUsuario.id_usuario, email: novoUsuario.email },
        process.env.JWT_SECRET || 'sua_chave_jwt_super_secreta',
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
      );

      res.status(201).json({
        sucesso: true,
        mensagem: 'Usuário cadastrado com sucesso',
        token,
        usuario: {
          id: novoUsuario.id_usuario,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          tipo_usuario: novoUsuario.tipo_usuario,
        },
      });
    } catch (erro) {
      console.error('Erro ao registrar:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao registrar usuário',
      });
    }
  }

  // ── Login de usuário ──
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      // Valida campos obrigatórios
      if (!email || !senha) {
        res.status(400).json({
          sucesso: false,
          mensagem: 'Email e senha são obrigatórios',
        });
        return;
      }

      // Busca usuário no banco
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        res.status(401).json({
          sucesso: false,
          mensagem: 'Email ou senha inválidos',
        });
        return;
      }

      // Valida senha
      const senhaValida = await usuario.validarSenha(senha);
      if (!senhaValida) {
        res.status(401).json({
          sucesso: false,
          mensagem: 'Email ou senha inválidos',
        });
        return;
      }

      // Verifica se usuário está ativo
      if (usuario.status === 'INATIVO') {
        res.status(403).json({
          sucesso: false,
          mensagem: 'Usuário inativo',
        });
        return;
      }

      // Gera token JWT
      const token = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET || 'sua_chave_jwt_super_secreta',
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
      );

      res.status(200).json({
        sucesso: true,
        mensagem: 'Login realizado com sucesso',
        token,
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario,
        },
      });
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao fazer login',
      });
    }
  }

  // ── Validar token (rota protegida de exemplo) ──
  static async validarToken(req: Request, res: Response): Promise<void> {
    try {
      // Se chegou aqui, o middleware de autenticação validou o token
      const usuarioId = (req as any).usuarioId;

      const usuario = await Usuario.findByPk(usuarioId, {
        attributes: { exclude: ['senha'] },
      });

      if (!usuario) {
        res.status(404).json({
          sucesso: false,
          mensagem: 'Usuário não encontrado',
        });
        return;
      }

      res.status(200).json({
        sucesso: true,
        usuario,
      });
    } catch (erro) {
      console.error('Erro ao validar token:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao validar token',
      });
    }
  }
}

export default AuthController;
