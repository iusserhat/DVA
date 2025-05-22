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
// @ts-ignore
import MuhasebePage from './component/MuhasebePage.jsx';
// @ts-ignore
import BakiyeIslemleriPage from './component/BakiyeIslemleriPage.jsx';
// @ts-ignore
import VizePaneliPage from './component/VizePaneliPage.jsx';
// @ts-ignore
import DubaiVizesiPage from './component/DubaiVizesiPage.jsx';
// @ts-ignore
import FinansPage from './component/FinansPage.jsx';
// @ts-ignore
import OperasyonPage from './component/OperasyonPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/dubai-vizesi" element={<DubaiVizesiPage />} />
        <Route path="/finans" element={<FinansPage />} />
        <Route path="/operasyon" element={<OperasyonPage />} />
        <Route path="/yeni-basvuru" element={<VisaApplicationForm />} />
        <Route path="/vize-basvurularim" element={<VisaApplicationForm />} />
        <Route path="/muhasebe" element={<MuhasebePage />} />
        <Route path="/bakiye-islemleri" element={<BakiyeIslemleriPage />} />
        <Route path="/vize-paneli" element={<VizePaneliPage />} />
        {/* Diğer route'lar buraya eklenebilir */}
      </Routes>
    </Router>
  );
};

export default App;
