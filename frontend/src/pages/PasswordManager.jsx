import { useState, useEffect } from 'react'
import axios from 'axios'
//import '../styles/pages/_password-manager.scss'

function PasswordManager() {
  const [passwords, setPasswords] = useState([])
  const [newPassword, setNewPassword] = useState({
    website: '',
    username: '',
    password: ''
  })
  const [generatedPassword, setGeneratedPassword] = useState('')

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/passwords', {
        headers: { 'x-access-token': token }
      })
      setPasswords(response.data.passwords)
    } catch (error) {
      console.error('Error fetching passwords:', error)
    }
  }

  const handleAddPassword = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/passwords', newPassword, {
        headers: { 'x-access-token': token }
      })
      fetchPasswords()
      setNewPassword({ website: '', username: '', password: '' })
    } catch (error) {
      console.error('Error adding password:', error)
    }
  }

  const handleDeletePassword = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/passwords/${id}`, {
        headers: { 'x-access-token': token }
      })
      fetchPasswords()
    } catch (error) {
      console.error('Error deleting password:', error)
    }
  }

  const generatePassword = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/generate-password', {
        headers: { 'x-access-token': token }
      })
      setGeneratedPassword(response.data.password)
      setNewPassword({ ...newPassword, password: response.data.password })
    } catch (error) {
      console.error('Error generating password:', error)
    }
  }

  return (
    <div className="password-manager">
      <h2>Gestion des mots de passe</h2>
      
      <div className="add-password-form">
        <h3>Ajouter un nouveau mot de passe</h3>
        <div className="form-group">
          <label>Site web</label>
          <input
            type="text"
            value={newPassword.website}
            onChange={(e) => setNewPassword({ ...newPassword, website: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={newPassword.username}
            onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <div className="password-input-group">
            <input
              type="text"
              value={newPassword.password}
              onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
            />
            <button type="button" onClick={generatePassword} className="btn btn-secondary">
              Générer
            </button>
          </div>
          {generatedPassword && (
            <div className="generated-password">
              Mot de passe généré: <strong>{generatedPassword}</strong>
            </div>
          )}
        </div>
        <button type="button" onClick={handleAddPassword} className="btn btn-primary">
          Enregistrer
        </button>
      </div>
      
      <div className="passwords-list">
        <h3>Vos mots de passe enregistrés</h3>
        {passwords.length === 0 ? (
          <p>Aucun mot de passe enregistré</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Site web</th>
                <th>Nom d'utilisateur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((pw) => (
                <tr key={pw.id}>
                  <td>{pw.website}</td>
                  <td>{pw.username}</td>
                  <td>
                    <button
                      onClick={() => handleDeletePassword(pw.id)}
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PasswordManager