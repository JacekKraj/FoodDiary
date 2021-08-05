import React from 'react';
import { Formik, Form } from 'formik';

import classes from './../signUp/signUp.module.scss';
import AuthModal from './../authModal/AuthModal';
import Input from './../../UI/input/Input';
import MyFormikInput from './../../../utils/myFormikInput/MyFormikInput';
import Button from './../../UI/button/Button';

interface Props {
  handleShowSignIn: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const SignIn: React.FC<Props> = ({ handleShowSignIn }) => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  return (
    <AuthModal onClick={handleShowSignIn}>
      <h3 className={classes.header}>Sign In</h3>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => {
          return (
            <Form className={classes.form}>
              <div className={classes.inputsContainer}>
                <MyFormikInput name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput name='password' type='email' placeholder='Password' as={Input} />
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
