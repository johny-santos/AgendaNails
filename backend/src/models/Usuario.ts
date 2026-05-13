import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

// ─────────────────────────────────────────────────────────────
// Modelo Usuario - Representa um usuário do sistema
// Cada usuário pode fazer login e agendar atendimentos
// ─────────────────────────────────────────────────────────────
class Usuario extends Model {
  public id_usuario!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public telefone?: string;
  public tipo_usuario!: 'CLIENTE' | 'PROFISSIONAL' | 'ADMIN'; // CLIENTE: faz agendamentos, PROFISSIONAL: realiza atendimentos
  public status!: 'ATIVO' | 'INATIVO';
  public data_criacao!: Date;
  public data_modificacao?: Date;

  // Método para validar senha com bcrypt
  public async validarSenha(senhaDigitada: string): Promise<boolean> {
    return bcrypt.compare(senhaDigitada, this.senha);
  }
}

// Define a tabela de usuários
Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tipo_usuario: {
      type: DataTypes.ENUM('CLIENTE', 'PROFISSIONAL', 'ADMIN'),
      allowNull: false,
      defaultValue: 'CLIENTE',
    },
    status: {
      type: DataTypes.ENUM('ATIVO', 'INATIVO'),
      allowNull: false,
      defaultValue: 'ATIVO',
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data_modificacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
  }
);

// Hook para criptografar senha antes de salvar
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.senha = await bcrypt.hash(usuario.senha, salt);
});

// Hook para criptografar senha antes de atualizar (se mudar a senha)
Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('senha')) {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  }
  usuario.data_modificacao = new Date();
});

export default Usuario;
