import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Button from '../../components/Button';
import './AboutPage.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AboutPage() {
  const location = useLocation();

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
    <div className="page-about">
      <Navbar />
      <main className="about-main">
        {/* Hero */}
        <header className="about-hero">
          <Container>
            <h1>Sobre Nós</h1>
            <p>
              Somos locais. Guias com alma e histórias para contar. Recebemos como amigos e mostramos Portugal sem pressas.
            </p>
            <Button size="md" variant="primary" onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}>Conhecer a equipa</Button>
          </Container>
        </header>

        {/* Equipa */}
        <section id="team" className="about-section">
          <Container>
            <SectionHeader title="A equipa local" subtitle="Guias em 3 Atos" align="left" />
            <div className="team-grid">
              {[
                { name: 'Inês', role: 'Guia & Storyteller', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=80' },
                { name: 'Miguel', role: 'Condutor & Sommelier', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1000&q=80' },
                { name: 'Joana', role: 'Curadora de Roteiros', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&q=80' },
              ].map(m => (
                <div key={m.name} className="team-card">
                  <div className="team-media"><img src={m.img} alt={m.name} /></div>
                  <div className="team-body">
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Missão & Valores */}
        <section id="mission" className="about-section split">
          <Container>
            <div className="split-grid">
              <div className="split-text">
                <SectionHeader title="Missão & valores" subtitle="Autenticidade, conforto e respeito pela cultura local" align="left" />
                <p className="muted">Queremos que cada dia seja memorável: paisagens, sabores e encontros que ficam. Operamos com impacto positivo nas comunidades e no ambiente.</p>
              </div>
              <div className="split-media">
                <img src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200&q=80" alt="Missão com alma" />
              </div>
            </div>
          </Container>
        </section>

        {/* Frota & Conforto */}
        <section id="fleet" className="about-section">
          <Container>
            <SectionHeader title="Frota e conforto" subtitle="Segurança e comodidade em cada quilómetro" align="left" />
            <div className="fleet-grid">
              {[
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
                'https://images.unsplash.com/photo-1550355191-3526a3d53686?w=1200&q=80',
                'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80',
              ].map((src, i) => (
                <div key={i} className="fleet-media"><img src={src} alt={`Frota ${i+1}`} /></div>
              ))}
            </div>
            <div className="about-cta">
              <Button size="lg" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>Contacto / Reserva</Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
