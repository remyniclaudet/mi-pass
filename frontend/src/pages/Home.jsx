import { Link } from 'react-router-dom'
//import '../styles/pages/_home.scss'

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Bienvenue sur Mi-Pass</h1>
          <p>Votre gestionnaire de mots de passe sécurisé</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Commencer</Link>
            <Link to="/login" className="btn btn-outline-light">Connexion</Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Fonctionnalités</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Stockage sécurisé</h3>
              <p>Tous vos mots de passe chiffrés et protégés</p>
            </div>
            <div className="feature-card">
              <h3>Générateur intégré</h3>
              <p>Créez des mots de passe forts en un clic</p>
            </div>
            <div className="feature-card">
              <h3>Accessible partout</h3>
              <p>Disponible sur tous vos appareils</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home