import { Field, Form, Formik } from "formik";
import DatePickerField from "../DatePickerField/DatePickerField";
import s from "./TaskForm.module.css"


const TaskForm = ({ initialTaskValue, typeOfPopUp }) => {
    
    const handleSubmit = (values) => {
        const formData = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            deadline: values.deadline.toString()
        }


        console.log(formData);
        console.log(new Date());
    }

    return (
        <div className={s.taskModal}>  
            <h3 className={s.titleModal}>{typeOfPopUp} Card</h3>
            <Formik initialValues={initialTaskValue} onSubmit={handleSubmit}>
                <Form>
                    <Field className={s.fieldTitle} type="text" name="title"/>
                    <Field className={s.fieldDesc} type="text" as="textarea" name="description" />
                    <div className={s.priorityCont}>
                        <label className={s.labelTitle}>Label color</label>
                        <ul>
                            <li>
                                <Field type="radio" name="priority" value="low"/>
                                <label className={s.radioLabel} htmlFor="" style={{ '--customColor': 'rgba(143, 161, 208, 1)' }}></label>
                            </li>
                            <li>
                                <Field type="radio" name="priority" value="medium"/>
                                <label className={s.radioLabel} htmlFor="" style={{ '--customColor': 'rgba(224, 156, 181, 1)' }}></label>
                            </li>
                            <li>
                                <Field type="radio" name="priority" value="high" />
                                <label className={s.radioLabel} htmlFor="" style={{ '--customColor': 'rgba(190, 219, 176, 1)' }}></label>
                            </li>
                            <li>
                                <Field type="radio" name="priority" value="none"/>
                                <label className={s.radioLabel} htmlFor="" style={{ '--customColor': 'rgba(22, 22, 22, 0.3)' }}></label>
                            </li>
                        </ul>
                    </div>
                    <div className={s.dateCont}>
                        <label className={s.labelTitle} htmlFor="">Deadline</label>
                        <Field name="deadline" component={DatePickerField} minDate={new Date()} />
                    </div>
                    <button type="submit">{typeOfPopUp}</button>
                </Form>
            </Formik>
        </div>
    );
}
 
export default TaskForm;