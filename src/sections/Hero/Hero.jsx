import Container from '../../components/Container';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();

  const goToExperiencesPage = () => navigate(routes.experiences);
  const goToContact = () => navigate(routes.contact);

  return (
    <section id="hero" className="hero">
      <Container>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Começa em Sintra. <br />
              <span className="hero-title-accent">Vive Portugal inteiro.</span>
            </h1>
            <p className="hero-subtitle">
              Ponto de partida: Sintra & Cascais. Depois, deixamos o país surpreender-te — com histórias, sabores e miradouros únicos.
            </p>
            <div className="hero-buttons">
              <Button onClick={goToExperiencesPage} size="lg">
                Explorar Experiências
              </Button>
              <Button onClick={goToContact} variant="secondary" size="lg">
                Contacto / Reserva
              </Button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&q=80" 
              alt="Sintra e costa de Cascais"
            />
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
