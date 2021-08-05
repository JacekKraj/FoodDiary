import React from 'react';
import { Formik, Form } from 'formik';

import classes from './signUp.module.scss';
import AuthModal from './../authModal/AuthModal';
import Input from './../../UI/input/Input';
import MyFormikInput from './../../../utils/myFormikInput/MyFormikInput';
import Button from './../../UI/button/Button';

interface Props {
  handleShowSignUp: () => void;
}

interface FormValues {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC<Props> = ({ handleShowSignUp }) => {
  const initialValues: FormValues = {
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
  };
  return (
    <AuthModal onClick={handleShowSignUp}>
      <h3 className={classes.header}>Sign Up</h3>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => {
          return (
            <Form className={classes.form}>
              <div className={classes.inputsContainer}>
                <MyFormikInput name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput name='emailRepeat' type='email' placeholder='Repeat email address' as={Input} />
                <MyFormikInput name='password' type='email' placeholder='Password' as={Input} />
                <MyFormikInput name='passwordRepeat' type='email' placeholder='Repeat password' as={Input} />
              </div>
              <Button className={classes.buttonAdditional} typeLight>
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
