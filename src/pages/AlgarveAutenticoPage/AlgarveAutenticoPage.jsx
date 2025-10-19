import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Container from '../../components/Container';
import Button from '../../components/Button';
import './AlgarveAutenticoPage.css';

export default function AlgarveAutenticoPage() {
  const goToProposal = () => {
    const el = document.getElementById('proposta');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const goToContactPrefilled = () => {
    window.location.href = '/contact?destino=Algarve%20Aut%C3%AAntico';
  };

  return (
    <div className="page-algarve">
      <Navbar />

      <div className="page-hero">
        <Container>
          <h1>Algarve Autêntico</h1>
          <p>Praias selvagens, vilas de pescadores e trilhas costeiras — descubra o Algarve para além do óbvio.</p>
          <Button size="md" variant="primary" onClick={goToProposal}>Pedir Proposta</Button>
        </Container>
      </div>

      <Container>
        <section className="galeria-section">
          <h2>Imagens de exemplo</h2>
          <div className="galeria-imagens">
            <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80" alt="Falésias do Algarve" />
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80" alt="Grutas e formações rochosas" />
            <img src="https://images.unsplash.com/photo-1503798397-08b7b20dfead?w=800&q=80" alt="Praias de água cristalina" />
            <img src="https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80" alt="Vila de pescadores" />
            <img src="https://images.unsplash.com/photo-1544986581-efac024faf62?w=800&q=80" alt="Costa atlântica" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="proposta" className="proposta-section">
          <h2>Peça sua proposta personalizada</h2>
          <p>Conte seus interesses (praias, trilhas, gastronomia) e montamos um roteiro autêntico pelo Algarve.</p>
          <Button size="lg" variant="secondary" onClick={goToContactPrefilled}>
            Ir para o formulário de contato
          </Button>
        </section>
      </Container>

      <Footer />
    </div>
  );
}
