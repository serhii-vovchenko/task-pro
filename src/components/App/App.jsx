import './App.css';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from '../../routes/PublicRoute';
import { PrivateRoute } from '../../routes/PrivateRoute';

// import WelcomePage from '../../pages/WelcomePage/WelcomePage';
// import NotFoundPage from '../../pages/NotFound/NotFoundPage';
// import AuthPage from '../../pages/AuthPage/AuthPage';
// import HomePage from '../../pages/HomePage/HomePage';
// import BoardPage from '../../pages/HomePage/HomePage'; - вот эта страница у нас /home/:boardId

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Navigate to="/welcome" replace />} />
//         <Route path="/welcome" element={<WelcomePage />} />
//         <Route path="/auth/:id" element={<AuthPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/board/:boardName" element={<BoardPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </>
//   );
// }

// -------------------------------------------ROUTES-------------------------------------------------//

// Динамическая загрузка компонентов LAZY

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
// const ScreensPage = lazy(() => import('../pages/ScreensPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFoundPage'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/auth/:id"
            element={
              <PublicRoute>
                <AuthPage />{' '}
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          {/* <Route
            path="/home/:boardId"
            element={<PrivateRoute element={<ScreensPage />} />}
          /> */}

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
