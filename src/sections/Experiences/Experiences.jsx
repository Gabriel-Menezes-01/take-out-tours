import Container from '../../components/Container';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import { experiences } from '../../data/content';
import { useNavigate } from 'react-router-dom';
import './Experiences.css';

export default function Experiences() {
  const navigate = useNavigate();
  return (
    <section id="experiences" className="experiences">
      <Container>
        <SectionHeader 
          title="As Nossas Experiências"
          subtitle="Cada tour é uma jornada única, criada para revelar a essência autêntica de Portugal"
        />
        <div className="experiences-grid">
          {experiences.map((exp) => (
            <Card key={exp.id} className="experience-card">
              <div className="experience-icon">{exp.icon}</div>
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-description">{exp.description}</p>
              <button className="experience-link" onClick={() => navigate('/experiences')}>
                Descobrir <span className="arrow">→</span>
              </button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
