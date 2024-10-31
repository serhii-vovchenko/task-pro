import { Link } from 'react-router-dom';
import s from './WelcomePage.module.css';
const WelcomePage = () => {
  return (
    <div className={s.homePage}>
      <h1>Welcome Page</h1>
      <Link to="/auth/login">Log In</Link>
      <Link to="/auth/register">Register</Link>
    </div>
  );
};

export default WelcomePage;
