import sequelize from './config/database';
import Usuario from './models/Usuario';

// ─────────────────────────────────────────────────────────────
// Script para sincronizar tabelas com banco de dados
// Rode com: npm run sync-db
// ─────────────────────────────────────────────────────────────

const sincronizarBanco = async () => {
  try {
    console.log('🔄 Sincronizando banco de dados...\n');

    // Testa conexão
    await sequelize.authenticate();
    console.log('✅ Conexão com banco de dados estabelecida');

    // Sincroniza todos os modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso!');

    // Mostra informações da tabela usuarios
    const usuariosCount = await Usuario.count();
    console.log(`\n📊 Tabela "usuarios" contém ${usuariosCount} registros`);

    process.exit(0);
  } catch (erro) {
    console.error('❌ Erro ao sincronizar:', erro);
    process.exit(1);
  }
};

sincronizarBanco();
