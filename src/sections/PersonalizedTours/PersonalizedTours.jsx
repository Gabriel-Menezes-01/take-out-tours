import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import './PersonalizedTours.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/router';

export default function PersonalizedTours() {
  const navigate = useNavigate();
  return (
    <section id="personalized-tours" className="personalized-tours">
      <Container>
        <SectionHeader title="Tours Personalizados" subtitle="Desenhamos experiências à tua medida — interesses, ritmo e orçamento." />
        <div className="pt-grid">
          <div className="pt-card">
            <h3>Começa pelo que amas</h3>
            <p>História e palácios, vinhos e gastronomia, natureza e mar — escolhe os teus interesses e criamos o roteiro ideal.</p>
          </div>
          <div className="pt-card">
            <h3>Flexível e exclusivo</h3>
            <p>Pick-up no hotel, horários flexíveis, privativo ou em pequenos grupos. Sem pressa, no teu ritmo.</p>
          </div>
          <div className="pt-card">
            <h3>Locais que só um local conhece</h3>
            <p>Miradouros secretos, tascas autênticas e estradas panorâmicas. Vamos além do óbvio.</p>
          </div>
        </div>
        <div className="pt-cta">
          <Button size="lg" onClick={() => navigate(routes.toursPersonalizados)}>Configurar o meu tour</Button>
          <Button size="lg" variant="secondary" onClick={() => navigate(routes.contact)}>Falar com especialista</Button>
        </div>
      </Container>
    </section>
  );
}
