import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import Usuario from './models/Usuario';

// ─────────────────────────────────────────────────────────────
// Servidor Express para AgendaNails Backend
// ─────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ── Rotas ──
app.use('/api/auth', authRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AgendaNails Backend está rodando',
    timestamp: new Date().toISOString(),
  });
});

// ── Inicializar servidor ──
const iniciarServidor = async () => {
  try {
    // Testa conexão com banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com banco de dados estabelecida');

    // Sincroniza modelos com banco de dados
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com banco de dados');

    // Inicia servidor
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📝 Documentação das rotas:`);
      console.log(`   POST   /api/auth/registrar  - Registrar novo usuário`);
      console.log(`   POST   /api/auth/login      - Fazer login`);
      console.log(`   GET    /api/auth/validar   - Validar token (protegida)`);
      console.log(`   GET    /health             - Health check\n`);
    });
  } catch (erro) {
    console.error('❌ Erro ao iniciar servidor:', erro);
    process.exit(1);
  }
};

iniciarServidor();

export default app;
