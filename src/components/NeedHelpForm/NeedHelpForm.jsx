import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NeedHelpForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email should contain only one "@" and at least one "." in the domain part'
    )
    .required('Email is required'),
  comment: Yup.string()
    .trim()
    .required('Comment is required')
    .min(6, 'Comment must be at least 6 characters'),
});

const NeedHelpForm = () => {
  const initialValues = {
    email: '',
    comment: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css['form-container']}>
      <h2 className={css.title}>Need help</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <Field
            type="email"
            name="email"
            placeholder="Email address"
            className={css.input}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            rows="6"
            className={`${css.input} ${css.comment}`}
          />
          <ErrorMessage name="comment" component="span" className={css.error} />
          <button type="submit" className={css['form-button']}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default NeedHelpForm;
