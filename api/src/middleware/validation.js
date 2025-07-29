import { body, param, query, validationResult } from 'express-validator'

// ================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ================================

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      message: 'Verifique os dados enviados e tente novamente',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      })),
      status: 400
    })
  }
  
  next()
}

// ================================
// VALIDAÇÃO DE TOURS
// ================================

export const validateTour = [
  body('title')
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 3, max: 255 })
    .withMessage('Título deve ter entre 3 e 255 caracteres'),
    
  body('description')
    .notEmpty()
    .withMessage('Descrição é obrigatória')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Descrição deve ter entre 10 e 5000 caracteres'),
    
  body('destination')
    .notEmpty()
    .withMessage('Destino é obrigatório')
    .isLength({ min: 2, max: 255 })
    .withMessage('Destino deve ter entre 2 e 255 caracteres'),
    
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um número maior que 0'),
    
  body('duration')
    .isInt({ min: 1, max: 365 })
    .withMessage('Duração deve ser entre 1 e 365 dias'),
    
  body('maxPeople')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Máximo de pessoas deve ser entre 1 e 100'),
    
  body('difficulty')
    .optional()
    .isIn(['easy', 'moderate', 'hard'])
    .withMessage('Dificuldade deve ser: easy, moderate ou hard'),
    
  body('category')
    .optional()
    .isIn(['cultural', 'adventure', 'relaxation', 'historical', 'nature', 'gastronomic'])
    .withMessage('Categoria inválida'),
    
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured deve ser true ou false'),
    
  body('available')
    .optional()
    .isBoolean()
    .withMessage('Available deve ser true ou false'),
    
  body('minimumAge')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Idade mínima deve ser entre 0 e 100'),
    
  body('language')
    .optional()
    .isIn(['portuguese', 'english', 'spanish', 'multilingual'])
    .withMessage('Idioma inválido'),
    
  body('images')
    .optional()
    .isArray()
    .withMessage('Images deve ser um array'),
    
  body('included')
    .optional()
    .isArray()
    .withMessage('Included deve ser um array'),
    
  body('excluded')
    .optional()
    .isArray()
    .withMessage('Excluded deve ser um array'),
    
  handleValidationErrors
]

// ================================
// VALIDAÇÃO DE RESERVAS
// ================================

export const validateBooking = [
  body('tourId')
    .isInt({ min: 1 })
    .withMessage('ID do tour é obrigatório e deve ser um número'),
    
  body('customerName')
    .notEmpty()
    .withMessage('Nome do cliente é obrigatório')
    .isLength({ min: 2, max: 255 })
    .withMessage('Nome deve ter entre 2 e 255 caracteres'),
    
  body('customerEmail')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
    
  body('customerPhone')
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Telefone deve conter apenas números e símbolos válidos')
    .isLength({ min: 10, max: 20 })
    .withMessage('Telefone deve ter entre 10 e 20 caracteres'),
    
  body('customerDocument')
    .notEmpty()
    .withMessage('Documento é obrigatório')
    .isLength({ min: 8, max: 50 })
    .withMessage('Documento deve ter entre 8 e 50 caracteres'),
    
  body('numberOfPeople')
    .isInt({ min: 1, max: 20 })
    .withMessage('Número de pessoas deve ser entre 1 e 20'),
    
  body('travelDate')
    .isISO8601()
    .withMessage('Data de viagem deve ser válida')
    .custom((value) => {
      const travelDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (travelDate <= today) {
        throw new Error('Data de viagem deve ser futura')
      }
      return true
    }),
    
  body('specialRequests')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Solicitações especiais devem ter no máximo 1000 caracteres'),
    
  body('emergencyContact')
    .optional()
    .custom((value) => {
      if (value && (!value.name || !value.phone)) {
        throw new Error('Contato de emergência deve ter nome e telefone')
      }
      return true
    }),
    
  handleValidationErrors
]

// ================================
// VALIDAÇÃO DE CONTATO
// ================================

export const validateContactMessage = [
  body('name')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 255 })
    .withMessage('Nome deve ter entre 2 e 255 caracteres'),
    
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
    
  body('phone')
    .optional()
    .matches(/^[\d\s\-\+\(\)]*$/)
    .withMessage('Telefone deve conter apenas números e símbolos válidos')
    .isLength({ max: 20 })
    .withMessage('Telefone deve ter no máximo 20 caracteres'),
    
  body('subject')
    .notEmpty()
    .withMessage('Assunto é obrigatório')
    .isLength({ min: 3, max: 255 })
    .withMessage('Assunto deve ter entre 3 e 255 caracteres'),
    
  body('message')
    .notEmpty()
    .withMessage('Mensagem é obrigatória')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Mensagem deve ter entre 10 e 5000 caracteres'),
    
  body('tourInterest')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Tour de interesse deve ter no máximo 255 caracteres'),
    
  handleValidationErrors
]

// ================================
// VALIDAÇÃO DE PARÂMETROS
// ================================

export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID deve ser um número inteiro válido'),
    
  handleValidationErrors
]

export const validateBookingCode = [
  param('code')
    .isLength({ min: 6, max: 20 })
    .withMessage('Código de reserva deve ter entre 6 e 20 caracteres')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Código de reserva deve conter apenas letras maiúsculas e números'),
    
  handleValidationErrors
]

// ================================
// VALIDAÇÃO DE QUERY PARAMETERS
// ================================

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número maior que 0'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser entre 1 e 100'),
    
  handleValidationErrors
]

export const validateTourFilters = [
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Preço mínimo deve ser maior que 0'),
    
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Preço máximo deve ser maior que 0'),
    
  query('duration')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Duração deve ser entre 1 e 365 dias'),
    
  query('destination')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Destino deve ter entre 2 e 255 caracteres'),
    
  handleValidationErrors
]
