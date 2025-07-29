import express from 'express'
import { 
  getAllTours, 
  getTourById, 
  createTour, 
  updateTour, 
  deleteTour,
  getToursByDestination,
  getFeaturedTours
} from '../controllers/tourController.js'
import { validateTour } from '../middleware/validation.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// ================================
// ROTAS PÚBLICAS
// ================================

/**
 * @route   GET /api/tours
 * @desc    Buscar todos os tours disponíveis
 * @access  Public
 * @query   ?destination, ?minPrice, ?maxPrice, ?duration, ?limit, ?page
 */
router.get('/', getAllTours)

/**
 * @route   GET /api/tours/featured
 * @desc    Buscar tours em destaque
 * @access  Public
 */
router.get('/featured', getFeaturedTours)

/**
 * @route   GET /api/tours/destination/:destination
 * @desc    Buscar tours por destino
 * @access  Public
 */
router.get('/destination/:destination', getToursByDestination)

/**
 * @route   GET /api/tours/:id
 * @desc    Buscar tour específico por ID
 * @access  Public
 */
router.get('/:id', getTourById)

// ================================
// ROTAS PROTEGIDAS (ADMIN)
// ================================

/**
 * @route   POST /api/tours
 * @desc    Criar novo tour
 * @access  Private (Admin)
 */
router.post('/', authenticateToken, validateTour, createTour)

/**
 * @route   PUT /api/tours/:id
 * @desc    Atualizar tour existente
 * @access  Private (Admin)
 */
router.put('/:id', authenticateToken, validateTour, updateTour)

/**
 * @route   DELETE /api/tours/:id
 * @desc    Deletar tour
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, deleteTour)

export default router
