import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUserProfile } from '../../redux/auth/operations';
import s from './EditProfileModal.module.css';
import sprite from '../../../src/img/icons.svg';
import { selectUser } from '../../redux/auth/selectors';

const EditProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedFile, setSelectedFile] = useState(null);

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
        'Email should contain only one "@" and at least one "." in the domain part'
      )
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters')
      .matches(/^[^\s]*$/, 'Password should not contain spaces')
      .required('Password is required'),
  });
  const handleSubmit = values => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    dispatch(updateUserProfile(formData)).then(response => {
      if (response.payload) {
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.payload });
      }
    });

    onClose();
  };
  if (!isOpen) return null;

  const handleFileChange = event => {
    setSelectedFile(event.currentTarget.files[0]);
  };

  const handlePlusClick = () => {
    document.getElementById('file-input').click();
  };

  const userAvatar =
    user.photoUrl === null ? (
      <svg className={s.avatarIcon} height="32" width="32">
        <use href={`${sprite}#icon-user`} />
      </svg>
    ) : (
      <img className={s.userAvatar} src={userAvatar} />
    );

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.closeButton} onClick={onClose}>
          <svg className={s.closeIcon}>
            <use href={`${sprite}#icon-x-close`} />
          </svg>
        </div>
        <h2 className={s.modalTitle}>Edit Profile</h2>
        <div className={s.imageUpload}>
          <div className={s.imgBox}>{userAvatar}</div>
          <label className={s.uploadButton} onClick={handlePlusClick}>
            <svg className={s.plusIcon}>
              <use href={`${sprite}#icon-plus`} />
            </svg>
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <Formik
          initialValues={{
            name: user.name || '',
            email: user.email || '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <Field
                type="text"
                name="name"
                className={s.inputField}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className={s.error} />

              <Field
                type="email"
                name="email"
                className={s.inputField}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className={s.error} />

              <Field
                type="password"
                name="password"
                className={s.inputField}
                placeholder="Create a password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />

              <button
                className={s.modalButton}
                type="submit"
                disabled={isSubmitting}
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
