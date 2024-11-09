import { ErrorMessage, Field, Form, Formik } from 'formik';
import { format, isToday } from 'date-fns';
import * as Yup from 'yup';
import DatePickerField from '../DatePickerField/DatePickerField';
import sprite from '../../img/icons.svg';
import s from './TaskForm.module.css';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../redux/dashboard/tasks/operations';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().required('Priority is required'),
  deadline: Yup.date().nullable().required('Deadline is required'),
});

const TaskForm = ({ columnId, handleClose, initialTaskValue, typeOfPopUp }) => {
  const dispatch = useDispatch();
  const taskId = initialTaskValue?._id;
  const handleSubmit = values => {
    const formData = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      deadline: format(values.deadline, 'yyyy-MM-dd'),
    };
    if (typeOfPopUp === 'Edit') {
      dispatch(updateTask({ taskId: taskId, values: formData }));
    } else {
      formData.columnId = columnId;
      dispatch(createTask(formData));
    }
    handleClose();
  };

  const formatDeadline = date => {
    return isToday(date)
      ? `Today, ${format(date, 'MMMM d')}`
      : format(date, 'MMMM d');
  };

  return (
    <div className={s.taskModal}>
      <h3 className={s.titleModal}>{typeOfPopUp} Card</h3>
      <Formik
        initialValues={initialTaskValue}
        onSubmit={handleSubmit}
        validationSchema={typeOfPopUp === 'Add' ? validationSchema : null}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={s.fieldCont}>
              <Field className={s.fieldTitle} type="text" name="title" />
              {typeOfPopUp === 'Add' && (
                <ErrorMessage
                  name="title"
                  component="span"
                  className={s.errorMsg}
                />
              )}
            </div>
            <div className={s.textFieldCont}>
              <Field
                className={s.fieldDesc}
                type="text"
                as="textarea"
                name="description"
              />
              {typeOfPopUp === 'Add' && (
                <ErrorMessage
                  name="description"
                  component="span"
                  className={s.errorMsg}
                />
              )}
            </div>
            <div className={s.priorityCont}>
              <label className={s.labelTitle}>Label color</label>
              <ul>
                <li>
                  <Field type="radio" name="priority" value="low" />
                  <label
                    className={s.radioLabel}
                    htmlFor=""
                    style={{ '--customColor': 'rgba(143, 161, 208, 1)' }}
                  ></label>
                </li>
                <li>
                  <Field type="radio" name="priority" value="medium" />
                  <label
                    className={s.radioLabel}
                    htmlFor=""
                    style={{ '--customColor': 'rgba(224, 156, 181, 1)' }}
                  ></label>
                </li>
                <li>
                  <Field type="radio" name="priority" value="high" />
                  <label
                    className={s.radioLabel}
                    htmlFor=""
                    style={{ '--customColor': 'rgba(190, 219, 176, 1)' }}
                  ></label>
                </li>
                <li>
                  <Field type="radio" name="priority" value="none" />
                  <label
                    className={s.radioLabel}
                    htmlFor=""
                    style={{ '--customColor': 'rgba(22, 22, 22, 0.3)' }}
                  ></label>
                </li>
              </ul>
              {typeOfPopUp === 'Add' && (
                <ErrorMessage
                  name="priority"
                  component="span"
                  className={s.errorMsg}
                />
              )}
            </div>
            <div className={s.dateCont}>
              <label className={s.labelTitle} htmlFor="">
                Deadline
              </label>
              <Field
                name="deadline"
                value={
                  values.deadline
                    ? formatDeadline(values.deadline)
                    : 'No date selected'
                }
                component={DatePickerField}
                minDate={new Date()}
              />
              {typeOfPopUp === 'Add' && (
                <ErrorMessage
                  name="deadline"
                  component="span"
                  className={s.errorMsg}
                />
              )}
            </div>
            <button className={s.btnSubmit} type="submit">
              <span>
                <svg height="14px" width="14px">
                  <use href={`${sprite}#icon-plus`} />
                </svg>
              </span>
              {typeOfPopUp}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
