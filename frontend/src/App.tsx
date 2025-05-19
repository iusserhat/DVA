import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// @ts-ignore
import LoginPage from './component/LoginPage.jsx';
// @ts-ignore
import RegisterPage from './component/RegisterPage.jsx';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Diğer route'lar buraya eklenebilir */}
      </Routes>
    </Router>
  );
};

export default App;
