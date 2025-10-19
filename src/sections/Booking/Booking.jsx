import { useState } from 'react';
import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import './Booking.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    tour: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reserva:', formData);
    alert('Obrigado! Entraremos em contacto em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      tour: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="booking" className="booking">
      <Container>
        <SectionHeader 
          title="Reserve o seu Tour"
          subtitle="Responderemos rapidamente para confirmar a sua experiência"
        />
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Telefone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <select
              name="tour"
              value={formData.tour}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tour</option>
              <option value="sintra">Sintra & Cascais</option>
              <option value="lisboa">Lisboa & Setúbal</option>
              <option value="alentejo">Alentejo</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              name="message"
              rows="4"
              placeholder="Mensagem (opcional)"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <Button type="submit" size="lg">Enviar Pedido</Button>
        </form>
      </Container>
    </section>
  );
}
