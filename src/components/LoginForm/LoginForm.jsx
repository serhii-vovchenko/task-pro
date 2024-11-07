import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, Navigate } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useState } from 'react';
import sprite from '../../../src/img/icons.svg';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import Loader from '../Loader/Loader.jsx';
import { toast, Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email should contain only one "@" and at least one "." in the domain part'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(/^[^\s]*$/, 'Password should not contain spaces')
    .required('Password is required'),
});

const LoginForm = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);

    const result = await dispatch(loginThunk(values));

    if (loginThunk.fulfilled.match(result)) {
      actions.resetForm();
      toast.success('Login successful! Welcome back!');
      setTimeout(() => setIsLoading(false), 1500);
    } else if (loginThunk.rejected.match(result)) {
      toast.error('Login failed. Please check your email and password.');
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={css.pageContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader width="100" height="100" />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`${css.formInput} ${css.firstInput}`}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={css.errorEmail}
          />

          <div className={css.passwordContainer}>
            <div className={css.passwordBlock}>
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
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorPassword}
            />
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
