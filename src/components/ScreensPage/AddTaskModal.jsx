import React from 'react';
import { Formik, Field, Form } from 'formik';

const AddTaskModal = ({ onClose }) => {
  return (
    <div>
      <h2>Add Task</h2>
      <Formik
        initialValues={{ title: '', description: '' }}
        onSubmit={(values) => {
          
          onClose();
        }}
      >
        <Form>
          <Field name="title" placeholder="Task Title" />
          <Field name="description" placeholder="Task Description" />
          <button type="submit">Add</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTaskModal;
