import { Formik, Field, Form } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const location = useLocation();

  return (
    <div className={css.pageContainer}>
      <Formik>
        <Form className={css.formBlock}>
          <div className={css.linksContainer}>
            <Link
              to="/register"
              className={`${css.formLink} ${
                location.pathname === '/register' ? css.activeLink : ''
              }`}
            >
              Registration
            </Link>
            <Link
              to="/login"
              className={`${css.formLink} ${
                location.pathname === '/login' ? css.activeLink : ''
              }`}
            >
              Log In
            </Link>
          </div>
          <Field
            name="name"
            placeholder="Enter your name"
            className={css.formInput}
          />
          <Field
            name="email"
            placeholder="Enter your email"
            className={css.formInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Create a password"
            className={css.formInput}
          />
          <button type="submit" className={css.formBottom}>
            Register Now
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
