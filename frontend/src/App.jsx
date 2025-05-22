import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import DashboardPage from './component/DashboardPage';
import AdminPage from './component/AdminPage';
import VisaApplicationForm from './component/VisaApplicationForm';
import VisaApplicationDetails from './component/VisaApplicationDetails';
import PageNotFound from './component/PageNotFound';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/giris" element={<LoginPage />} />
          <Route path="/kayit" element={<RegisterPage />} />
          <Route path="/panel" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/yeni-basvuru" element={<VisaApplicationForm />} />
          <Route path="/vize-basvurularim" element={<DashboardPage />} />
          <Route path="/basvuru/:id" element={<VisaApplicationDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 