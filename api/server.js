import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Import routes
import tourRoutes from './src/routes/tours.js'
import bookingRoutes from './src/routes/bookings.js'
import contactRoutes from './src/routes/contact.js'
import uploadRoutes from './src/routes/upload.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// ================================
// MIDDLEWARE DE SEGURANÇA
// ================================

// Helmet para headers de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"]
    }
  }
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false
})

app.use('/api/', limiter)

// ================================
// MIDDLEWARE GERAL
// ================================

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4173',
    'https://gabriel-menezes-01.github.io'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Compressão
app.use(compression())

// Logging
app.use(morgan('combined'))

// Parse JSON
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ================================
// ROTAS ESTÁTICAS
// ================================

// Servir uploads
app.use('/uploads', express.static('uploads'))

// ================================
// ROTAS DA API
// ================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Take Out Tours API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Rotas principais
app.use('/api/tours', tourRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)

// ================================
// MIDDLEWARE DE ERRO
// ================================

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    message: `A rota ${req.originalUrl} não existe nesta API`,
    status: 404
  })
})

// Error Handler Global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  
  const status = err.status || 500
  const message = err.message || 'Erro interno do servidor'
  
  res.status(status).json({
    error: message,
    status: status,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// ================================
// INICIALIZAR SERVIDOR
// ================================

app.listen(PORT, () => {
  console.log(`🚀 Take Out Tours API rodando na porta ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🌐 CORS habilitado para desenvolvimento`)
  console.log(`🔒 Rate limiting: 100 requests por 15min`)
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🛠️  Modo desenvolvimento ativo`)
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Encerrando servidor graciosamente...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 Encerrando servidor (Ctrl+C)...')
  process.exit(0)
})

export default app
