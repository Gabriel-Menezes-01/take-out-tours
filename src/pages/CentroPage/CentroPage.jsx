import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Container from '../../components/Container';
import Button from '../../components/Button';
import './CentroPage.css';

export default function CentroPage() {
  const goToProposal = () => {
    const el = document.getElementById('proposta');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const goToContactPrefilled = () => {
    window.location.href = '/contact?destino=Centro%20(F%C3%A1tima%2C%20%C3%93bidos%2C%20Nazar%C3%A9)';
  };

  return (
    <div className="page-centro">
      <Navbar />

      <div className="page-hero">
        <Container>
          <h1>Centro (Fátima, Óbidos, Nazaré)</h1>
          <p>Património, fé e mar — um roteiro marcante pelas joias do Centro de Portugal.</p>
          <Button size="md" variant="primary" onClick={goToProposal}>Pedir Proposta</Button>
        </Container>
      </div>

      <Container>
        <section className="galeria-section">
          <h2>Imagens de exemplo</h2>
          <div className="galeria-imagens">
            <img src="https://images.unsplash.com/photo-1520357456837-6b2d2bd83cd5?w=800&q=80" alt="Santuário de Fátima" />
            <img src="https://images.unsplash.com/photo-1600336153119-baf6f3cfae1b?w=800&q=80" alt="Vila de Óbidos" />
            <img src="https://images.unsplash.com/photo-1544986581-efac024faf62?w=800&q=80" alt="Ondas da Nazaré" />
            <img src="https://images.unsplash.com/photo-1535469420021-4b7a3bf5c7f6?w=800&q=80" alt="Muralhas e ruas históricas" />
            <img src="https://images.unsplash.com/photo-1520080770638-1f53fd2d7499?w=800&q=80" alt="Costa e farol" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="proposta" className="proposta-section">
          <h2>Peça sua proposta personalizada</h2>
          <p>Indique suas preferências (história, cultura, mar) e criaremos o roteiro ideal por Fátima, Óbidos e Nazaré.</p>
          <Button size="lg" variant="secondary" onClick={goToContactPrefilled}>
            Ir para o formulário de contato
          </Button>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
