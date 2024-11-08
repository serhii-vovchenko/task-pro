import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editColumn } from '../../redux/dashboard/columns/operations';
import sprite from '../../img/icons.svg';
import { selectColumn } from '../../redux/dashboard/columns/selectors';
import s from './EditColumn.module.css';

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(70, 'Too Long!')
    .required('This field is required!'),
});

const EditColumn = ({ closeModal }) => {
  const { _id, title } = useSelector(selectColumn);
  const dispatch = useDispatch();

  const initialValues = {
    title: title || '',
  };

  const handleSubmit = (values, actions) => {
    const newColumn = {
      columnId: _id,
      body: { title: values.title },
    };

    dispatch(editColumn(newColumn));
    actions.resetForm();
    closeModal();
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
          <Field className={s.input} type="text" name="title"></Field>
          <ErrorMessage name="title" component="p" className={s.error} />
        </label>

        <button type="submit" className={s.button}>
          <svg className={s.icon} height="28" width="28">
            <use href={`${sprite}#icon-plus`} />
          </svg>
          <span className={s.text}>Edit</span>
        </button>
      </Form>
    </Formik>
  );
};

export default EditColumn;
