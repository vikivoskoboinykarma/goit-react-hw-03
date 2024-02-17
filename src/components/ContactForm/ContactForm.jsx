import { useId } from 'react';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

// Визначення схеми валідації за допомогою Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
  .min(3, 'Too short, at least 3 characters')
  .max(50, 'Too long')
  .required('Required'),
number: Yup.string()
  .min(3, 'Too short, at least 3 characters')
  .max(50, 'Too long')
  .required('Required'),
});

export const ContactForm = ({ addUser }) => {
  const nameId = useId();
  const numberId = useId();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addUser({ id: nanoid(), ...values });
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.wrap}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} className={css.input} />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>
        <div className={css.wrap}>
          <label htmlFor={numberId}>Number</label>
          <Field type="text" name="number" id={numberId} className={css.input} />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>
        <div className={css.wrapper}>
          <button type="submit" className={css.button}>
          Add Contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};
