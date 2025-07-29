import express from 'express'
import { 
  createBooking, 
  getBookingById, 
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getUserBookings
} from '../controllers/bookingController.js'
import { validateBooking } from '../middleware/validation.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// ================================
// ROTAS PÚBLICAS
// ================================

/**
 * @route   POST /api/bookings
 * @desc    Criar nova reserva
 * @access  Public
 */
router.post('/', validateBooking, createBooking)

/**
 * @route   GET /api/bookings/:id
 * @desc    Buscar reserva por ID
 * @access  Public (com validação de email/código)
 */
router.get('/:id', getBookingById)

// ================================
// ROTAS PROTEGIDAS
// ================================

/**
 * @route   GET /api/bookings
 * @desc    Buscar todas as reservas (Admin)
 * @access  Private (Admin)
 */
router.get('/', authenticateToken, getAllBookings)

/**
 * @route   GET /api/bookings/user/:userId
 * @desc    Buscar reservas do usuário
 * @access  Private
 */
router.get('/user/:userId', authenticateToken, getUserBookings)

/**
 * @route   PUT /api/bookings/:id/status
 * @desc    Atualizar status da reserva
 * @access  Private (Admin)
 */
router.put('/:id/status', authenticateToken, updateBookingStatus)

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Cancelar/deletar reserva
 * @access  Private (Admin ou próprio usuário)
 */
router.delete('/:id', authenticateToken, deleteBooking)

export default router
