import './App.css';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../../routes/PrivateRoute';
import Loader from '../Loader/Loader';

// Динамическая загрузка компонентов LAZY

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFoundPage'));
// const ScreensPage = lazy(() => import('../ScreensPage/ScreensPage')); //нужно елемент  боард заменить на скрин пейдж

// -------------------------------------------ROUTES-------------------------------------------------//

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/auth/:id" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          /> */}
          {/* <Route path="/home/:boardId" element={<ScreensPage />} /> */}

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
