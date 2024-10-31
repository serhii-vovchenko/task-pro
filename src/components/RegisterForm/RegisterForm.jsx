import { Formik, Field, Form } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import css from './RegisterForm.module.css';
import { useState } from 'react';

const RegisterForm = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <div className={css.passwordContainer}>
            <Field
              name="password"
              type="password"
              placeholder="Create a password"
              className={css.formInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.iconButton}
            >
              <svg className={css.icon}>
                <use href="/src/icons.svg#icon-eye" />
              </svg>
            </button>
          </div>
          <button type="submit" className={css.formBottom}>
            Register Now
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
