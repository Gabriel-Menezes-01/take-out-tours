import { syncDatabase } from './src/models/index.js'
import { testConnection } from './src/config/database.js'
import app from './server.js'

// ================================
// INICIALIZAÇÃO DA API
// ================================

const startServer = async () => {
  try {
    console.log('🚀 Iniciando Take Out Tours API...')
    console.log('📅 Data:', new Date().toLocaleString('pt-PT'))
    
    // Testar conexão com banco
    console.log('\n📊 Testando conexão com banco de dados...')
    await testConnection()
    
    // Sincronizar modelos
    console.log('\n🔄 Sincronizando modelos...')
    const forceSync = process.argv.includes('--force-sync')
    await syncDatabase(forceSync)
    
    if (forceSync) {
      console.log('⚠️  Banco de dados recriado (DADOS PERDIDOS)')
    }
    
    console.log('\n✅ API inicializada com sucesso!')
    console.log('\n🔗 Endpoints disponíveis:')
    console.log('   GET  /api/health           - Health check')
    console.log('   GET  /api/tours            - Listar tours')
    console.log('   GET  /api/tours/:id        - Buscar tour')
    console.log('   POST /api/bookings         - Criar reserva')
    console.log('   POST /api/contact          - Enviar contato')
    console.log('   POST /api/upload/single    - Upload arquivo')
    console.log('\n📝 Documentação: http://localhost:8000/api/health')
    
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error)
    process.exit(1)
  }
}

// ================================
// TRATAMENTO DE SINAIS
// ================================

process.on('SIGINT', () => {
  console.log('\n🛑 Recebido SIGINT. Encerrando servidor...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Recebido SIGTERM. Encerrando servidor...')
  process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason)
  console.error('   Em:', promise)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Exceção não capturada:', error)
  process.exit(1)
})

// ================================
// INICIAR SERVIDOR
// ================================

startServer()
