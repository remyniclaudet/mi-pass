import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import '../styles/pages/_register.scss'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    
    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password
      })
      
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (err) {
      setError('Erreur lors de l\'inscription')
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Inscription</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
        <div className="login-link">
          <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
        </div>
      </div>
    </div>
  )
}

export default Register