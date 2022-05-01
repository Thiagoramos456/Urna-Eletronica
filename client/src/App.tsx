import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import DashboardPage from './Pages/DashboardPage';
import CandidateRegisterPage from './Pages/CandidateRegisterPage';
import VotePage from './Pages/VotePage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<VotePage />} />
        <Route path="/register" element={<CandidateRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
