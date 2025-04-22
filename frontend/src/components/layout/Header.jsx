import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo avec animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="logo-container"
          >
            <Link to="/" className="logo">
              <img 
                src="/src/assets/images/Mi-code.png"
                alt="Mi-Pass Logo" 
              />
            
            </Link>
          </motion.div>

          {/* Menu Burger pour mobile */}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Navigation principale */}
          <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="#features" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fonctionnalités
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="#security" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sécurité
                </NavLink>
              </li>
            </ul>

            {/* Boutons d'authentification pour mobile */}
            <div className="auth-buttons-mobile">
              <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                Connexion
              </Link>
              <Link to="/signup" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Inscription
              </Link>
            </div>
          </nav>

          {/* Boutons d'authentification pour desktop */}
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">
              Connexion
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Inscription
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
}