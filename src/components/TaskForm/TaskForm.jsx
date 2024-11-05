import { Field, Form, Formik } from "formik";
import s from "./TaskForm.module.css"

const radioValue = ['low', 'medium', 'high', 'none']


const TaskForm = ({initialTaskValue, typeOfPopUp}) => {
    return (
        <div className={s.taskModal}>  
            <h3 className={s.titleModal}>{typeOfPopUp} Card</h3>
            <Formik initialValues={initialTaskValue}>
                <Form>
                    <Field className={s.fieldTitle} type="text" name="title"/>
                    <Field className={s.fieldDesc} type="text" as="textarea" name="description" />
                    <div className={s.priorityCont}>
                        <label>Priority</label>
                        <ul>
                            <li><input type="radio" name="priority" value="low"/></li>
                            <li><input type="radio" name="priority" value="medium"/></li>
                            <li><input type="radio" name="priority" value="high"/></li>
                            <li><input type="radio" name="priority" value="none"/></li>
                        </ul>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    );
}
 
export default TaskForm;