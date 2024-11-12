import './App.css';
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../../routes/PrivateRoute';
import Loader from '../Loader/Loader';
import { PublicRoute } from '../../routes/PublicRoutes';
import { useDispatch } from 'react-redux';
import { currentUserThunk } from '../../redux/auth/operations';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserThunk());
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {' '}
      <div>
        <Suspense fallback={<Loader width="100" height="100" />}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route
              path="/welcome"
              element={
                <PublicRoute>
                  <WelcomePage />
                </PublicRoute>
              }
            />

            <Route
              path="/auth/:id"
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/:boardId"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </GoogleOAuthProvider>
  );
};

export default App;
