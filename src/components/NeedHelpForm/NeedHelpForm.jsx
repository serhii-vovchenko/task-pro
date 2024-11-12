import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './NeedHelpForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { submitNeedHelpThunk } from '../../redux/dashboard/need-help-form/operations';
import { selectNeedHelpLoading } from '../../redux/dashboard/need-help-form/selectors';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader.jsx';


const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format')
    .required('Email is required'),
  comment: Yup.string()
    .trim()
    .required('Comment is required')
    .min(2, 'Comment must be at least 2 characters')
    .max(300, 'Comment cannot exceed 300 characters'),
});

const NeedHelpForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectNeedHelpLoading);

  const initialValues = {
    email: '',
    comment: '',
  };

  const handleSubmit = async (values, actions) => {

    const { comment, ...restValues } = values;
    const modifiedValues = {
      ...restValues,
      userMessage: values.comment,
    }

    await dispatch(submitNeedHelpThunk(modifiedValues)).then(() => {
      toast.success('Form submitted successfully!');
    })
      .catch(() => {
        toast.error('Something went wrong. Please try again.');
      });
    actions.resetForm();
    onClose();
  };

  return (<> {isLoading && <Loader width="100" height="100" color='var(--loader-color)' />}
    <div className={s['form-container']}>
      <h2 className={s.title}>Need help</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <Field
            type="email"
            name="email"
            placeholder="Email address"
            className={s.input}
          />
          <ErrorMessage name="email" component="span" className={s.error} />
          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            rows="6"
            className={`${s.input} ${s.comment}`}
          />
          <ErrorMessage name="comment" component="span" className={s.error} />
          <button type="submit" className={s['form-button']} disabled={isLoading}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  </>
  );
};

export default NeedHelpForm;
