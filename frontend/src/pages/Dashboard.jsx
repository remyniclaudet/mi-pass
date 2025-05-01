import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PasswordManager from './PasswordManager'
//import '../styles/pages/_dashboard.scss'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('passwords')

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          {activeTab === 'passwords' && <PasswordManager />}
          {/* Ajoutez d'autres composants pour les autres onglets */}
        </main>
      </div>
    </div>
  )
}

export default Dashboard