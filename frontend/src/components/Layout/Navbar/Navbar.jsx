import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.scss'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [location])

  // ================================
  // HANDLERS
  // ================================

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  // ================================
  // NAVIGATION DATA
  // ================================

  const navItems = [
    {
      label: 'EXPERIÊNCIAS',
      key: 'experiencias',
      submenu: [
        { label: 'Natureza & Aventura', path: '/experiencias/natureza' },
        { label: 'Património & História', path: '/experiencias/patrimonio' },
        { label: 'Sabores & Vinhos', path: '/experiencias/sabores' },
        { label: 'Tours Personalizados', path: '/experiencias/personalizados' }
      ]
    },
    {
      label: 'DESTINOS',
      key: 'destinos',
      submenu: [
        { label: 'Sintra & Cascais', path: '/destinos/sintra-cascais' },
        { label: 'Lisboa & Setúbal', path: '/destinos/lisboa-setubal' },
        { label: 'Alentejo (Évora, Monsaraz)', path: '/destinos/alentejo' },
        { label: 'Algarve Autêntico', path: '/destinos/algarve' },
        { label: 'Centro (Fátima, Óbidos, Nazaré)', path: '/destinos/centro' }
      ]
    },
    {
      label: 'SOBRE NÓS',
      key: 'sobre',
      submenu: [
        { label: 'A equipa local (Guias em 3 Atos)', path: '/sobre/equipa' },
        { label: 'Missão & valores', path: '/sobre/missao' },
        { label: 'Frota e conforto', path: '/sobre/frota' }
      ]
    }
  ]

  // ================================
  // RENDER
  // ================================

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Mobile Menu Button */}
        <button 
          className="navbar__mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>

        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/img/logo/take.png" alt="Take Out Tours" className="navbar__logo-img" />
            <span className="navbar__logo-text">TAKE OUT TOURS</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          <div className="navbar__nav-header">
            <span className="navbar__nav-title">TAKE OUT TOURS</span>
            <button 
              className="navbar__nav-close"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <ul className="navbar__nav-list">
            {navItems.map((item) => (
              <li 
                key={item.key}
                className={`navbar__nav-item ${activeDropdown === item.key ? 'navbar__nav-item--active' : ''}`}
              >
                <button
                  className="navbar__nav-link"
                  onClick={() => toggleDropdown(item.key)}
                  aria-expanded={activeDropdown === item.key}
                >
                  {item.label}
                  <i className="bi bi-chevron-down navbar__nav-arrow"></i>
                </button>
                
                <ul className={`navbar__submenu ${activeDropdown === item.key ? 'navbar__submenu--open' : ''}`}>
                  {item.submenu.map((subItem, index) => (
                    <li key={index} className="navbar__submenu-item">
                      <Link 
                        to={subItem.path}
                        className="navbar__submenu-link"
                        onClick={closeMenu}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            <li className="navbar__nav-item">
              <Link to="/blog" className="navbar__nav-link" onClick={closeMenu}>
                BLOG/DIÁRIO
              </Link>
            </li>

            <li className="navbar__nav-item">
              <Link to="/contato" className="navbar__nav-link" onClick={closeMenu}>
                CONTATOS/RESERVA
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Box */}
        <div className="navbar__search">
          <button className="navbar__search-toggle" aria-label="Toggle search">
            <i className="bi bi-search"></i>
          </button>
          <div className="navbar__search-box">
            <input 
              type="text" 
              placeholder="Pesquisar tours..."
              className="navbar__search-input"
            />
            <button className="navbar__search-submit" aria-label="Search">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="navbar__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  )
}

export default Navbar
