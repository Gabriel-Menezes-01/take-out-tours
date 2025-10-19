import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './DestinationsPage.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DESTS = [
  {
    id: 'sintra',
    name: 'Sintra & Cascais',
    description: 'Palácios de conto de fadas, serras mágicas e a costa atlântica entre Cascais e o Guincho.',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80',
  },
  {
    id: 'lisboa',
    name: 'Lisboa & Setúbal',
    description: 'A capital vibrante, miradouros icónicos e a baía de Setúbal com golfinhos e reservas naturais.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
  },
  {
    id: 'alentejo',
    name: 'Alentejo (Évora, Monsaraz)',
    description: 'Planícies douradas, vinhos de excelência, monumentos megalíticos e vilas brancas no alto.',
    image: 'https://images.unsplash.com/photo-1588429351799-09494af49e72?w=1200&q=80',
  },
  {
    id: 'algarve',
    name: 'Algarve Autêntico',
    description: 'Falésias esculturais, mar azul profundo e aldeias piscatórias fora do circuito.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80',
  },
  {
    id: 'centro',
    name: 'Centro (Fátima, Óbidos, Nazaré)',
    description: 'Santuários, vilas medievais e as maiores ondas do mundo na Praia do Norte.',
    image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?w=1200&q=80',
  },
];

export default function DestinationsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToProposta = (id) => {
    if (id === 'sintra') return navigate('/sintra-cascais');
    if (id === 'lisboa') return navigate('/lisboa-setubal');
    if (id === 'alentejo') return navigate('/alentejo-evora-monsaraz');
    if (id === 'algarve') return navigate('/algarve-autentico');
    if (id === 'centro') return navigate('/centro-fatima-obidos-nazare');
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="page-destinations">
      <Navbar />
      <header className="destinations-hero">
        <Container>
          <h1>Destinos</h1>
          <p>
            Começa em Sintra & Cascais e segue connosco por Lisboa, Alentejo, Algarve e Centro.
            Portugal inteiro, no teu ritmo.
          </p>
          <Button size="md" variant="primary" onClick={() => document.getElementById('lista')?.scrollIntoView({ behavior: 'smooth' })}>Descobrir destinos</Button>
        </Container>
      </header>

      <main>
        <Container>
          <SectionHeader id="lista" title="Regiões" subtitle="Escolhe o cenário e nós tratamos do resto" />
          <div className="destinations-grid-page">
            {DESTS.map(d => (
              <Card key={d.id} id={d.id} className="destination-card-page">
                <div className="destination-media">
                  <img src={d.image} alt={d.name} />
                </div>
                <div className="destination-body">
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>
                  <Button size="sm" variant="secondary" onClick={() => goToProposta(d.id)}>Pedir proposta</Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>

        <section className="page-cta">
          <Container>
            <div className="page-cta-box">
              <h2>Somos locais, apaixonados por partilhar. Anda connosco.</h2>
              <p>Itinerários flexíveis, histórias verdadeiras e conforto em cada quilómetro.</p>
              <Button size="lg" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>Contacto / Reserva</Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
