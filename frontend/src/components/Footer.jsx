//import '../styles/components/_footer.scss'

function Footer() {
  return (
    <footer className="mi-pass-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Mi-Pass - Gestionnaire de mots de passe sécurisé</p>
      </div>
    </footer>
  )
}

export default Footer