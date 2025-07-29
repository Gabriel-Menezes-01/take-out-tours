import sequelize from '../config/database.js'
import Tour from './Tour.js'
import Booking from './Booking.js'
import Contact from './Contact.js'

// ================================
// DEFINIR RELACIONAMENTOS
// ================================

// Tour -> Booking (1:N)
Tour.hasMany(Booking, {
  foreignKey: 'tourId',
  as: 'bookings',
  onDelete: 'RESTRICT' // Não permitir deletar tour com reservas
})

Booking.belongsTo(Tour, {
  foreignKey: 'tourId',
  as: 'tour'
})

// ================================
// SINCRONIZAR MODELOS
// ================================

export const syncDatabase = async (force = false) => {
  try {
    console.log('🔄 Sincronizando banco de dados...')
    
    await sequelize.authenticate()
    console.log('✅ Conexão com banco estabelecida')
    
    await sequelize.sync({ force })
    console.log('✅ Modelos sincronizados')
    
    if (force) {
      console.log('⚠️  Banco de dados recriado (todos os dados foram perdidos)')
    }
    
    return true
  } catch (error) {
    console.error('❌ Erro ao sincronizar banco:', error)
    throw error
  }
}

// ================================
// EXPORTAR MODELOS
// ================================

export {
  sequelize,
  Tour,
  Booking,
  Contact
}

export default {
  sequelize,
  Tour,
  Booking,
  Contact,
  syncDatabase
}
