import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Container from '../../components/Container';
import Button from '../../components/Button';
import './LisboaSetubalPage.css';

export default function LisboaSetubalPage() {
  const goToProposal = () => {
    const el = document.getElementById('proposta');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const goToContactPrefilled = () => {
    window.location.href = '/contact?destino=Lisboa%20%26%20Set%C3%BAbal';
  };

  return (
    <div className="page-lisboa-setubal">
      <Navbar />

      <div className="page-hero">
        <Container>
          <h1>Lisboa & Setúbal</h1>
          <p>Experiências urbanas e costeiras: do charme de Lisboa às paisagens de Setúbal e Arrábida.</p>
          <Button size="md" variant="primary" onClick={goToProposal}>Pedir Proposta</Button>
        </Container>
      </div>

      <Container>
        <section className="galeria-section">
          <h2>Imagens de exemplo</h2>
          <div className="galeria-imagens">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" alt="Lisboa - Miradouro" />
            <img src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=800&q=80" alt="Elétrico de Lisboa" />
            <img src="https://images.unsplash.com/photo-1530039151541-8e5797a4f82d?w=800&q=80" alt="Praias da Arrábida" />
            <img src="https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=800&q=80" alt="Serra da Arrábida" />
            <img src="https://images.unsplash.com/photo-1543422655-7a1d2707a2d5?w=800&q=80" alt="Baía de Setúbal" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="proposta" className="proposta-section">
          <h2>Peça sua proposta personalizada</h2>
          <p>Conte seus interesses (história, gastronomia, natureza) e montamos o roteiro ideal por Lisboa & Setúbal.</p>
          <Button size="lg" variant="secondary" onClick={goToContactPrefilled}>
            Ir para o formulário de contato
          </Button>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
