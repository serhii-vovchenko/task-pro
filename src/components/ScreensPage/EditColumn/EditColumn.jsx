import s from './AddColumn.module.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editColumn } from '../../../redux/dashboard/columns/operations.js';
import sprite from '../../../../src/img/icons.svg';

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(70, 'Too Long!')
    .required('This field is required!'),
});

const EditColumn = ({ columnTitle, columnId }) => {
  const dispatch = useDispatch();

  const initialValues = {
    title: columnTitle,
  };

  const handleSubmit = (values, actions) => {
    const newColumn = {
      id: columnId,
      body: { title: values.title },
    };
    dispatch(editColumn(newColumn));
    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={columnSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label className={s.label}>
          <p className={s.title}>Edit Column</p>
          <Field
            className={s.input}
            type="text"
            name="title"
            placeholder=""
          ></Field>
          <ErrorMessage
            name="title"
            component="p"
            className={s.error}
          ></ErrorMessage>
        </label>

        <button type="submit" className={s.button}>
          <svg className={s.icon}>
            <use href={`${sprite}#icon-plus`} />
          </svg>
          <span className={s.text}>Edit</span>
        </button>
      </Form>
    </Formik>
  );
};

export default EditColumn;
