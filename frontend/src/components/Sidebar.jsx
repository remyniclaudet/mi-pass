import { Link } from 'react-router-dom'
//import '../styles/components/_sidebar.scss'

function Sidebar() {
  return (
    <aside className="mi-pass-sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Tableau de bord</Link></li>
          <li><Link to="/dashboard/passwords">Mots de passe</Link></li>
          <li><Link to="/dashboard/generator">Générateur</Link></li>
          <li><Link to="/dashboard/settings">Paramètres</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar