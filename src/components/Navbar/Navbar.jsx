import { useState, useEffect } from 'react';
import './Navbar.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../utils/router';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileSub, setOpenMobileSub] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const go = () => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };

    if (location.pathname !== routes.home) {
      navigate(routes.home, { replace: false });
      setTimeout(go, 50);
    } else {
      go();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const menu = [
    { label: 'Experiências', type: 'menu', route: routes.experiences, items: [
      { label: 'Natureza & Aventura', action: () => navigate(routes.naturezaAventura) },
  { label: 'Património & História', action: () => navigate(routes.patrimonioHistoria) },
  { label: 'Sabores & Vinhos', action: () => navigate(routes.saboresVinhos) },
      { label: 'Tours Personalizados', action: () => navigate(routes.toursPersonalizados) },
    ]},
    { label: 'Destinos', type: 'menu', route: routes.destinations, items: [
  { label: 'Sintra & Cascais', action: () => navigate(routes.sintraCascais) },
  { label: 'Lisboa & Setúbal', action: () => navigate(routes.lisboaSetubal) },
  { label: 'Alentejo (Évora, Monsaraz)', action: () => navigate(routes.alentejoEvoraMonsaraz) },
  { label: 'Algarve Autêntico', action: () => navigate(routes.algarveAutentico) },
  { label: 'Centro (Fátima, Óbidos, Nazaré)', action: () => navigate(routes.centroFatimaObidosNazare) },
    ]},
    { label: 'Sobre Nós', type: 'menu', route: routes.about, items: [
      { label: 'A equipa local', action: () => navigate(`${routes.about}#team`) },
      { label: 'Missão & valores', action: () => navigate(`${routes.about}#mission`) },
      { label: 'Frota e conforto', action: () => navigate(`${routes.about}#fleet`) },
    ]},
    { label: 'Blog/Diário', type: 'route', route: routes.blog },
    { label: 'Testemunhos', type: 'route', route: routes.testimonials },
    { label: 'Contacto / Reserva', type: 'route', route: routes.contact },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} onMouseLeave={() => setOpenDropdown(null)}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">take ou tours</span>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          {menu.map((item, idx) => (
            <li key={idx} className={`navbar-item ${openDropdown === idx ? 'open' : ''}`} onMouseEnter={() => setOpenDropdown(idx)}>
              <button
                className="navbar-link"
                onClick={() => {
                  if (item.route) navigate(item.route);
                  else if (item.type === 'section' && item.id) scrollToSection(item.id);
                }}
              >
                {item.label}
              </button>
              {item.items && item.items.length > 0 && (
                <div className={`dropdown ${openDropdown === idx ? 'show' : ''}`}>
                  {item.items.map((sub, sidx) => (
                    <button key={sidx} className="dropdown-link" onClick={() => { sub.action(); setOpenDropdown(null); setIsMobileMenuOpen(false); }}>
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'navbar-mobile-menu-open' : ''}`}>
          <ul>
            {menu.map((item, idx) => (
              <li key={idx} className="mobile-item">
                <button
                  className="navbar-mobile-link"
                  onClick={() => {
                    if (item.items && item.items.length) {
                      setOpenMobileSub(openMobileSub === idx ? null : idx);
                    } else {
                      if (item.type === 'route' && item.route) navigate(item.route);
                      if (item.type === 'section' && item.id) scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.label}
                </button>
                {item.items && (
                  <div className={`mobile-sub ${openMobileSub === idx ? 'show' : ''}`}>
                    {item.items.map((sub, sidx) => (
                      <button key={sidx} className="navbar-mobile-sublink" onClick={() => { sub.action(); setIsMobileMenuOpen(false); setOpenMobileSub(null); }}>
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
