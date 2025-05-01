import { Link } from 'react-router-dom'
//import '../styles/components/_navbar.scss'

function Navbar() {
  return (
    <nav className="mi-pass-navbar">
      <div className="container">
        <div className="user-info">
          <span className="welcome">Bienvenue, Utilisateur</span>
        </div>
        <div className="actions">
          <button className="btn btn-outline-light">Déconnexion</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar