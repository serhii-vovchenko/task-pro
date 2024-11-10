import React, { useState } from 'react';
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
      .required('Email is required'),
    password: Yup.string()
      
  });


  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (selectedFile) {
      formData.append('photoUrl', selectedFile); 
    }
    console.log(formData);
    dispatch(updateUserProfile(formData))
    .then((response) => {
      if (response.payload) {
        
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.payload });
      }
    })
    .catch((error) => {
      console.error("Error in updating profile:", error);
    });

    onClose();
  };

  if (!isOpen || !user) return null;

  const handleFileChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]); 
  };

  const handlePlusClick = () => {
    document.getElementById('file-input').click(); 
  };

  const userIcon =
  user.theme === 'light'
    ? 'icon-user-light'
    : user.theme === 'violet'
    ? 'icon-user-violet'
    : user.theme === 'dark'
    ? 'icon-user-dark'
    : 'icon-user';

    const userAvatar =
    user.photoUrl ? (
      <img className={s.userAvatar} src={user.photoUrl} alt="User Avatar" />
    ) : (
      <svg className={s.avatarIcon} height="32" width="32">
        <use href={`${sprite}#${userIcon}`} />
      </svg>
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
          <div className={s.imgBox}>
          {selectedFile || user.photoUrl ? (
        <img src={selectedFile ? URL.createObjectURL(selectedFile) : user.photoUrl} alt="User Avatar" className={s.avatarImage} />
      ) : (
        <svg className={s.avatarIcon} height="32" width="32">
          <use href={`${sprite}#${userIcon}`} />
        </svg>
      )}
          </div>
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
              <ErrorMessage name="password" component="div" className={s.error} />

              <button
                className={s.modalButton}
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
