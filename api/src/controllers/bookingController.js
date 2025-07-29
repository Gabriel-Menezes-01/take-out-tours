import { Booking, Tour } from '../models/index.js'
import { sendBookingConfirmation } from '../utils/emailService.js'
import { generateBookingCode } from '../utils/helpers.js'

// ================================
// CRIAR NOVA RESERVA
// ================================

export const createBooking = async (req, res) => {
  try {
    const {
      tourId,
      customerName,
      customerEmail,
      customerPhone,
      customerDocument,
      numberOfPeople,
      travelDate,
      specialRequests,
      emergencyContact
    } = req.body

    // Verificar se o tour existe
    const tour = await Tour.findByPk(tourId)
    if (!tour) {
      return res.status(404).json({
        error: 'Tour não encontrado',
        status: 404
      })
    }

    // Calcular preço total
    const totalPrice = tour.price * numberOfPeople

    // Gerar código de reserva único
    const bookingCode = generateBookingCode()

    // Criar reserva
    const booking = await Booking.create({
      tourId,
      customerName,
      customerEmail,
      customerPhone,
      customerDocument,
      numberOfPeople,
      travelDate,
      totalPrice,
      bookingCode,
      specialRequests,
      emergencyContact,
      status: 'pending'
    })

    // Enviar email de confirmação
    try {
      await sendBookingConfirmation(booking, tour)
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      // Não falhar a reserva por causa do email
    }

    res.status(201).json({
      message: 'Reserva criada com sucesso!',
      booking: {
        id: booking.id,
        bookingCode: booking.bookingCode,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        tourTitle: tour.title,
        numberOfPeople: booking.numberOfPeople,
        travelDate: booking.travelDate,
        totalPrice: booking.totalPrice,
        status: booking.status
      }
    })
  } catch (error) {
    console.error('Erro ao criar reserva:', error)
    res.status(400).json({
      error: 'Erro ao criar reserva',
      message: error.message
    })
  }
}

// ================================
// BUSCAR RESERVA POR ID
// ================================

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params
    const { email, code } = req.query

    let where = { id }

    // Se não estiver autenticado, requer email OU código para buscar
    if (!req.user) {
      if (email) {
        where.customerEmail = email
      } else if (code) {
        where.bookingCode = code
        delete where.id
      } else {
        return res.status(400).json({
          error: 'É necessário fornecer email ou código da reserva',
          status: 400
        })
      }
    }

    const booking = await Booking.findOne({
      where,
      include: [{
        model: Tour,
        as: 'tour'
      }]
    })

    if (!booking) {
      return res.status(404).json({
        error: 'Reserva não encontrada',
        status: 404
      })
    }

    res.json(booking)
  } catch (error) {
    console.error('Erro ao buscar reserva:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// BUSCAR TODAS AS RESERVAS (ADMIN)
// ================================

export const getAllBookings = async (req, res) => {
  try {
    const { 
      status, 
      startDate, 
      endDate, 
      limit = 20, 
      page = 1 
    } = req.query

    const offset = (page - 1) * limit
    const where = {}

    // Filtros
    if (status) {
      where.status = status
    }

    if (startDate || endDate) {
      where.travelDate = {}
      if (startDate) where.travelDate.$gte = new Date(startDate)
      if (endDate) where.travelDate.$lte = new Date(endDate)
    }

    const bookings = await Booking.findAndCountAll({
      where,
      include: [{
        model: Tour,
        as: 'tour'
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    })

    res.json({
      bookings: bookings.rows,
      pagination: {
        total: bookings.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(bookings.count / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar reservas:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// BUSCAR RESERVAS DO USUÁRIO
// ================================

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params

    const bookings = await Booking.findAll({
      where: { userId },
      include: [{
        model: Tour,
        as: 'tour'
      }],
      order: [['createdAt', 'DESC']]
    })

    res.json(bookings)
  } catch (error) {
    console.error('Erro ao buscar reservas do usuário:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// ATUALIZAR STATUS DA RESERVA (ADMIN)
// ================================

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed']
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Status inválido',
        message: `Status deve ser um dos: ${validStatuses.join(', ')}`,
        status: 400
      })
    }

    const booking = await Booking.findByPk(id)

    if (!booking) {
      return res.status(404).json({
        error: 'Reserva não encontrada',
        status: 404
      })
    }

    await booking.update({ 
      status, 
      adminNotes: notes,
      updatedAt: new Date()
    })

    res.json({
      message: 'Status da reserva atualizado com sucesso',
      booking: booking
    })
  } catch (error) {
    console.error('Erro ao atualizar status da reserva:', error)
    res.status(400).json({
      error: 'Erro ao atualizar status da reserva',
      message: error.message
    })
  }
}

// ================================
// CANCELAR/DELETAR RESERVA
// ================================

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params

    const booking = await Booking.findByPk(id)

    if (!booking) {
      return res.status(404).json({
        error: 'Reserva não encontrada',
        status: 404
      })
    }

    // Verificar se o usuário pode deletar esta reserva
    if (req.user.role !== 'admin' && booking.userId !== req.user.id) {
      return res.status(403).json({
        error: 'Acesso negado',
        message: 'Você só pode cancelar suas próprias reservas',
        status: 403
      })
    }

    await booking.destroy()

    res.json({
      message: 'Reserva cancelada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}
