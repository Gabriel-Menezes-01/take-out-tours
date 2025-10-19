import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Container from '../../components/Container';
import Button from '../../components/Button';
import './AlentejoPage.css';

export default function AlentejoPage() {
  const goToProposal = () => {
    const el = document.getElementById('proposta');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const goToContactPrefilled = () => {
    window.location.href = '/contact?destino=Alentejo%20(E%CC%81vora%2C%20Monsaraz)';
  };

  return (
    <div className="page-alentejo">
      <Navbar />

      <div className="page-hero">
        <Container>
          <h1>Alentejo (Évora, Monsaraz)</h1>
          <p>Paisagens douradas, vilas históricas e vinhos de caráter — explore o melhor do Alentejo.</p>
          <Button size="md" variant="primary" onClick={goToProposal}>Pedir Proposta</Button>
        </Container>
      </div>

      <Container>
        <section className="galeria-section">
          <h2>Imagens de exemplo</h2>
          <div className="galeria-imagens">
            <img src="https://images.unsplash.com/photo-1520875883445-b3d877eb325a?w=800&q=80" alt="Évora - Templo de Diana" />
            <img src="https://images.unsplash.com/photo-1600431521340-491eca880813?w=800&q=80" alt="Monsaraz - Vila medieval" />
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" alt="Planícies alentejanas" />
            <img src="https://images.unsplash.com/photo-1520974811018-8d7034001d5b?w=800&q=80" alt="Vinhas no Alentejo" />
            <img src="https://images.unsplash.com/photo-1541264161754-445bbdc0b016?w=800&q=80" alt="Castelo e muralhas" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="proposta" className="proposta-section">
          <h2>Peça sua proposta personalizada</h2>
          <p>Diga-nos seus interesses (história, vinhos, natureza) e criaremos um roteiro único por Évora e Monsaraz.</p>
          <Button size="lg" variant="secondary" onClick={goToContactPrefilled}>
            Ir para o formulário de contato
          </Button>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
