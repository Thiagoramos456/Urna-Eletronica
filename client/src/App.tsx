import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import DashboardPage from './Pages/DashboardPage';
import CandidateRegisterPage from './Pages/CandidateRegisterPage';
import VotationPage from './Pages/VotationPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<VotationPage />} />
        <Route path="/register" element={<CandidateRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
