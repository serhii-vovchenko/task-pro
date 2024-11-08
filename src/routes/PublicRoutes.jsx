import { selectIsLoggedIn } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to={location?.state ?? '/home'} />;
  }
  return children;
};
