import React from 'react';
import { Formik, Form } from 'formik';

import classes from './signUpModal.module.scss';
import AuthModal from '../authModal/AuthModal';
import Input from '../../UI/input/Input';
import MyFormikInput from '../../../utils/myFormikInput/MyFormikInput';
import Button from '../../UI/button/Button';
import { useActions } from '../../../redux/hooks/useActions';
import Error from '../../UI/error/Error';
import { useTypedSelector } from '../../../redux/hooks/useTypedSelector';

export interface FormValues {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
}

export const SignUp: React.FC = () => {
  const { register, registerFail, hideModal } = useActions();
  const { error } = useTypedSelector((state) => state.auth);

  const submitForm = (formValues: FormValues) => {
    if (formValues.email !== formValues.repeatEmail) {
      registerFail('Both emails must be indentical');
      return;
    }

    if (formValues.password !== formValues.repeatPassword) {
      registerFail('Both passwords must be indentical');
      return;
    }

    register({ email: formValues.email, password: formValues.password }, hideModal);
  };

  const initialValues: FormValues = {
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
  };
  return (
    <AuthModal>
      <h3 className={classes.header} data-test='component-sign-up'>
        Sign Up
      </h3>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {() => {
          return (
            <Form className={classes.form} data-test='sign-up-form'>
              <div className={classes.inputsContainer}>
                <MyFormikInput className={classes.inputAdditional} name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='repeatEmail' type='email' placeholder='Repeat email address' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='password' type='password' placeholder='Password' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='repeatPassword' type='password' placeholder='Repeat password' as={Input} />
                {error && <Error message={error} />}
              </div>
              <Button className={classes.buttonAdditional} isTypeLight dataTest='submit-button'>
                Create account
              </Button>
            </Form>
          );
        }}
      </Formik>
    </AuthModal>
  );
};

export default SignUp;
