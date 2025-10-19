import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import { testimonials } from '../../data/content';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <Container>
        <SectionHeader 
          title="Depoimentos"
          subtitle="O que os nossos clientes dizem"
        />
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-comment">"{testimonial.comment}"</p>
              <strong className="testimonial-name">— {testimonial.name}</strong>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
