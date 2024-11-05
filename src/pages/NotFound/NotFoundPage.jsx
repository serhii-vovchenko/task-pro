import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundMessage}>Page Not Found</h1>
      <Link to="/" className={styles.redirectButton}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
