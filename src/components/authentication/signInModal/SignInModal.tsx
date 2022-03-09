import React from 'react';
import { Formik, Form } from 'formik';

import classes from './../signUpModal/signUpModal.module.scss';
import AuthModal from '../authModal/AuthModal';
import Input from '../../UI/input/Input';
import MyFormikInput from '../../../utils/myFormikInput/MyFormikInput';
import Button from '../../UI/button/Button';
import { useActions } from '../../../redux/hooks/useActions';
import { useTypedSelector } from '../../../redux/hooks/useTypedSelector';
import Error from '../../UI/error/Error';

export interface FormValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { error } = useTypedSelector((state) => state.auth);
  const { authenticate } = useActions();

  const submitForm = (formValues: FormValues) => {
    authenticate(formValues.email, formValues.password);
  };

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  return (
    <AuthModal>
      <h3 className={classes.header} data-test='component-sign-in'>
        Sign In
      </h3>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {() => {
          return (
            <Form className={classes.form}>
              <div className={classes.inputsContainer}>
                <MyFormikInput className={classes.inputAdditional} name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='password' type='password' placeholder='Password' as={Input} />
                {error && <Error message={error} />}
              </div>
              <Button className={classes.buttonAdditional}>Log in</Button>
            </Form>
          );
        }}
      </Formik>
    </AuthModal>
  );
};

export default SignIn;
