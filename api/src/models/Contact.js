import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
      len: [5, 255]
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      len: [0, 20],
      is: /^[\d\s\-\+\(\)]*$/
    }
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 5000]
    }
  },
  tourInterest: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      len: [0, 255]
    }
  },
  status: {
    type: DataTypes.ENUM('unread', 'read', 'replied', 'archived'),
    allowNull: false,
    defaultValue: 'unread'
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
    allowNull: false,
    defaultValue: 'normal'
  },
  category: {
    type: DataTypes.ENUM('general', 'booking', 'complaint', 'suggestion', 'support'),
    allowNull: false,
    defaultValue: 'general'
  },
  source: {
    type: DataTypes.ENUM('website', 'email', 'phone', 'whatsapp', 'social_media'),
    allowNull: false,
    defaultValue: 'website'
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: true,
    validate: {
      isIP: true
    }
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referrer: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  readBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  repliedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  repliedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reply: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  followUpDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  customerSatisfaction: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'contacts',
  timestamps: true,
  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['category']
    },
    {
      fields: ['createdAt']
    },
    {
      fields: ['readAt']
    }
  ],
  hooks: {
    beforeUpdate: (contact) => {
      // Atualizar timestamps quando status muda
      if (contact.changed('status')) {
        const now = new Date()
        switch (contact.status) {
          case 'read':
            if (!contact.readAt) {
              contact.readAt = now
            }
            break
          case 'replied':
            if (!contact.repliedAt) {
              contact.repliedAt = now
            }
            break
        }
      }
    }
  }
})

export default Contact
