import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationDoctorPage from './components/RegistrationDoctorPage';
import RegistrationPatientPage from './components/AddPatientPage';
import LoginDoctorPage from './components/LoginDoctorPage';
import PatientDetail from './components/PatientDetail';
import Header from './components/Navbar/Header';
import PatientListPage from './components/PatientListPage';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/register-doctor" element={<RegistrationDoctorPage />} />
        <Route path="/register-patient" element={<RegistrationPatientPage />} />
        <Route path="/" element={<LoginDoctorPage />} />        
        <Route path="/patient-list" element={<PatientListPage />} />
        <Route path="/patient/:patientId" element={<PatientDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
