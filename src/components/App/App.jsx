import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import AuthPage from '../../pages/AuthPage/AuthPage';
import HomePage from '../../pages/HomePage/HomePage';
import BoardPage from '../../pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/board/:boardName" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
