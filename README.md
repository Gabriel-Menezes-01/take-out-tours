# Take Out Tours - Projeto Full Stack

## 🏗️ Arquitetura do Projeto

Este projeto foi reorganizado com uma **arquitetura full-stack moderna** usando as seguintes tecnologias:

### 🎨 Frontend (React + Vite + Sass)
- **Framework**: React 18.2.0
- **Build Tool**: Vite (desenvolvimento rápido + HMR)
- **Styling**: Sass com arquitetura modular
- **Routing**: React Router DOM
- **Animations**: Framer Motion + AOS
- **HTTP Client**: Axios

### 🔧 API (Node.js + Express)
- **Runtime**: Node.js com ES Modules
- **Framework**: Express.js
- **Database**: MySQL com Sequelize ORM
- **Authentication**: JWT
- **Email**: Nodemailer
- **Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting

### 🗄️ Backend (PHP - Legacy)
- **Purpose**: Compatibilidade com sistemas existentes
- **Integration**: Comunicação com API Node.js

## 📁 Estrutura de Pastas

```
takeouttours/
├── 📂 frontend/                    # React Application
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── pages/                # Páginas da aplicação
│   │   ├── styles/               # Sass (SCSS) styles
│   │   ├── utils/                # Utilitários e helpers
│   │   ├── hooks/                # Custom React hooks
│   │   └── services/             # API services
│   ├── public/                   # Assets estáticos
│   ├── package.json              # Dependências frontend
│   └── vite.config.js            # Configuração Vite
│
├── 📂 api/                        # Node.js API Server
│   ├── src/
│   │   ├── controllers/          # Controladores da API
│   │   ├── models/               # Modelos Sequelize
│   │   ├── routes/               # Rotas da API
│   │   ├── middleware/           # Middlewares
│   │   ├── config/               # Configurações
│   │   └── utils/                # Utilitários
│   ├── uploads/                  # Uploads de arquivos
│   ├── package.json              # Dependências API
│   ├── server.js                 # Servidor principal
│   └── .env.example              # Variáveis de ambiente
│
├── 📂 backend/                    # PHP Backend (Legacy)
│   └── (arquivos PHP existentes)
│
├── 📂 css/                        # CSS original (mantido)
├── 📂 js/                         # JavaScript original (mantido)
├── 📂 img/                        # Imagens
└── index.html                     # HTML original (mantido)
```

## 🚀 Como Rodar o Projeto

### 1️⃣ Pré-requisitos

```bash
# Node.js (versão 18+)
node --version

# npm ou yarn
npm --version

# MySQL/MariaDB rodando
mysql --version
```

### 2️⃣ Configuração do Banco de Dados

```sql
-- Criar banco de dados
CREATE DATABASE takeouttours CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar usuário (opcional)
CREATE USER 'takeouttours'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON takeouttours.* TO 'takeouttours'@'localhost';
FLUSH PRIVILEGES;
```

### 3️⃣ Configuração da API

```bash
# Navegar para pasta da API
cd api

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Editar .env com suas configurações
# DB_HOST=localhost
# DB_NAME=takeouttours
# DB_USER=root
# DB_PASSWORD=sua_senha
# JWT_SECRET=seu_jwt_secret_super_seguro
```

### 4️⃣ Configuração do Frontend

```bash
# Navegar para pasta frontend
cd ../frontend

# Instalar dependências
npm install
```

### 5️⃣ Executar o Projeto

#### 🔄 Desenvolvimento (Simultâneo)

```bash
# Na raiz do projeto
npm run dev
```

Este comando irá:
- Iniciar API na porta 8000
- Iniciar Frontend na porta 3000  
- Executar ambos simultaneamente

#### 🔄 Desenvolvimento (Separado)

```bash
# Terminal 1: API
cd api
npm run dev

# Terminal 2: Frontend  
cd frontend
npm run dev
```

#### 🏭 Produção

```bash
# Build do frontend
cd frontend
npm run build

# Iniciar API em produção
cd ../api
npm start
```

