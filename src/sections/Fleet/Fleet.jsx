import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import { fleet } from '../../data/content';
import './Fleet.css';

export default function Fleet() {
  return (
    <section id="fleet" className="fleet">
      <Container>
        <SectionHeader 
          title="Nossa Frota"
          subtitle="Conforto e segurança para a sua experiência em Portugal"
        />
        <div className="fleet-grid">
          {fleet.map((vehicle) => (
            <Card key={vehicle.id} className="fleet-card">
              <div className="fleet-icon">{vehicle.icon}</div>
              <h3 className="fleet-name">{vehicle.name}</h3>
              <p className="fleet-description">{vehicle.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
