import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookingCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [6, 20]
    }
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tours',
      key: 'id'
    }
  },
  customerName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  customerEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
      len: [5, 255]
    }
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 20],
      is: /^[\d\s\-\+\(\)]+$/
    }
  },
  customerDocument: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 50]
    }
  },
  numberOfPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 20
    }
  },
  travelDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString().split('T')[0]
    }
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'partial', 'paid', 'refunded'),
    allowNull: false,
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'credit_card', 'debit_card', 'bank_transfer', 'pix'),
    allowNull: true
  },
  specialRequests: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000]
    }
  },
  emergencyContact: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isValidContact(value) {
        if (value && (!value.name || !value.phone)) {
          throw new Error('Emergency contact must have name and phone')
        }
      }
    }
  },
  passengers: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancelledAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  confirmedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  source: {
    type: DataTypes.ENUM('website', 'phone', 'email', 'whatsapp', 'social_media'),
    allowNull: false,
    defaultValue: 'website'
  },
  promocode: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  indexes: [
    {
      fields: ['bookingCode']
    },
    {
      fields: ['customerEmail']
    },
    {
      fields: ['status']
    },
    {
      fields: ['travelDate']
    },
    {
      fields: ['tourId']
    },
    {
      fields: ['paymentStatus']
    }
  ],
  hooks: {
    beforeUpdate: (booking) => {
      // Atualizar timestamps quando status muda
      if (booking.changed('status')) {
        const now = new Date()
        switch (booking.status) {
          case 'confirmed':
            booking.confirmedAt = now
            break
          case 'cancelled':
            booking.cancelledAt = now
            break
          case 'completed':
            booking.completedAt = now
            break
        }
      }
    }
  }
})

export default Booking
