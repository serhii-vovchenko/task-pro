import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useState } from 'react';
import sprite from '../../../src/img/icons.svg';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.pageContainer}>
      <Formik>
        <Form className={css.formBlock}>
          <div className={css.linksContainer}>
            <Link to="/auth/register" className={`${css.formLink}`}>
              Registration
            </Link>
            <Link
              to="/auth/login"
              className={`${css.formLink} ${css.activeLink}`}
            >
              Log In
            </Link>
          </div>
          <Field
            name="email"
            placeholder="Enter your email"
            className={css.formInput}
          />
          <div className={css.passwordContainer}>
            <Field
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm a password"
              className={css.formInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.iconButton}
            >
              <svg className={css.icon}>
                <use href={`${sprite}#icon-eye`} />
              </svg>
            </button>
          </div>
          <button type="submit" className={css.formBottom}>
            Log In Now
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
