import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente
dotenv.config()

// ================================
// CONFIGURAÇÃO DO BANCO DE DADOS
// ================================

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'takeouttours',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  
  // Configurações de pool de conexões
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
  // Configurações de logging
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Configurações de timezone
  timezone: '-03:00', // Brasília timezone
  
  // Configurações do Sequelize
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  
  // Configurações MySQL específicas
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: true,
    dateStrings: true,
    typeCast: true
  },
  
  // Configurações de retry
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ],
    max: 3
  }
})

// ================================
// TESTE DE CONEXÃO
// ================================

export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Conexão com MySQL estabelecida com sucesso')
    return true
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message)
    
    // Log detalhado para desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Detalhes do erro:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        error: error.message
      })
    }
    
    throw error
  }
}

// ================================
// CONFIGURAÇÕES ESPECÍFICAS
// ================================

// Configurar timezone para o MySQL
sequelize.query("SET time_zone = '-03:00'").catch(err => {
  console.warn('⚠️  Aviso: Não foi possível definir timezone:', err.message)
})

// ================================
// HOOKS GLOBAIS
// ================================

// Hook antes de criar/atualizar
sequelize.addHook('beforeCreate', (instance) => {
  if (instance.dataValues) {
    // Remover espaços em branco de strings
    Object.keys(instance.dataValues).forEach(key => {
      if (typeof instance.dataValues[key] === 'string') {
        instance.dataValues[key] = instance.dataValues[key].trim()
      }
    })
  }
})

sequelize.addHook('beforeUpdate', (instance) => {
  if (instance.dataValues) {
    // Remover espaços em branco de strings
    Object.keys(instance.dataValues).forEach(key => {
      if (typeof instance.dataValues[key] === 'string') {
        instance.dataValues[key] = instance.dataValues[key].trim()
      }
    })
  }
})

// ================================
// EVENTOS DE CONEXÃO
// ================================

sequelize.connectionManager.on('connect', () => {
  console.log('🔌 Conectado ao banco de dados')
})

sequelize.connectionManager.on('disconnect', () => {
  console.log('🔌 Desconectado do banco de dados')
})

export default sequelize
