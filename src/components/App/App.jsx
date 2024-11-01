import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import AuthPage from '../../pages/AuthPage/AuthPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