## 🛠️ Scripts Disponíveis

### 📦 Root Package.json
- `npm run dev` - Desenvolvimento simultâneo
- `npm run build` - Build completo
- `npm run preview` - Preview da build

### 🎨 Frontend
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Linting do código

### 🔧 API
- `npm run dev` - Desenvolvimento com nodemon
- `npm start` - Produção
- `npm run init` - Inicializar com banco
- `npm run sync` - Sincronizar modelos

## 🌐 Endpoints da API

### 🔍 Health Check
```http
GET /api/health
```

### 🎯 Tours
```http
GET    /api/tours              # Listar tours
GET    /api/tours/:id          # Buscar tour específico
GET    /api/tours/featured     # Tours em destaque
POST   /api/tours              # Criar tour (Admin)
PUT    /api/tours/:id          # Atualizar tour (Admin)
DELETE /api/tours/:id          # Deletar tour (Admin)
```

### 📅 Reservas
```http
POST   /api/bookings           # Criar reserva
GET    /api/bookings/:id       # Buscar reserva
GET    /api/bookings           # Listar reservas (Admin)
PUT    /api/bookings/:id/status # Atualizar status (Admin)
DELETE /api/bookings/:id       # Cancelar reserva
```

### 💬 Contato
```http
POST   /api/contact            # Enviar mensagem
GET    /api/contact            # Listar mensagens (Admin)
PUT    /api/contact/:id/read   # Marcar como lida (Admin)
DELETE /api/contact/:id        # Deletar mensagem (Admin)
```

### 📎 Upload
```http
POST   /api/upload/single      # Upload único (Admin)
POST   /api/upload/multiple    # Upload múltiplo (Admin)
DELETE /api/upload/:filename   # Deletar arquivo (Admin)
```

## 🎨 Sistema de Design (Sass)

### 🎯 Cores Principais
```scss
$primary-red: #dc2626;          // Vermelho principal
$primary-red-dark: #991b1b;     // Vermelho escuro
$primary-black: #1f1f1f;        // Preto principal
$primary-white: #ffffff;        // Branco
```

### 📱 Breakpoints
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1200px;
```

### 🧩 Componentes
- **Botões**: Sistema completo com variantes
- **Cards**: Tours, destinos, experiências
- **Forms**: Contato, reservas, busca
- **Layout**: Grid responsivo, containers

## 🔒 Segurança

### 🛡️ API Security
- **Helmet**: Headers de segurança
- **CORS**: Controle de origem
- **Rate Limiting**: 100 requests/15min
- **JWT**: Autenticação segura
- **Validation**: Sanitização de dados

### 🔐 Autenticação
```javascript
// Headers necessários para rotas protegidas
Authorization: Bearer <jwt_token>
```

## 📧 Sistema de Email

### ✉️ Templates Incluídos
- **Confirmação de Reserva**: Email automático para clientes
- **Notificação de Contato**: Email para administradores
- **Lembretes**: Sistema de lembretes automáticos

### ⚙️ Configuração
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu_email@gmail.com
MAIL_PASSWORD=sua_senha_de_app
```

## 🚀 Deploy

### 📦 Frontend (Netlify/Vercel)
```bash
npm run build
# Upload da pasta dist/
```

### 🔧 API (Railway/Heroku)
```bash
# Configurar variáveis de ambiente
# Fazer deploy da pasta api/
```

### 🗄️ Banco (Railway/PlanetScale)
```bash
# Configurar string de conexão
# Executar migrações
```

## 🤝 Contribuição

1. **Fork** o projeto
2. **Clone** o repositório
3. **Instale** as dependências
4. **Crie** uma branch para feature
5. **Commit** suas mudanças
6. **Push** para a branch
7. **Abra** um Pull Request

## 📞 Suporte

- **Email**: info@takeouttours.pt
- **Issues**: GitHub Issues
- **Documentação**: Este README

---

**Take Out Tours** - Portugal com Alma 🇵🇹
