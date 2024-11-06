import { Field, Form, Formik } from "formik";
import s from "./TaskForm.module.css"


const TaskForm = ({ initialTaskValue, typeOfPopUp }) => {
    
    const handleSubmit = (values) => {
        console.log(values);
    }

    return (
        <div className={s.taskModal}>  
            <h3 className={s.titleModal}>{typeOfPopUp} Card</h3>
            <Formik initialValues={initialTaskValue} onSubmit={handleSubmit}>
                <Form>
                    <Field className={s.fieldTitle} type="text" name="title"/>
                    <Field className={s.fieldDesc} type="text" as="textarea" name="description" />
                    <div className={s.priorityCont}>
                        <label>Priority</label>
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
                    <button type="submit">{typeOfPopUp}</button>
                </Form>
            </Formik>
        </div>
    );
}
 
export default TaskForm;