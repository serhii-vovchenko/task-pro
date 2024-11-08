import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn } from '../../redux/dashboard/columns/operations';
import sprite from '../../img/icons.svg';
import s from './AddColumn.module.css';
import { selectorBoardId } from '../../redux/dashboard/currentBoard/selectors';

const columnSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(70, 'Too Long!')
    .required('This field is required!'),
});

const AddColumn = ({ closeModal }) => {
  const dispatch = useDispatch();
  const boardId = useSelector(selectorBoardId);

  const initialValues = {
    title: '',
    boardId,
  };

  const handleSubmit = (values, actions) => {
    const newColumn = {
      title: values.title,
      boardId,
      // boardId: '672cb51fff390c38170298a7',
    };
    dispatch(addColumn(newColumn));
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
          <p className={s.title}>Add Column</p>
          <Field
            className={s.input}
            type="text"
            name="title"
            placeholder="Title"
          ></Field>
          <ErrorMessage name="title" component="p" className={s.error} />
        </label>

        <button type="submit" className={s.button}>
          <svg className={s.icon} height="28" width="28">
            <use href={`${sprite}#icon-plus`} />
          </svg>
          <span className={s.text}>Add</span>
        </button>
      </Form>
    </Formik>
  );
};

export default AddColumn;
