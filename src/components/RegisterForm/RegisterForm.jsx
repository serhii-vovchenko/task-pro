import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import s from './RegisterForm.module.css';
import { useState } from 'react';
import sprite from '../../../src/img/icons.svg';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations.js';
import Loader from '../Loader/Loader.jsx';
import { toast, Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .matches(/^[a-zA-Z0-9]*$/, 'Name can contain only letters and numbers')
    .required('Name is required'),
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

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);

    const result = await dispatch(registerThunk(values));

    if (registerThunk.fulfilled.match(result)) {
      actions.resetForm();
      toast.success('Registration successful! Welcome aboard!');
      setTimeout(() => {
        dispatch({
          type: 'auth/changeLoginDelayState',
          payload: false,
        });
        setIsLoading(false);
      }, 1500);
    } else if (registerThunk.rejected.match(result)) {
      toast.error(
        'Registration failed. Please check your details and try again.'
      );
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.pageContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader width="100" height="100" />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.formBlock}>
          <div className={s.linksContainer}>
            <Link
              to="/auth/register"
              className={`${s.formLink} ${s.activeLink}`}
            >
              Registration
            </Link>
            <Link to="/auth/login" className={`${s.formLink}`}>
              Log In
            </Link>
          </div>
          <Field
            type="text"
            name="name"
            placeholder="Enter your name"
            className={s.formInput}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={`${s.error} ${s.errorName}`}
          />
          <Field
            type="email"
            name="email"
            placeholder="Enter your email"
            className={s.formInput}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={`${s.error} ${s.errorEmail}`}
          />

          <div className={s.passwordContainer}>
            <div className={s.passwordBlock}>
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className={`${s.formInput} ${s.formInputPassword}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={s.iconButton}
              >
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-eye`} />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={`${s.error} ${s.errorPassword}`}
            />
          </div>

          <button type="submit" className={s.formBottom} disabled={isLoading}>
            Register Now
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
