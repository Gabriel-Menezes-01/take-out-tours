import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Button from '../../components/Button';
import './PersonalizedToursPage.css';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PersonalizedToursPage() {
  const navigate = useNavigate();
  const [interests, setInterests] = useState({ historia: false, gastronomia: false, natureza: false, mar: false, compras: false });
  const [duracao, setDuracao] = useState('meio-dia');
  const [grupo, setGrupo] = useState('2');

  const resumo = useMemo(() => {
    const selecionados = Object.entries(interests).filter(([, v]) => v).map(([k]) => k).join(', ') || 'surpreenda-me';
    return `Interesses: ${selecionados} | Duração: ${duracao} | Pessoas: ${grupo}`;
  }, [interests, duracao, grupo]);

  const goContact = () => {
    const params = new URLSearchParams({ assunto: 'Tour Personalizado', resumo });
    navigate(`/contact?${params.toString()}`);
  };

  const toggle = (key) => setInterests((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="ptp">
      <Container>
        <SectionHeader title="Configura o teu Tour Personalizado" subtitle="Escolhe aquilo que mais combina contigo. Ajusta depois com a nossa equipa." />
        <div className="ptp-grid">
          <div className="ptp-form">
            <div className="ptp-group">
              <h3>Interesses</h3>
              <div className="ptp-checkboxes">
                {[
                  ['historia', 'História & Palácios'],
                  ['gastronomia', 'Gastronomia & Vinhos'],
                  ['natureza', 'Natureza & Trilhos'],
                  ['mar', 'Mar & Miradouros'],
                  ['compras', 'Compras & Artesanato'],
                ].map(([key, label]) => (
                  <label key={key} className={`ptp-check ${interests[key] ? 'checked' : ''}`}>
                    <input type="checkbox" checked={interests[key]} onChange={() => toggle(key)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="ptp-group">
              <h3>Duração</h3>
              <select value={duracao} onChange={(e) => setDuracao(e.target.value)}>
                <option value="meio-dia">Meio dia</option>
                <option value="dia-inteiro">Dia inteiro</option>
                <option value="2-dias">2 dias</option>
              </select>
            </div>

            <div className="ptp-group">
              <h3>Tamanho do grupo</h3>
              <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                <option value="2">2 pessoas</option>
                <option value="4">4 pessoas</option>
                <option value="6">6 pessoas</option>
                <option value="8+">8+ pessoas</option>
              </select>
            </div>
          </div>

          <aside className="ptp-summary">
            <h3>Resumo</h3>
            <p>{resumo}</p>
            <div className="ptp-actions">
              <Button onClick={goContact}>Pedir orçamento</Button>
              <Button variant="secondary" onClick={() => navigate('/')}>Voltar à Home</Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
