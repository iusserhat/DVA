import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// @ts-ignore
import LoginPage from './component/LoginPage.jsx';
// @ts-ignore
import RegisterPage from './component/RegisterPage.jsx';
// @ts-ignore
import HomePage from './component/HomePage.jsx';
// @ts-ignore
import VisaApplicationForm from './component/VisaApplicationForm.jsx';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/dubai-vizesi" element={<HomePage />} />
        <Route path="/finans" element={<HomePage />} />
        <Route path="/operasyon" element={<HomePage />} />
        <Route path="/yeni-basvuru" element={<VisaApplicationForm />} />
        <Route path="/vize-basvurularim" element={<VisaApplicationForm />} />
        {/* Diğer route'lar buraya eklenebilir */}
      </Routes>
    </Router>
  );
};

export default App;
