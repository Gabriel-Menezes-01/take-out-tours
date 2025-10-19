import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './ExperiencesPage.css';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ITEMS = [
  {
    id: 'natureza',
    title: 'Natureza & Aventura',
    description: 'Trilhos pela serra, miradouros secretos e praias selvagens. Experiências ao ar livre conduzidas por guias locais.',
    image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80'
  },
  {
    id: 'patrimonio',
    title: 'Património & História',
    description: 'Castelos, palácios e histórias que moldaram Portugal. Um mergulho no nosso passado com contexto e emoção.',
    image: 'https://images.unsplash.com/photo-1565106430482-8f7d8fa8c7f6?w=1200&q=80'
  },
  {
    id: 'sabores',
    title: 'Sabores & Vinhos',
    description: 'Provas em adegas familiares e iguarias regionais. Gastronomia portuguesa guiada por quem a vive.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80'
  },
  {
    id: 'sintra',
    title: 'Sintra & Cascais',
    description: 'Descubra a magia de Sintra e a beleza costeira de Cascais com roteiros exclusivos.',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1000&q=80'
  },
  {
    id: 'personalizados',
    title: 'Tours Personalizados',
    description: 'Roteiros feitos à sua medida. Diga-nos o que gosta e tratamos do resto.',
    image: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=1200&q=80'
  },
];

const FEATURED = [
  { id: 'fw', title: 'Food & Wine', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1000&q=80' },
  { id: 'ac', title: 'Aventura na Costa', image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1000&q=80' },
  { id: 'tp', title: 'Tours Personalizados', image: 'https://images.unsplash.com/photo-1521337586320-05bdb8d6b88f?w=1000&q=80' },
];

const SIMPLE_DESTS = [
  { id: 'sintra', name: 'Sintra & Cascais', image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1000&q=80' },
  { id: 'alentejo', name: 'Alentejo', image: 'https://images.unsplash.com/photo-1588429351799-09494af49e72?w=1000&q=80' },
  { id: 'algarve', name: 'Algarve', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1000&q=80' },
  { id: 'centro', name: 'Nazaré & Centro', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?w=1000&q=80' },
  { id: 'lisboa', name: 'Lisboa & Setúbal', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1000&q=80' },
];

export default function ExperiencesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="page-experiences">
      <Navbar />
      <div className="page-hero" id="top">
        <Container>
          <h1>Experiências</h1>
          <p>Começa em Sintra. Vive Portugal inteiro.</p>
          <Button size="md" variant="primary" onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}>Explorar Experiências</Button>
        </Container>
      </div>

      <Container>
        <SectionHeader id="categorias" title="Categorias" subtitle="Experiências pensadas para diferentes interesses" />
        <div className="page-grid">
          {ITEMS.map((item) => (
            <Card key={item.id} className="page-card" id={item.id}>
              <div className="page-card-media">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="page-card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Button size="md" onClick={() => {
                  if (item.id === 'natureza') navigate('/natureza-aventura');
                  if (item.id === 'patrimonio') navigate('/patrimonio-historia');
                  if (item.id === 'sabores') navigate('/sabores-vinhos');
                  if (item.id === 'sintra') navigate('/sintra-cascais');
                  if (item.id === 'personalizados') navigate('/tours-personalizados');
                }}>Saber mais</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Bloco 1: Experiências em Destaque */}
      <section style={{ padding: '3rem 0' }}>
        <Container>
          <SectionHeader title="Experiências em Destaque" subtitle="Três ideias para começar" />
          <div className="page-grid">
            {FEATURED.map(f => (
              <Card key={f.id} className="page-card">
                <div className="page-card-media">
                  <img src={f.image} alt={f.title} />
                </div>
                <div className="page-card-body">
                  <h3>{f.title}</h3>
                  <Button size="sm" variant="secondary">Descobrir</Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Bloco 2: Descobre Portugal - scroll horizontal simples */}
      <section style={{ padding: '3rem 0' }}>
        <Container>
          <SectionHeader title="Descobre Portugal" subtitle="Do Atlântico ao interior, escolhe o teu cenário" />
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {SIMPLE_DESTS.map(d => (
              <div key={d.id} style={{ minWidth: 240 }} className="destination-chip">
                <div className="page-card-media" style={{ height: 140 }}>
                  <img src={d.image} alt={d.name} />
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <strong>{d.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bloco 3: Chamada emocional */}
      <section className="page-cta">
        <Container>
          <div className="page-cta-box">
            <h2>Somos locais, apaixonados por partilhar. Anda connosco.</h2>
            <p>Guias que conhecem as histórias, sabores e miradouros certos. Sem pressas, com alma.</p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              Contacto / Reserva
            </Button>
          </div>
        </Container>
      </section>

      {/* Experiências diferenciadoras - texto simples em lista */}
      <section style={{ padding: '2rem 0' }}>
        <Container>
          <SectionHeader title="Experiências Diferenciadoras" subtitle="O nosso twist fora do comum" />
          <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.9 }}>
            <li>Picnic Secreto com Vistas – piqueniques com produtos locais (vinho, queijos, doces, pão)</li>
            <li>Food & Wine Tours com Chef Local – experiências com chef a cozinhar no local</li>
            <li>Tour Sabores do Mercado – visita a mercados tradicionais com provas e conversa</li>
            <li>Road Trip Fotográfica – paragens icónicas para fotos cinematográficas</li>
            <li>Tour Noturno Lendas e Luzes – centros históricos ao luar</li>
            <li>Experiências sazonais – vindimas, pesca, azeite novo, festas tradicionais</li>
          </ul>
        </Container>
      </section>

      <section className="page-cta">
        <Container>
            <div className="page-cta-box">
            <h2>Quer uma experiência personalizada?</h2>
            <p>Conte-nos o que gosta e criamos um roteiro só para si.</p>
              <Button size="lg" onClick={() => navigate('/contact')}>
              Pedir Proposta
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
