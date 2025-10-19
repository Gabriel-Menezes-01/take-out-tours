import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Container from '../../components/Container';
import Button from '../../components/Button';
import './SintraCascaisPage.css';

export default function SintraCascaisPage() {
  return (
    <div className="page-sintra-cascais">
      <Navbar />
      <div className="page-hero">
        <Container>
          <h1>Sintra & Cascais</h1>
          <p>Descubra a magia de Sintra e a beleza costeira de Cascais com roteiros exclusivos.</p>
          <Button size="md" variant="primary" onClick={() => window.scrollTo({top: document.getElementById('proposta').offsetTop - 80, behavior: 'smooth'})}>Pedir Proposta</Button>
        </Container>
      </div>

      <Container>
        <section className="galeria-section">
          <h2>Imagens de exemplo</h2>
          <div className="galeria-imagens">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" alt="Palácio da Pena, Sintra" />
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80" alt="Cabo da Roca, Sintra" />
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" alt="Praia do Guincho, Cascais" />
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" alt="Centro histórico de Sintra" />
            <img src="https://images.unsplash.com/photo-1465156799763-2c087c332922?w=800&q=80" alt="Boca do Inferno, Cascais" />
          </div>
        </section>
      </Container>

      <Container>
        <section id="proposta" className="proposta-section">
          <h2>Peça sua proposta personalizada</h2>
          <p>Conte-nos o que gostaria de visitar e prepare-se para uma experiência única em Sintra & Cascais.</p>
          <Button size="lg" variant="secondary" onClick={() => window.location.href='/contact?destino=Sintra%20%26%20Cascais'}>
            Ir para o formulário de contato
          </Button>
        </section>
      </Container>
      <Footer />
    </div>
  );
}
