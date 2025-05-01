import { Link } from 'react-router-dom'
//import '../styles/components/_header.scss'

function Header() {
  return (
    <header className="mi-pass-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="mi">Mi</span>-<span className="pass">Pass</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header