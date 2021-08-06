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

interface FormValues {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC<Props> = ({ handleShowSignUp }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const { register, unsetError } = useActions();
  const { error } = useTypedSelector((state) => state.auth);

  const handleSubmit = (formValues: FormValues) => {
    if (formValues.email === formValues.repeatEmail) {
      if (formValues.password === formValues.repeatPassword) {
        register(formValues.email, formValues.password, handleShowSignUp);
      } else {
        setErrorMessage('Both passwords must be indentical.');
      }
    } else {
      setErrorMessage('Both emails must be indentical.');
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
      <h3 className={classes.header}>Sign Up</h3>
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
                <MyFormikInput name='repeatEmail' type='email' placeholder='Repeat email address' as={Input} />
                <MyFormikInput name='password' type='password' placeholder='Password' as={Input} />
                <MyFormikInput name='repeatPassword' type='password' placeholder='Repeat password' as={Input} />
                {(error || errorMessage) && <Error errorMessage={error || errorMessage} />}
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
