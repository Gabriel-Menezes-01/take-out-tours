import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './PatrimonioHistoriaPage.css';

const destaques = [
  {
    titulo: 'Palácios e Castelos',
    descricao: 'Visite monumentos icônicos como o Palácio da Pena, Castelo dos Mouros e Palácio de Queluz.',
    imagem: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80',
  },
  {
    titulo: 'Vilas Históricas',
    descricao: 'Passeie por ruas medievais, praças e centros históricos cheios de charme e tradição.',
    imagem: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80',
  },
  {
    titulo: 'Museus & Cultura',
    descricao: 'Descubra museus, exposições e o melhor da cultura portuguesa em cada destino.',
    imagem: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?w=800&q=80',
  },
  {
    titulo: 'Lendas & Histórias',
    descricao: 'Guias locais contam as lendas, curiosidades e segredos que não estão nos livros.',
    imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  },
];

export default function PatrimonioHistoriaPage() {
  return (
    <div className="patrimonio-historia-page">
      <Navbar />
      <header className="ph-hero">
        <Container>
          <h1>Património & História</h1>
          <p>Descubra palácios, castelos, vilas históricas e as lendas que moldaram Portugal.</p>
          <Button size="lg" onClick={() => document.getElementById('destaques')?.scrollIntoView({behavior:'smooth'})}>Ver Destaques</Button>
        </Container>
      </header>
      <main>
        <section id="destaques">
          <Container>
            <SectionHeader title="Destaques" subtitle="O melhor do património português, guiado por especialistas" />
            <div className="ph-page-grid">
              {destaques.map((d, i) => (
                <div className="ph-page-card" key={i}>
                  <div className="ph-page-img-wrap">
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
            <SectionHeader title="Personalize a sua visita" subtitle="Conte-nos o que mais lhe interessa" />
            <p style={{maxWidth:600,margin:'0 auto 2rem auto',textAlign:'center'}}>Quer um roteiro focado em história, arquitetura, cultura ou lendas? Fale connosco e criamos uma experiência à sua medida.</p>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Button size="lg" onClick={()=>window.location.href='/contact?assunto=Patrimonio%20e%20Historia'}>Pedir Proposta</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
