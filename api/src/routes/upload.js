import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// ================================
// CONFIGURAÇÃO DO MULTER
// ================================

// Criar diretório de uploads se não existir
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configuração de storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.query.type || 'general'
    const dir = `./uploads/${type}`
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  }
})

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use: JPG, PNG, GIF, PDF, DOC, DOCX'))
  }
}

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: fileFilter
})

// ================================
// ROTAS DE UPLOAD
// ================================

/**
 * @route   POST /api/upload/single
 * @desc    Upload de arquivo único
 * @access  Private (Admin)
 * @query   ?type=tours|gallery|documents
 */
router.post('/single', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Nenhum arquivo foi enviado',
        status: 400
      })
    }

    const fileUrl = `/uploads/${req.query.type || 'general'}/${req.file.filename}`
    
    res.json({
      message: 'Arquivo enviado com sucesso',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
        type: req.file.mimetype
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao fazer upload do arquivo',
      message: error.message,
      status: 500
    })
  }
})

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload de múltiplos arquivos
 * @access  Private (Admin)
 * @query   ?type=tours|gallery|documents
 */
router.post('/multiple', authenticateToken, upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: 'Nenhum arquivo foi enviado',
        status: 400
      })
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${req.query.type || 'general'}/${file.filename}`,
      type: file.mimetype
    }))
    
    res.json({
      message: `${files.length} arquivo(s) enviado(s) com sucesso`,
      files: files
    })
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao fazer upload dos arquivos',
      message: error.message,
      status: 500
    })
  }
})

/**
 * @route   DELETE /api/upload/:filename
 * @desc    Deletar arquivo
 * @access  Private (Admin)
 */
router.delete('/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params
    const { type } = req.query
    
    const filePath = path.join('./uploads', type || 'general', filename)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: 'Arquivo não encontrado',
        status: 404
      })
    }
    
    fs.unlinkSync(filePath)
    
    res.json({
      message: 'Arquivo deletado com sucesso',
      filename: filename
    })
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao deletar arquivo',
      message: error.message,
      status: 500
    })
  }
})

// ================================
// MIDDLEWARE DE ERRO DO MULTER
// ================================

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: 'Arquivo muito grande',
        message: 'O arquivo deve ter no máximo 10MB',
        status: 413
      })
    }
    
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(413).json({
        error: 'Muitos arquivos',
        message: 'Máximo de 10 arquivos por vez',
        status: 413
      })
    }
  }
  
  res.status(400).json({
    error: 'Erro no upload',
    message: error.message,
    status: 400
  })
})

export default router
