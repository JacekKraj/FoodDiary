import React from 'react';
import { makeStyles } from '@material-ui/core';

import Header from '../pageElements/header/Header';
import classes from './authentication.module.scss';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { theme } from '../../utils/breakpoints';
import Button from '../UI/button/Button';
import UsageInstructionStep from './usageInstructionStep/UsageInstructionStep';
import SignUp from './signUp/SignUp';
import SignIn from './signIn/SignIn';

const useStyles = makeStyles(() => ({
  icon: {
    [theme.breakpoints.up('xs')]: {
      color: '#888',
      width: 95,
      height: 95,
    },
    [theme.breakpoints.up('lg')]: {
      width: 105,
      height: 105,
    },
  },
}));

const Authentication: React.FC = () => {
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);

  const iconStyle = useStyles();

  const stepOne = React.useMemo(() => {
    return {
      number: 1,
      title: 'Sign in with your account',
    };
  }, []);

  const stepTwo = React.useMemo(() => {
    return {
      number: 2,
      title: 'Add products',
      text: 'Add each product of your everyday meals and current skin condition to store it in our database.',
    };
  }, []);

  const stepThree = React.useMemo(() => {
    return {
      number: 3,
      title: 'Find your problem',
      text: 'Compare with our help condition of your skin with food you ate and find out what factors may cause your atopic dermatitis.',
    };
  }, []);

  const handleShowSignUp = () => {
    setShowSignUp((currVal) => !currVal);
  };

  const handleShowSignIn = () => {
    setShowSignIn((currVal) => !currVal);
  };

  return (
    <React.Fragment>
      {showSignUp && <SignUp handleShowSignUp={handleShowSignUp} />}
      {showSignIn && <SignIn handleShowSignIn={handleShowSignIn} />}
      <div className={classes.authentication}>
        <Header />
        <div className={classes.authenticationInfo}>
          <h1>Hi. Let's get Started!</h1>
          <div className={classes.authenticationMainContent}>
            <UsageInstructionStep step={stepOne}>
              <div className={classes.iconContainer}>
                <AccountCircleOutlinedIcon className={iconStyle.icon} />
              </div>
              <Button className={classes.buttonAdditional} onClick={handleShowSignIn} dataTest='sign-in-button'>
                Sign In
              </Button>
              <Button className={classes.buttonAdditional} typeLight onClick={handleShowSignUp} dataTest='sign-up-button'>
                Sign Up
              </Button>
            </UsageInstructionStep>
            <UsageInstructionStep step={stepTwo} />
            <UsageInstructionStep step={stepThree} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Authentication;
