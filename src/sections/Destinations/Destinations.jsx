import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import { destinations } from '../../data/content';
import './Destinations.css';

export default function Destinations() {
  return (
    <section id="destinations" className="destinations">
      <Container>
        <SectionHeader 
          title="Destinos Únicos"
          subtitle="Dos segredos de Sintra às tradições do Alentejo"
        />
        <div className="destinations-grid">
          {destinations.map((dest) => (
            <div key={dest.id} className="destination-card">
              <img src={dest.image} alt={dest.name} />
              <div className="destination-overlay">
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <Button variant="primary" size="sm">Explorar</Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
