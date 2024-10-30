import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
