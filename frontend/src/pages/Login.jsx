import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import '../styles/pages/_login.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      })
      
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Identifiants incorrects')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Connexion</h2>
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
          <button type="submit" className="btn btn-primary">Se connecter</button>
        </form>
        <div className="register-link">
          <p>Pas encore de compte ? <a href="/register">S'inscrire</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login