@echo off
chcp 65001 >nul

REM ================================
REM TAKE OUT TOURS - SETUP SCRIPT
REM ================================

echo 🚀 Take Out Tours - Configuração Automática
echo ============================================

REM Verificar Node.js
echo 📋 Verificando pré-requisitos...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não encontrado. Instale Node.js 18+ primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm não encontrado.
    pause
    exit /b 1
)

echo ✅ npm encontrado
npm --version

REM Verificar MySQL
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MySQL não encontrado. Certifique-se de que o MySQL está instalado e rodando.
) else (
    echo ✅ MySQL encontrado
)

REM Instalar dependências
echo.
echo 📦 Instalando dependências...
echo ------------------------------

echo 📦 Instalando dependências raiz...
npm install

echo 📦 Instalando dependências do frontend...
cd frontend
npm install

echo 📦 Instalando dependências da API...
cd ..\api
npm install

cd ..

REM Configurar ambiente
echo.
echo ⚙️  Configurando ambiente...
echo ----------------------------

if not exist "api\.env" (
    echo 📄 Criando arquivo .env da API...
    copy "api\.env.example" "api\.env"
    echo ✅ Arquivo .env criado. Edite api\.env com suas configurações.
) else (
    echo ✅ Arquivo .env já existe
)

REM Criar diretórios necessários
echo.
echo 📁 Criando diretórios...
echo ------------------------

if not exist "api\uploads\tours" mkdir "api\uploads\tours"
if not exist "api\uploads\gallery" mkdir "api\uploads\gallery"
if not exist "api\uploads\documents" mkdir "api\uploads\documents"
if not exist "api\logs" mkdir "api\logs"

echo ✅ Diretórios criados

REM Informações importantes
echo.
echo 📋 PRÓXIMOS PASSOS:
echo ===================
echo.
echo 1. 🗄️  Configure o banco de dados:
echo    - Crie o banco: CREATE DATABASE takeouttours;
echo    - Edite api\.env com suas credenciais do MySQL
echo.
echo 2. 📧 Configure o email (opcional):
echo    - Edite MAIL_* no arquivo api\.env
echo.
echo 3. 🔑 Configure as chaves:
echo    - Edite JWT_SECRET no arquivo api\.env
echo.
echo 4. 🚀 Iniciar o projeto:
echo    npm run dev
echo.
echo 📍 URLs de desenvolvimento:
echo    - Frontend: http://localhost:3000
echo    - API: http://localhost:8000
echo    - Health Check: http://localhost:8000/api/health
echo.
echo ✅ Configuração inicial completa!
echo.

pause
