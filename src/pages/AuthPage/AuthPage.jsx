import { useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import NotFoundPage from '../NotFound/NotFoundPage';

const AuthPage = () => {
  const { id } = useParams();
  return (
    <>
      {id === 'login' ? (
        <LoginForm />
      ) : id === 'register' ? (
        <RegisterForm />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default AuthPage;
