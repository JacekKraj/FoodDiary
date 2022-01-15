import React from 'react';
import { makeStyles } from '@material-ui/core';

import Nav from './../pageElements/nav/Nav';
import classes from './authentication.module.scss';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { breakpoints } from '../../utils/breakpoints/breakpoints';
import Button from '../UI/button/Button';
import UsageInstructionStep from './usageInstructionStep/UsageInstructionStep';
import { useActions } from '../../redux/hooks/useActions';
import { MODAL_TYPES } from './../../modalMenager/ModalMenager';

const { mobileVertical, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    [mobileVertical]: {
      color: '#888',
      width: 95,
      height: 95,
    },
    [laptopSm]: {
      width: 105,
      height: 105,
    },
  },
}));

const Authentication: React.FC = () => {
  const { showModal } = useActions();

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
      text: 'We compare your skin condition with food you eat and find out what factors may affect your skin badly.',
    };
  }, []);

  const handleShowSignUp = () => {
    showModal(MODAL_TYPES.SIGN_UP);
  };

  const handleShowSignIn = () => {
    showModal(MODAL_TYPES.SIGN_IN);
  };

  return (
    <React.Fragment>
      <div className={classes.authentication}>
        <Nav />
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
              <Button className={classes.buttonAdditional} isTypeLight onClick={handleShowSignUp} dataTest='sign-up-button'>
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
