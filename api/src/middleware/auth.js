import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// ================================
// MIDDLEWARE DE AUTENTICAÇÃO JWT
// ================================

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Token de acesso necessário',
        message: 'Você precisa estar logado para acessar este recurso',
        status: 401
      })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Erro ao verificar token:', err.message)
        
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Token expirado',
            message: 'Seu token de acesso expirou. Faça login novamente.',
            status: 401
          })
        }
        
        if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({
            error: 'Token inválido',
            message: 'O token fornecido é inválido',
            status: 403
          })
        }
        
        return res.status(403).json({
          error: 'Falha na autenticação',
          message: 'Não foi possível verificar o token',
          status: 403
        })
      }

      req.user = user
      next()
    })
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar autenticação',
      status: 500
    })
  }
}

// ================================
// MIDDLEWARE DE AUTORIZAÇÃO (ADMIN)
// ================================

export const requireAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        message: 'Você precisa estar logado para acessar este recurso',
        status: 401
      })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Acesso negado',
        message: 'Você precisa ter privilégios de administrador',
        status: 403
      })
    }

    next()
  } catch (error) {
    console.error('Erro no middleware de autorização:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao verificar permissões',
      status: 500
    })
  }
}

// ================================
// MIDDLEWARE OPCIONAL DE AUTH
// ================================

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      req.user = null
      return next()
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // Em caso de erro, continue sem usuário
        req.user = null
      } else {
        req.user = user
      }
      next()
    })
  } catch (error) {
    console.error('Erro no middleware de auth opcional:', error)
    req.user = null
    next()
  }
}

// ================================
// GERAÇÃO DE TOKENS
// ================================

export const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role || 'user'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'takeouttours-api',
    audience: 'takeouttours-client'
  })
}

export const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    type: 'refresh'
  }

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
    issuer: 'takeouttours-api',
    audience: 'takeouttours-client'
  })
}

// ================================
// VERIFICAÇÃO DE REFRESH TOKEN
// ================================

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    throw new Error('Refresh token inválido ou expirado')
  }
}
