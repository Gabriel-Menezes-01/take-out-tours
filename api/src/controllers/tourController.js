import { Tour } from '../models/index.js'

// ================================
// BUSCAR TODOS OS TOURS
// ================================

export const getAllTours = async (req, res) => {
  try {
    const { 
      destination, 
      minPrice, 
      maxPrice, 
      duration, 
      limit = 20, 
      page = 1 
    } = req.query

    const offset = (page - 1) * limit
    const where = {}

    // Filtros
    if (destination) {
      where.destination = { $like: `%${destination}%` }
    }
    
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.$gte = parseFloat(minPrice)
      if (maxPrice) where.price.$lte = parseFloat(maxPrice)
    }
    
    if (duration) {
      where.duration = duration
    }

    const tours = await Tour.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    })

    res.json({
      tours: tours.rows,
      pagination: {
        total: tours.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(tours.count / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar tours:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// BUSCAR TOUR POR ID
// ================================

export const getTourById = async (req, res) => {
  try {
    const { id } = req.params
    
    const tour = await Tour.findByPk(id)
    
    if (!tour) {
      return res.status(404).json({
        error: 'Tour não encontrado',
        status: 404
      })
    }
    
    res.json(tour)
  } catch (error) {
    console.error('Erro ao buscar tour:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// BUSCAR TOURS EM DESTAQUE
// ================================

export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({
      where: { featured: true },
      limit: 6,
      order: [['createdAt', 'DESC']]
    })
    
    res.json(tours)
  } catch (error) {
    console.error('Erro ao buscar tours em destaque:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// BUSCAR TOURS POR DESTINO
// ================================

export const getToursByDestination = async (req, res) => {
  try {
    const { destination } = req.params
    const { limit = 10 } = req.query
    
    const tours = await Tour.findAll({
      where: {
        destination: { $like: `%${destination}%` }
      },
      limit: parseInt(limit),
      order: [['price', 'ASC']]
    })
    
    res.json(tours)
  } catch (error) {
    console.error('Erro ao buscar tours por destino:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}

// ================================
// CRIAR NOVO TOUR (ADMIN)
// ================================

export const createTour = async (req, res) => {
  try {
    const tourData = req.body
    
    const tour = await Tour.create(tourData)
    
    res.status(201).json({
      message: 'Tour criado com sucesso',
      tour: tour
    })
  } catch (error) {
    console.error('Erro ao criar tour:', error)
    res.status(400).json({
      error: 'Erro ao criar tour',
      message: error.message
    })
  }
}

// ================================
// ATUALIZAR TOUR (ADMIN)
// ================================

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    
    const tour = await Tour.findByPk(id)
    
    if (!tour) {
      return res.status(404).json({
        error: 'Tour não encontrado',
        status: 404
      })
    }
    
    await tour.update(updateData)
    
    res.json({
      message: 'Tour atualizado com sucesso',
      tour: tour
    })
  } catch (error) {
    console.error('Erro ao atualizar tour:', error)
    res.status(400).json({
      error: 'Erro ao atualizar tour',
      message: error.message
    })
  }
}

// ================================
// DELETAR TOUR (ADMIN)
// ================================

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params
    
    const tour = await Tour.findByPk(id)
    
    if (!tour) {
      return res.status(404).json({
        error: 'Tour não encontrado',
        status: 404
      })
    }
    
    await tour.destroy()
    
    res.json({
      message: 'Tour deletado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar tour:', error)
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    })
  }
}
