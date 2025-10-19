import './PriceTableWithImages.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';

const DESTINOS = [
  {
    nome: 'Sintra & Cascais',
    preco: '€120',
    imagem: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80',
  },
  {
    nome: 'Lisboa & Setúbal',
    preco: '€110',
    imagem: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=80',
  },
  {
    nome: 'Alentejo (Évora, Monsaraz)',
    preco: '€140',
    imagem: 'https://images.unsplash.com/photo-1588429351799-09494af49e72?w=400&q=80',
  },
  {
    nome: 'Algarve Autêntico',
    preco: '€160',
    imagem: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&q=80',
  },
  {
    nome: 'Centro (Fátima, Óbidos, Nazaré)',
    preco: '€130',
    imagem: 'https://images.unsplash.com/photo-1544986581-efac024faf62?w=400&q=80',
  },
];


export default function PriceTableWithImages() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const reqRef = useRef();
  const isPaused = useRef(false);

  // Duplicar os destinos para efeito de rolagem infinita
  const destinosDuplicados = [...DESTINOS, ...DESTINOS];

  // Movimento suave infinito
  const step = 0.5; // pixels por frame (ajuste para mais lento ou mais rápido)

  const animate = useCallback(() => {
    if (isPaused.current) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft += step;
    // Quando chegar no meio, volta para o início
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }
    reqRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [animate]);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };
  const handleMouseLeave = () => {
    isPaused.current = false;
    reqRef.current = requestAnimationFrame(animate);
  };

  const handleReserve = (destinoNome) => {
    navigate(`/contact?destino=${encodeURIComponent(destinoNome)}`);
  };

  return (
    <section className="price-table-img-section">
      <h2 className="price-table-img-title">Tabela de Preços dos Destinos</h2>
      <div
        className="price-table-img-grid"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
      >
        {destinosDuplicados.map((d, idx) => (
          <div className="price-table-img-card" key={idx + d.nome}>
            <img src={d.imagem} alt={d.nome} className="price-table-img" />
            <div className="price-table-img-info">
              <h3>{d.nome}</h3>
              <p className="price-table-img-preco">{d.preco}</p>
            </div>
            <button className="price-table-img-reserve" onClick={() => handleReserve(d.nome)}>Reservar</button>
          </div>
        ))}
      </div>
      <p className="price-table-img-note">Valores para tours privados até 4 pessoas. Consulte para grupos maiores ou roteiros personalizados.</p>
    </section>
  );
}
