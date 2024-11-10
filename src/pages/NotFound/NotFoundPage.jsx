import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>PAGE NOT FOUND</h1>
      <p className={styles.zoomArea}>
        <b>Oops!</b> Sorry, we can't find that page!
      </p>
      <section className={styles.errorContainer}>
        <span>4</span>
        <span>
          <span className={styles.screenReaderText}>0</span>
        </span>
        <span>4</span>
      </section>
      <div className={styles.linkContainer}>
        <Link to="/" className={styles.moreLink}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
