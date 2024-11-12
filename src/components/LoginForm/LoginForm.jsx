import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import css from './LoginForm.module.css';
import { useState } from 'react';
import sprite from '../../../src/img/icons.svg';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { googleLoginThunk, loginThunk } from '../../redux/auth/operations.js';
import Loader from '../Loader/Loader.jsx';
import { toast, Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must have one "@" and a "."'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(/^[^\s]*$/, 'Password should not contain spaces')
    .required('Password is required'),
});

const LoginForm = () => {
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
      setTimeout(() => {
        dispatch({
          type: 'auth/changeLoginDelayState',
          payload: false,
        });
        setIsLoading(false);
      }, 1500);
    } else if (loginThunk.rejected.match(result)) {
      toast.error('Login failed. Please check your email and password.');
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google Response:', response);
      setIsLoading(true);
      try {
        const result = await dispatch(
          googleLoginThunk({ code: response.code })
        );
        if (googleLoginThunk.fulfilled.match(result)) {
          toast.success('Google login successful!');
        } else {
          toast.error('Google login failed');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      console.log('Google login failed');
      setIsLoading(false);
    },
    flow: 'auth-code',
    // ux_mode: 'redirect',
    // redirect_uri: 'http://localhost:5173',
    // redirect_uri:
    //   'https://task-pro-backend-mcfs.onrender.com/confirm-google-auth',
  });

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
            <Link
              to="/auth/register"
              className={`${css.formLink}`}
              tabIndex={isLoading ? -1 : 0}
            >
              Registration
            </Link>
            <Link
              to="/auth/login"
              className={`${css.formLink} ${css.activeLink}`}
              tabIndex={isLoading ? -1 : 0}
            >
              Log In
            </Link>
          </div>
          <Field
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`${css.formInput} ${css.firstInput}`}
            disabled={isLoading}
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
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={css.iconButton}
                disabled={isLoading}
                tabIndex={isLoading ? -1 : 0}
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

          <button
            type="submit"
            className={css.formBottom}
            disabled={isLoading}
            tabIndex={isLoading ? -1 : 0}
          >
            Log In Now
          </button>

          <div className={css.googleBtn}>
            <button
              onClick={() => googleLogin()}
              className={css.customGoogleBtn}
              disabled={isLoading}
              tabIndex={isLoading ? -1 : 0}
              type="button"
            >
              <svg className={css.googleIcon}>
                <use href={`${sprite}#icon-google`} />
              </svg>
              Continue with Google
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
