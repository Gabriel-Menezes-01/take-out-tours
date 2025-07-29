import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// ================================
// CONFIGURAÇÃO DO NODEMAILER
// ================================

const transporter = nodemailer.createTransporter({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Verificar configuração
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro na configuração de email:', error.message)
  } else {
    console.log('✅ Servidor de email configurado e pronto')
  }
})

// ================================
// TEMPLATES DE EMAIL
// ================================

const getEmailTemplate = (type, data) => {
  const baseStyle = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background: white; }
      .header { background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 30px; text-align: center; }
      .content { padding: 30px; }
      .footer { background: #1f1f1f; color: white; padding: 20px; text-align: center; font-size: 14px; }
      .btn { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      .highlight { background: #fee2e2; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; }
      .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
    </style>
  `

  switch (type) {
    case 'booking_confirmation':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmação de Reserva - Take Out Tours</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>TAKE OUT TOURS</h1>
              <h2>Reserva Confirmada!</h2>
            </div>
            <div class="content">
              <p>Olá <strong>${data.customerName}</strong>,</p>
              
              <p>A sua reserva foi criada com sucesso! Estamos muito entusiasmados por partilhar esta experiência única convosco.</p>
              
              <div class="highlight">
                <h3>Código da Reserva: <strong>${data.bookingCode}</strong></h3>
                <p>Guarde este código para futuras referências.</p>
              </div>
              
              <div class="details">
                <h3>Detalhes da Reserva</h3>
                <p><strong>Tour:</strong> ${data.tourTitle}</p>
                <p><strong>Data:</strong> ${new Date(data.travelDate).toLocaleDateString('pt-PT')}</p>
                <p><strong>Número de Pessoas:</strong> ${data.numberOfPeople}</p>
                <p><strong>Preço Total:</strong> €${data.totalPrice}</p>
                <p><strong>Status:</strong> Pendente de Confirmação</p>
              </div>
              
              <h3>Próximos Passos</h3>
              <ul>
                <li>Em breve receberá uma confirmação final da nossa equipa</li>
                <li>Informações detalhadas sobre o ponto de encontro serão enviadas 24h antes</li>
                <li>Para alterações, contacte-nos com o código da reserva</li>
              </ul>
              
              <p>Para qualquer questão, responda a este email ou contacte-nos:</p>
              <p>📞 +351 XXX XXX XXX | 📧 info@takeouttours.pt</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Take Out Tours - Portugal com Alma</p>
              <p>Lisboa, Portugal</p>
            </div>
          </div>
        </body>
        </html>
      `

    case 'contact_notification':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nova Mensagem de Contato - Take Out Tours</title>
          ${baseStyle}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>TAKE OUT TOURS</h1>
              <h2>Nova Mensagem de Contato</h2>
            </div>
            <div class="content">
              <div class="details">
                <h3>Detalhes do Contato</h3>
                <p><strong>Nome:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Telefone:</strong> ${data.phone || 'Não fornecido'}</p>
                <p><strong>Assunto:</strong> ${data.subject}</p>
                ${data.tourInterest ? `<p><strong>Tour de Interesse:</strong> ${data.tourInterest}</p>` : ''}
                <p><strong>Data:</strong> ${new Date(data.createdAt).toLocaleString('pt-PT')}</p>
              </div>
              
              <div class="highlight">
                <h3>Mensagem:</h3>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p><a href="mailto:${data.email}" class="btn">Responder por Email</a></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Take Out Tours - Administração</p>
            </div>
          </div>
        </body>
        </html>
      `

    default:
      return '<p>Template não encontrado</p>'
  }
}

// ================================
// FUNÇÕES DE ENVIO DE EMAIL
// ================================

export const sendBookingConfirmation = async (booking, tour) => {
  try {
    const emailData = {
      customerName: booking.customerName,
      bookingCode: booking.bookingCode,
      tourTitle: tour.title,
      travelDate: booking.travelDate,
      numberOfPeople: booking.numberOfPeople,
      totalPrice: booking.totalPrice
    }

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: booking.customerEmail,
      subject: `Confirmação de Reserva - ${tour.title} | Take Out Tours`,
      html: getEmailTemplate('booking_confirmation', emailData)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email de confirmação enviado:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Erro ao enviar email de confirmação:', error)
    throw error
  }
}

export const sendContactNotification = async (contact) => {
  try {
    const adminEmails = [
      process.env.ADMIN_EMAIL || 'admin@takeouttours.pt',
      'info@takeouttours.pt'
    ]

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: adminEmails.join(', '),
      subject: `Nova Mensagem: ${contact.subject} | Take Out Tours`,
      html: getEmailTemplate('contact_notification', contact),
      replyTo: contact.email
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Notificação de contato enviada:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Erro ao enviar notificação de contato:', error)
    throw error
  }
}

export const sendBookingReminder = async (booking, tour) => {
  try {
    const emailData = {
      customerName: booking.customerName,
      bookingCode: booking.bookingCode,
      tourTitle: tour.title,
      travelDate: booking.travelDate,
      numberOfPeople: booking.numberOfPeople
    }

    const daysUntilTravel = Math.ceil((new Date(booking.travelDate) - new Date()) / (1000 * 60 * 60 * 24))
    
    const subject = daysUntilTravel === 1 
      ? `Lembrete: Seu tour é amanhã! - ${tour.title}`
      : `Lembrete: Seu tour em ${daysUntilTravel} dias - ${tour.title}`

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: booking.customerEmail,
      subject: subject,
      html: getEmailTemplate('booking_reminder', emailData)
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Lembrete de reserva enviado:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Erro ao enviar lembrete:', error)
    throw error
  }
}

export const sendCustomEmail = async (to, subject, content, isHTML = true) => {
  try {
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: to,
      subject: subject,
      [isHTML ? 'html' : 'text']: content
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email personalizado enviado:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Erro ao enviar email personalizado:', error)
    throw error
  }
}

export default transporter
