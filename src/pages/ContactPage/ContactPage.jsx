import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './ContactPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ContactPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', data: '', pessoas: '2', mensagem: '' });
  const [sent, setSent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const assunto = params.get('assunto');
    const resumo = params.get('resumo');
    if (assunto || resumo) {
      setForm((prev) => ({
        ...prev,
        mensagem: `${assunto ? assunto + ' — ' : ''}${resumo ? resumo : ''}`.trim(),
      }));
    }
  }, [location.search]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder: aqui poderemos integrar EmailJS/Formspark/Netlify Forms
    setSent(true);
  };

  return (
    <div className="page-contact">
      <Navbar />
      <header className="contact-hero">
        <Container>
          <h1>Contacto / Reserva</h1>
          <p>Fale connosco — respondemos rápido e criamos um dia feito à sua medida.</p>
        </Container>
      </header>

      <main>
        {/* Info de contacto */}
        <section className="contact-info">
          <Container>
            <div className="info-grid">
              <div className="info-card">
                <h3>Telefone</h3>
                <p className="muted">+351 9XX XXX XXX</p>
                <Button size="sm" variant="secondary">Ligar agora</Button>
              </div>
              <div className="info-card">
                <h3>Email</h3>
                <p className="muted">contacto@takeouttours.pt</p>
                <Button size="sm" variant="secondary">Enviar email</Button>
              </div>
              <div className="info-card">
                <h3>WhatsApp</h3>
                <p className="muted">+351 9XX XXX XXX</p>
                <Button size="sm" variant="secondary">Abrir WhatsApp</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Imagem/mapa ilustrativo */}
        <section>
          <Container>
            <div className="map-illustration">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80" alt="Mapa/Ilustração" />
            </div>
          </Container>
        </section>

        {/* Formulário de reserva/contato */}
        <section className="contact-form">
          <Container>
            <SectionHeader title="Diz-nos o que procuras" subtitle="Criamos um roteiro pensado para ti" />
            {sent ? (
              <div className="sent-box">Obrigado! Em breve entraremos em contacto.</div>
            ) : (
              <form className="form-grid" onSubmit={onSubmit}>
                <div>
                  <label>Nome</label>
                  <input name="nome" value={form.nome} onChange={onChange} required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required />
                </div>
                <div>
                  <label>Telefone</label>
                  <input name="telefone" value={form.telefone} onChange={onChange} />
                </div>
                <div>
                  <label>Data</label>
                  <input type="date" name="data" value={form.data} onChange={onChange} />
                </div>
                <div>
                  <label>Pessoas</label>
                  <select name="pessoas" value={form.pessoas} onChange={onChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
                <div className="full">
                  <label>Mensagem</label>
                  <textarea name="mensagem" rows={5} value={form.mensagem} onChange={onChange} placeholder="Ex.: queremos Sintra & Cascais com prova de vinhos" />
                </div>
                <div className="full actions">
                  <Button type="submit" size="lg">Pedir Proposta</Button>
                </div>
              </form>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
