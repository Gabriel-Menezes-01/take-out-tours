#!/bin/bash

# ================================
# TAKE OUT TOURS - SETUP SCRIPT
# ================================

echo "🚀 Take Out Tours - Configuração Automática"
echo "============================================"

# Verificar Node.js
echo "📋 Verificando pré-requisitos..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ é necessário. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado."
    exit 1
fi

echo "✅ npm $(npm -v) encontrado"

# Verificar MySQL
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL não encontrado. Certifique-se de que o MySQL está instalado e rodando."
else
    echo "✅ MySQL encontrado"
fi

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
echo "------------------------------"

echo "📦 Instalando dependências raiz..."
npm install

echo "📦 Instalando dependências do frontend..."
cd frontend && npm install

echo "📦 Instalando dependências da API..."
cd ../api && npm install

cd ..

# Configurar ambiente
echo ""
echo "⚙️  Configurando ambiente..."
echo "----------------------------"

if [ ! -f "api/.env" ]; then
    echo "📄 Criando arquivo .env da API..."
    cp api/.env.example api/.env
    echo "✅ Arquivo .env criado. Edite api/.env com suas configurações."
else
    echo "✅ Arquivo .env já existe"
fi

# Criar diretórios necessários
echo ""
echo "📁 Criando diretórios..."
echo "------------------------"

mkdir -p api/uploads/tours
mkdir -p api/uploads/gallery
mkdir -p api/uploads/documents
mkdir -p api/logs

echo "✅ Diretórios criados"

# Informações importantes
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "==================="
echo ""
echo "1. 🗄️  Configure o banco de dados:"
echo "   - Crie o banco: CREATE DATABASE takeouttours;"
echo "   - Edite api/.env com suas credenciais do MySQL"
echo ""
echo "2. 📧 Configure o email (opcional):"
echo "   - Edite MAIL_* no arquivo api/.env"
echo ""
echo "3. 🔑 Configure as chaves:"
echo "   - Edite JWT_SECRET no arquivo api/.env"
echo ""
echo "4. 🚀 Iniciar o projeto:"
echo "   npm run dev"
echo ""
echo "📍 URLs de desenvolvimento:"
echo "   - Frontend: http://localhost:3000"
echo "   - API: http://localhost:8000"
echo "   - Health Check: http://localhost:8000/api/health"
echo ""
echo "✅ Configuração inicial completa!"
echo ""
