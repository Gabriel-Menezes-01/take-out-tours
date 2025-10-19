import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import './NaturezaAventuraPage.css';

const destaques = [
  {
    titulo: 'Trilhos Secretos',
    descricao: 'Caminhadas por florestas místicas, vales e penhascos com vistas únicas.',
    imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  },
  {
    titulo: 'Praias Selvagens',
    descricao: 'Areias douradas, falésias e o Atlântico em estado puro. Descubra recantos só conhecidos pelos locais.',
    imagem: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80',
  },
  {
    titulo: 'Aventura & Adrenalina',
    descricao: 'Surf, BTT, escalada, jipe e experiências para quem quer emoção.',
    imagem: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  },
  {
    titulo: 'Miradouros & Piqueniques',
    descricao: 'Vistas de cortar a respiração e piqueniques em cenários únicos.',
    imagem: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
  },
];

export default function NaturezaAventuraPage() {
  return (
    <div className="natureza-aventura-page">
      <Navbar />
      <header className="na-hero">
        <Container>
          <h1>Natureza & Aventura</h1>
          <p>Descubra trilhos, praias selvagens, miradouros e experiências ao ar livre com guias locais apaixonados.</p>
          <Button size="lg" onClick={() => document.getElementById('destaques')?.scrollIntoView({behavior:'smooth'})}>Ver Destaques</Button>
        </Container>
      </header>
      <main>
        <section id="destaques">
          <Container>
            <SectionHeader title="Destaques" subtitle="O melhor da natureza portuguesa, à sua medida" />
            <div className="na-page-grid">
              {destaques.map((d, i) => (
                <div className="na-page-card" key={i}>
                  <div className="na-page-img-wrap">
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
            <SectionHeader title="Personalize a sua aventura" subtitle="Escolha o ritmo, os interesses e o tipo de grupo" />
            <p style={{maxWidth:600,margin:'0 auto 2rem auto',textAlign:'center'}}>Quer trilhos tranquilos, aventura radical, piqueniques ou praias secretas? Fale connosco e criamos um roteiro só para si.</p>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Button size="lg" onClick={()=>window.location.href='/contact?assunto=Natureza%20e%20Aventura'}>Pedir Proposta</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
