import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './SaboresVinhosPage.css';

const destaques = [
  {
    titulo: 'Provas de Vinhos',
    descricao: 'Visite adegas familiares, prove vinhos premiados e conheça produtores locais.',
    imagem: 'https://images.unsplash.com/photo-1514361892635-cebb9b6c7ca7?w=800&q=80',
  },
  {
    titulo: 'Gastronomia Regional',
    descricao: 'Experimente iguarias típicas, mercados tradicionais e refeições autênticas.',
    imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  {
    titulo: 'Workshops & Experiências',
    descricao: 'Participe em workshops de cozinha, harmonizações e experiências gastronômicas.',
    imagem: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=800&q=80',
  },
  {
    titulo: 'Roteiros Personalizados',
    descricao: 'Criamos roteiros à sua medida, combinando sabores, vinhos e cultura.',
    imagem: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&q=80',
  },
];

export default function SaboresVinhosPage() {
  return (
    <div className="sabores-vinhos-page">
      <Navbar />
      <header className="sv-hero">
        <Container>
          <h1>Sabores & Vinhos</h1>
          <p>Descubra o melhor da gastronomia portuguesa, vinhos de excelência e experiências autênticas.</p>
          <Button size="lg" onClick={() => document.getElementById('destaques')?.scrollIntoView({behavior:'smooth'})}>Ver Destaques</Button>
        </Container>
      </header>
      <main>
        <section id="destaques">
          <Container>
            <SectionHeader title="Destaques" subtitle="Sabores, aromas e tradições à sua espera" />
            <div className="sv-page-grid">
              {destaques.map((d, i) => (
                <div className="sv-page-card" key={i}>
                  <div className="sv-page-img-wrap">
                    <img src={d.imagem} alt={d.titulo} />
                  </div>
                  <h3>{d.titulo}</h3>
                  <p>{d.descricao}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <SectionHeader title="Personalize o seu tour" subtitle="Conte-nos o que mais lhe apetece" />
            <p style={{maxWidth:600,margin:'0 auto 2rem auto',textAlign:'center'}}>Quer um roteiro focado em vinhos, gastronomia, mercados ou experiências exclusivas? Fale connosco e criamos uma experiência à sua medida.</p>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Button size="lg" onClick={()=>window.location.href='/contact?assunto=Sabores%20e%20Vinhos'}>Pedir Proposta</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
