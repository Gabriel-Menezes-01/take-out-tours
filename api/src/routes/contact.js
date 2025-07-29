import express from 'express'
import { 
  sendContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteMessage
} from '../controllers/contactController.js'
import { validateContactMessage } from '../middleware/validation.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// ================================
// ROTAS PÚBLICAS
// ================================

/**
 * @route   POST /api/contact
 * @desc    Enviar mensagem de contato
 * @access  Public
 */
router.post('/', validateContactMessage, sendContactMessage)

// ================================
// ROTAS PROTEGIDAS (ADMIN)
// ================================

/**
 * @route   GET /api/contact
 * @desc    Buscar todas as mensagens de contato
 * @access  Private (Admin)
 */
router.get('/', authenticateToken, getContactMessages)

/**
 * @route   PUT /api/contact/:id/read
 * @desc    Marcar mensagem como lida
 * @access  Private (Admin)
 */
router.put('/:id/read', authenticateToken, markMessageAsRead)

/**
 * @route   DELETE /api/contact/:id
 * @desc    Deletar mensagem de contato
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, deleteMessage)

export default router
