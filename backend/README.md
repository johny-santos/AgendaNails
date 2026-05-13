# AgendaNails Backend

Backend API para o aplicativo de gerenciamento de agendamentos AgendaNails.

## 🚀 Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agendanails_db
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_jwt_aqui
```

### 3. Sincronizar banco de dados
```bash
npm run sync-db
```

### 4. Iniciar servidor
```bash
npm run dev
```

Servidor rodará em `http://localhost:3000`

---

## 📚 Rotas da API

### Autenticação

**Registrar novo usuário**
```http
POST /api/auth/registrar
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "telefone": "11999999999",
  "tipo_usuario": "CLIENTE"
}
```

**Fazer login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Validar token (protegida)**
```http
GET /api/auth/validar
Authorization: Bearer {token_jwt}
```

---

## 🗄️ Banco de Dados

### Tabela: `usuarios`
- `id_usuario` (int) - PK, auto-increment
- `nome` (string, 100)
- `email` (string, 100) - Unique
- `senha` (string, 255) - Hash bcrypt
- `telefone` (string, 20) - Opcional
- `tipo_usuario` (enum) - CLIENTE | PROFISSIONAL | ADMIN
- `status` (enum) - ATIVO | INATIVO
- `data_criacao` (date)
- `data_modificacao` (date) - Nullable

---

## 🔧 Scripts

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção
- `npm run sync-db` - Sincroniza tabelas com banco de dados

---

## 📝 Notas

- Senhas são criptografadas com bcryptjs
- Tokens JWT expiram em 7 dias
- CORS habilitado para qualquer origem (configure em produção)
