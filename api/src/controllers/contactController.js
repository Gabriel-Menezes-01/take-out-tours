import { Contact } from '../models/index.js'
import { sendContactNotification } from '../utils/emailService.js'

// ================================
// ENVIAR MENSAGEM DE CONTATO
// ================================

export const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      tourInterest
    } = req.body

    // Criar mensagem de contato
    const contactMessage = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      tourInterest,
      status: 'unread',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    // Enviar notificação por email para administradores
    try {
      await sendContactNotification(contactMessage)
    } catch (emailError) {
      console.error('Erro ao enviar notificação:', emailError)
      // Não falhar o contato por causa do email
    }

    res.status(201).json({
      message: 'Mensagem enviada com sucesso!',
      contact: {
        id: contactMessage.id,
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt
      }
    })
  } catch (error) {
    console.error('Erro ao enviar mensagem de contato:', error)
    res.status(400).json({
      error: 'Erro ao enviar mensagem',
      message: error.message
    })
  }
}

// ================================
// BUSCAR TODAS AS MENSAGENS (ADMIN)
// ================================

export const getContactMessages = async (req, res) => {
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
      where.createdAt = {}
      if (startDate) where.createdAt.$gte = new Date(startDate)
      if (endDate) where.createdAt.$lte = new Date(endDate)
    }

    const messages = await Contact.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    })

    // Contar mensagens não lidas
    const unreadCount = await Contact.count({
      where: { status: 'unread' }
    })

    res.json({
      messages: messages.rows,
      unreadCount,
      pagination: {
        total: messages.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(messages.count / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar mensagens de contato:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// MARCAR MENSAGEM COMO LIDA (ADMIN)
// ================================

export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params

    const message = await Contact.findByPk(id)

    if (!message) {
      return res.status(404).json({
        error: 'Mensagem não encontrada',
        status: 404
      })
    }

    await message.update({ 
      status: 'read',
      readAt: new Date(),
      readBy: req.user.id
    })

    res.json({
      message: 'Mensagem marcada como lida',
      contact: message
    })
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', error)
    res.status(400).json({
      error: 'Erro ao atualizar mensagem',
      message: error.message
    })
  }
}

// ================================
// DELETAR MENSAGEM (ADMIN)
// ================================

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params

    const message = await Contact.findByPk(id)

    if (!message) {
      return res.status(404).json({
        error: 'Mensagem não encontrada',
        status: 404
      })
    }

    await message.destroy()

    res.json({
      message: 'Mensagem deletada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}
