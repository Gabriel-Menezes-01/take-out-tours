import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './TestimonialsPage.css';
import { testimonials } from '../../data/content';

const AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
  'https://images.unsplash.com/photo-1541534401786-2077eed87a71?w=600&q=80',
];

export default function TestimonialsPage() {
  return (
    <div className="page-testimonials">
      <Navbar />
      <header className="testimonials-hero">
        <Container>
          <h1>Testemunhos</h1>
          <p>Palavras de quem já viveu Portugal connosco. Obrigado pela confiança!</p>
        </Container>
      </header>

      <main>
        <Container>
          <SectionHeader title="O que dizem" subtitle="Experiências reais, memórias que ficam" />
          <div className="testimonials-grid-page">
            {testimonials.concat(testimonials).map((t, idx) => (
              <Card key={idx} className="testimonial-card-page">
                <div className="testimonial-head">
                  <img className="avatar" src={AVATARS[idx % AVATARS.length]} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <div className="stars">{'⭐'.repeat(t.rating)}</div>
                  </div>
                </div>
                <p className="comment">“{t.comment}”</p>
              </Card>
            ))}
          </div>
        </Container>

        <section className="page-cta">
          <Container>
            <div className="page-cta-box">
              <h2>Pronto para a tua história?</h2>
              <p>Conta-nos o que gostavas de descobrir — nós tratamos do resto.</p>
              <Button size="lg" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>Contacto / Reserva</Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
