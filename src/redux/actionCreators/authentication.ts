import { Dispatch } from 'redux';

import { fire } from '../../fireConfig';
import { Action } from './../actions/authentication';
import { ActionTypes } from './../actionTypes/actionTypes';
import { successToast } from '../../utils/toasts/toasts';

export const signOut = (): Action => {
  fire.auth().signOut();

  return {
    type: ActionTypes.SING_OUT,
  };
};

export const authenticationStart = (): Action => {
  return {
    type: ActionTypes.AUTHENTICATION_START,
  };
};

export const authenticationEnd = (userEmail: string): Action => {
  return {
    type: ActionTypes.AUTHENTICATION_END,
    userEmail,
  };
};

export const authenticationFail = (error: string): Action => {
  return {
    type: ActionTypes.AUTHENTICATION_FAIL,
    error: error,
  };
};

export const authenticate = (emailAddress: string, password: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(authenticationStart());
    fire
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        if (!fire.auth().currentUser?.emailVerified) {
          dispatch(authenticationFail("This email address hasn't been verified yet."));
        }
      })
      .catch((error) => {
        dispatch(authenticationFail(error.message));
      });
  };
};

export const registerStart = (): Action => {
  return {
    type: ActionTypes.REGISTER_START,
  };
};

const registerEnd = (): Action => {
  return {
    type: ActionTypes.REGISTER_END,
  };
};

export const registerFail = (error: string): any => {
  return {
    type: ActionTypes.REGISTER_FAIL,
    error,
  };
};

export const register = (emailAddress: string, password: string, hideModal: () => void) => {
  return (dispatch: any) => {
    dispatch(registerStart());
    fire
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        fire
          .auth()
          .currentUser?.sendEmailVerification()
          .then(() => {
            const message = 'Your account has been created. Please verify your email to sign in.';
            successToast(message);
            hideModal();
            dispatch(registerEnd());
          });
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
      });
  };
};

export const unsetError = () => {
  return {
    type: ActionTypes.UNSET_ERROR,
  };
};
