import Container from '../../components/Container';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">take ou tours</h3>
            <p className="footer-tagline">
              Descubra Portugal com alma através de experiências autênticas e guias locais especializados.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Experiências</h4>
            <ul>
              <li><a href="#experiences">Natureza & Aventura</a></li>
              <li><a href="#experiences">Património & História</a></li>
              <li><a href="#experiences">Sabores & Vinhos</a></li>
              <li><a href="#experiences">Tours Personalizados</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Destinos</h4>
            <ul>
              <li><a href="#destinations">Sintra & Cascais</a></li>
              <li><a href="#destinations">Lisboa & Setúbal</a></li>
              <li><a href="#destinations">Alentejo</a></li>
              <li><a href="#destinations">Algarve</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="footer-contact">
              <p>📍 Lisboa, Portugal</p>
              <p>📞 +351 XXX XXX XXX</p>
              <p>✉️ info@takeouttours.pt</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} take ou tours. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#">Política de Privacidade</a>
            <span>•</span>
            <a href="#">Termos de Uso</a>
            <span>•</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
