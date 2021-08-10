import React from 'react';
import { Formik, Form } from 'formik';

import classes from './../signUp/signUp.module.scss';
import AuthModal from './../authModal/AuthModal';
import Input from './../../UI/input/Input';
import MyFormikInput from './../../../utils/myFormikInput/MyFormikInput';
import Button from './../../UI/button/Button';
import { useActions } from './../../../redux/hooks/useActions';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';
import Error from './../../UI/error/Error';

interface Props {
  handleShowSignIn: () => void;
}

export interface FormValues {
  email: string;
  password: string;
}

const SignIn: React.FC<Props> = ({ handleShowSignIn }) => {
  const { error } = useTypedSelector((state) => state.auth);
  const { unsetError, authenticate } = useActions();

  const handleSubmit = (formValues: FormValues) => {
    authenticate(formValues.email, formValues.password);
  };

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  return (
    <AuthModal
      onClick={() => {
        handleShowSignIn();
        unsetError();
      }}
    >
      <h3 className={classes.header} data-test='component-sign-in'>
        Sign In
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit({ ...values });
        }}
      >
        {() => {
          return (
            <Form className={classes.form}>
              <div className={classes.inputsContainer}>
                <MyFormikInput name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput name='password' type='password' placeholder='Password' as={Input} />
                {error && <Error errorMessage={error} />}
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
