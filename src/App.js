import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationDoctorPage from './components/RegistrationDoctorPage';
import AddPatientPage from './components/AddPatientPage';
import LoginDoctorPage from './components/LoginDoctorPage';
import PatientDetail from './components/PatientDetail';
import Header from './components/Navbar/Header';
import PatientListPage from './components/PatientListPage';
import PatientAnalysisPage from './components/PatientAnalysisPage';
import SchedulePage from './components/SchedulePage';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/register-doctor" element={<RegistrationDoctorPage />} />
        <Route path="/add-patient" element={<AddPatientPage />} />
        <Route path="/" element={<LoginDoctorPage />} />        
        <Route path="/patient-list" element={<PatientListPage />} />
        <Route path="/patient/:patientId" element={<PatientDetail />} />
        <Route path="/patient-analysis" element={<PatientAnalysisPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
};

export default App;
