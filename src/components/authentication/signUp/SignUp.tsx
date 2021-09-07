import React from 'react';
import { Formik, Form } from 'formik';

import classes from './signUp.module.scss';
import AuthModal from './../authModal/AuthModal';
import Input from './../../UI/input/Input';
import MyFormikInput from './../../../utils/myFormikInput/MyFormikInput';
import Button from './../../UI/button/Button';
import { useActions } from './../../../redux/hooks/useActions';
import Error from './../../UI/error/Error';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';

interface Props {
  handleShowSignUp: () => void;
}

export interface FormValues {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
}

export const SignUp: React.FC<Props> = ({ handleShowSignUp }) => {
  const { unsetError, register, registerFail } = useActions();
  const { error } = useTypedSelector((state) => state.auth);

  const handleSubmit = (formValues: FormValues) => {
    if (formValues.email === formValues.repeatEmail) {
      if (formValues.password === formValues.repeatPassword) {
        register(formValues.email, formValues.password, handleShowSignUp);
      } else {
        registerFail('Both passwords must be indentical');
      }
    } else {
      registerFail('Both emails must be indentical');
    }
  };

  const initialValues: FormValues = {
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
  };
  return (
    <AuthModal
      onClick={() => {
        handleShowSignUp();
        unsetError();
      }}
    >
      <h3 className={classes.header} data-test='component-sign-up'>
        Sign Up
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit({ ...values });
        }}
      >
        {() => {
          return (
            <Form className={classes.form} data-test='sign-up-form'>
              <div className={classes.inputsContainer}>
                <MyFormikInput className={classes.inputAdditional} name='email' type='email' placeholder='Email address' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='repeatEmail' type='email' placeholder='Repeat email address' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='password' type='password' placeholder='Password' as={Input} />
                <MyFormikInput className={classes.inputAdditional} name='repeatPassword' type='password' placeholder='Repeat password' as={Input} />
                {error && <Error errorMessage={error} />}
              </div>
              <Button className={classes.buttonAdditional} typeLight dataTest='submit-button'>
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
