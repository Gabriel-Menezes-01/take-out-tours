import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './BlogPage.css';
import { useMemo, useState } from 'react';

export default function BlogPage() {
  const featured = {
    id: 'feat-1',
    title: 'Sintra em 1 dia: o roteiro perfeito',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&q=80',
    excerpt: 'Palácios, miradouros e sabores locais — um guia prático para aproveitar Sintra como um local.',
    category: 'Roteiros',
    date: '18 Out 2025',
  };

  const articles = useMemo(() => ([
    { id: 'a1', title: 'Onde provar os melhores vinhos perto de Lisboa', category: 'Sabores', date: '12 Out 2025', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80', excerpt: 'Quintas familiares, provas comentadas e paisagens de postal.' },
    { id: 'a2', title: 'Estrada costeira de Cascais ao Guincho: 5 paragens', category: 'Aventura', date: '05 Out 2025', image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80', excerpt: 'Miradouros, praias selvagens e spots para fotos cinematográficas.' },
    { id: 'a3', title: 'Óbidos ao luar: lendas e chocolate quente', category: 'História', date: '28 Set 2025', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?w=1200&q=80', excerpt: 'Um passeio noturno entre muralhas com paragens doces.' },
    { id: 'a4', title: 'Setúbal e Arrábida: praias e golfinhos', category: 'Roteiros', date: '22 Set 2025', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80', excerpt: 'Como combinar natureza e sabores num só dia.' },
  ]), []);

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(articles.map(a => a.category)))], [articles]);
  const [activeCat, setActiveCat] = useState('Todos');
  const filtered = useMemo(() => (
    activeCat === 'Todos' ? articles : articles.filter(a => a.category === activeCat)
  ), [activeCat, articles]);

  return (
    <div className="page-blog">
      <Navbar />
      <header className="blog-hero">
        <Container>
          <h1>Diário de Viagem</h1>
          <p>Partilhas, curiosidades e dicas para explorar Portugal com alma.</p>
        </Container>
      </header>

      <main>
        {/* Destaque */}
        <section className="blog-featured">
          <Container>
            <div className="featured-card">
              <div className="featured-media"><img src={featured.image} alt={featured.title} /></div>
              <div className="featured-body">
                <span className="chip">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p className="muted">{featured.excerpt}</p>
                <small className="muted">{featured.date}</small>
                <div style={{ marginTop: '1rem' }}>
                  <Button size="sm" variant="secondary">Ler artigo</Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Filtro simples */}
        <section>
          <Container>
            <div className="category-filter">
              {categories.map(cat => (
                <button key={cat} className={`filter-chip ${activeCat === cat ? 'active' : ''}`} onClick={() => setActiveCat(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Lista de artigos */}
        <section>
          <Container>
            <SectionHeader title="Últimos Artigos" subtitle="Conteúdo fresco, útil e local" />
            <div className="articles-grid">
              {filtered.map(a => (
                <Card key={a.id} className="article-card">
                  <div className="article-media"><img src={a.image} alt={a.title} /></div>
                  <div className="article-body">
                    <div className="article-meta"><span className="chip small">{a.category}</span><small className="muted">{a.date}</small></div>
                    <h3>{a.title}</h3>
                    <p className="muted">{a.excerpt}</p>
                    <Button size="sm" variant="outline">Ler mais</Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
