import { Link } from 'react-router-dom';
import s from './HomePage.module.css';
const HomePage = () => {
  return (
    <div className={s.homePage}>
      <h1>Home page</h1>
      <Link to="/register">Go to registration page</Link>
      <Link to="/login">Go to login page</Link>
      <Link to="/dashboard">Go to dashboard page</Link>
    </div>
  );
};

export default HomePage;
