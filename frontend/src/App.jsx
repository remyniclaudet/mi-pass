import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '../src/assets/styles/components/header.css';

const Header = lazy(() => import('./components/layout/Header'))


const App = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<div className="loading">Chargement...</div>}>
          <Header/>
      </Suspense>
    </div>
  )
}

export default App