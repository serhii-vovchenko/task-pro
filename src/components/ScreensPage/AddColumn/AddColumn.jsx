import s from './AddColumn.module.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addColumn } from '../../../redux/dashboard/columns/operations.js';
import sprite from '../../../../src/img/icons.svg';

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(70, 'Too Long!')
    .required('This field is required!'),
});

const AddColumn = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
  };

  const handleSubmit = (values, actions) => {
    const newColumn = {
      title: values.title,
    };
    dispatch(addColumn(newColumn));
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
          <p className={s.title}>Add Column</p>
          <Field
            className={s.input}
            type="text"
            name="title"
            placeholder="Title"
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
          <span className={s.text}>Add</span>
        </button>
      </Form>
    </Formik>
  );
};

export default AddColumn;
