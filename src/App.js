import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';
import './styles/App.css';
import { AuthContext } from './context';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
