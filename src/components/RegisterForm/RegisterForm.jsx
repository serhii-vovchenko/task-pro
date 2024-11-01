import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import css from './RegisterForm.module.css';
import { useState } from 'react';
import sprite from '../../../src/img/icons.svg';

const RegisterForm = () => {
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
              to="/auth/register"
              className={`${css.formLink} ${css.activeLink}`}
            >
              Registration
            </Link>
            <Link to="/auth/login" className={`${css.formLink}`}>
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
                <use href={`${sprite}#icon-eye`} />
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
