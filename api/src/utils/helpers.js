import crypto from 'crypto'

// ================================
// GERAÇÃO DE CÓDIGOS E IDS
// ================================

/**
 * Gera um código único para reserva
 * Formato: TOT + 8 caracteres alfanuméricos
 */
export const generateBookingCode = () => {
  const prefix = 'TOT'
  const random = crypto.randomBytes(4).toString('hex').toUpperCase()
  return `${prefix}${random}`
}

/**
 * Gera um ID único para uploads
 */
export const generateUploadId = () => {
  return crypto.randomBytes(16).toString('hex')
}

/**
 * Gera um token único para autenticação
 */
export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex')
}

// ================================
// VALIDAÇÕES
// ================================

/**
 * Valida se um email é válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida se um telefone português é válido
 */
export const isValidPortuguesePhone = (phone) => {
  // Remove espaços e caracteres especiais
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
  
  // Verifica se começa com +351 ou 351 ou se é um número nacional
  const phoneRegex = /^(\+351|351|00351)?[1-9]\d{8}$/
  return phoneRegex.test(cleanPhone)
}

/**
 * Valida se uma data é futura
 */
export const isFutureDate = (date) => {
  const inputDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate > today
}

// ================================
// FORMATAÇÃO
// ================================

/**
 * Formata um preço para exibição
 */
export const formatPrice = (price, currency = '€') => {
  const numPrice = parseFloat(price)
  if (isNaN(numPrice)) return `${currency}0,00`
  
  return `${currency}${numPrice.toFixed(2).replace('.', ',')}`
}

/**
 * Formata uma data para exibição portuguesa
 */
export const formatDate = (date, includeTime = false) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Lisbon'
  }
  
  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }
  
  return new Date(date).toLocaleDateString('pt-PT', options)
}

/**
 * Formata um telefone português
 */
export const formatPortuguesePhone = (phone) => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
  
  // Se já tem código do país, mantém
  if (cleanPhone.startsWith('+351') || cleanPhone.startsWith('351')) {
    return cleanPhone
  }
  
  // Se é um número nacional, adiciona o código
  if (cleanPhone.length === 9) {
    return `+351${cleanPhone}`
  }
  
  return phone // Retorna original se não conseguir formatar
}

// ================================
// MANIPULAÇÃO DE STRINGS
// ================================

/**
 * Cria um slug a partir de um texto
 */
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplos
    .trim('-') // Remove hífens do início/fim
}

/**
 * Capitaliza a primeira letra de cada palavra
 */
export const capitalizeWords = (text) => {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/**
 * Trunca um texto com reticências
 */
export const truncateText = (text, length = 100) => {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

// ================================
// MANIPULAÇÃO DE ARRAYS E OBJETOS
// ================================

/**
 * Remove propriedades vazias de um objeto
 */
export const removeEmptyProperties = (obj) => {
  const cleaned = {}
  
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value
    }
  })
  
  return cleaned
}

/**
 * Agrupa um array por uma propriedade
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

/**
 * Ordena um array de objetos por uma propriedade
 */
export const sortBy = (array, key, order = 'asc') => {
  return array.sort((a, b) => {
    if (order === 'desc') {
      return b[key] > a[key] ? 1 : -1
    }
    return a[key] > b[key] ? 1 : -1
  })
}

// ================================
// UTILITÁRIOS DE DATA
// ================================

/**
 * Calcula a diferença em dias entre duas datas
 */
export const daysDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000
  const firstDate = new Date(date1)
  const secondDate = new Date(date2)
  
  return Math.round((secondDate - firstDate) / oneDay)
}

/**
 * Adiciona dias a uma data
 */
export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Verifica se uma data está entre duas outras datas
 */
export const isDateBetween = (date, startDate, endDate) => {
  const checkDate = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return checkDate >= start && checkDate <= end
}

// ================================
// UTILITÁRIOS DE ARQUIVO
// ================================

/**
 * Obtém a extensão de um arquivo
 */
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

/**
 * Verifica se um arquivo é uma imagem
 */
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const extension = getFileExtension(filename)
  return imageExtensions.includes(extension)
}

/**
 * Converte bytes para formato legível
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// ================================
// UTILITÁRIOS DE PAGINATION
// ================================

/**
 * Calcula dados de paginação
 */
export const calculatePagination = (page, limit, total) => {
  const currentPage = parseInt(page) || 1
  const itemsPerPage = parseInt(limit) || 10
  const totalPages = Math.ceil(total / itemsPerPage)
  const offset = (currentPage - 1) * itemsPerPage
  
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems: total,
    offset,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  }
}

// ================================
// UTILITÁRIOS DE CRIPTOGRAFIA
// ================================

/**
 * Gera um hash MD5
 */
export const generateMD5 = (text) => {
  return crypto.createHash('md5').update(text).digest('hex')
}

/**
 * Gera um hash SHA256
 */
export const generateSHA256 = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex')
}

// ================================
// UTILITÁRIOS DE LOG
// ================================

/**
 * Cria um log estruturado
 */
export const createLog = (level, message, data = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    data,
    pid: process.pid
  }
}

/**
 * Log para desenvolvimento
 */
export const devLog = (message, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] ${message}`, data)
  }
}
