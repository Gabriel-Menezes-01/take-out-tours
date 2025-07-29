import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 5000]
    }
  },
  shortDescription: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  },
  destination: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 365
    },
    comment: 'Duration in days'
  },
  maxPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      min: 1,
      max: 100
    }
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'moderate', 'hard'),
    allowNull: false,
    defaultValue: 'moderate'
  },
  category: {
    type: DataTypes.ENUM('cultural', 'adventure', 'relaxation', 'historical', 'nature', 'gastronomic'),
    allowNull: false,
    defaultValue: 'cultural'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  included: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  excluded: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  itinerary: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isValidLocation(value) {
        if (value && (!value.lat || !value.lng)) {
          throw new Error('Location must have lat and lng properties')
        }
      }
    }
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  availableDates: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  cancellationPolicy: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  minimumAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  },
  language: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'portuguese',
    validate: {
      isIn: [['portuguese', 'english', 'spanish', 'multilingual']]
    }
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
    validate: {
      isLowercase: true,
      is: /^[a-z0-9-]+$/
    }
  },
  metaTitle: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    allowNull: false,
    defaultValue: 'published'
  }
}, {
  tableName: 'tours',
  timestamps: true,
  indexes: [
    {
      fields: ['destination']
    },
    {
      fields: ['price']
    },
    {
      fields: ['featured']
    },
    {
      fields: ['available']
    },
    {
      fields: ['category']
    },
    {
      fields: ['status']
    }
  ],
  hooks: {
    beforeCreate: (tour) => {
      if (!tour.slug && tour.title) {
        tour.slug = tour.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-')
      }
    },
    beforeUpdate: (tour) => {
      if (tour.changed('title') && !tour.changed('slug')) {
        tour.slug = tour.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim('-')
      }
    }
  }
})

export default Tour
