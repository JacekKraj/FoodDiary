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
    error,
  };
};

export const authenticate = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(authenticationStart());

    try {
      await fire.auth().signInWithEmailAndPassword(email, password);

      if (!fire.auth().currentUser?.emailVerified) {
        dispatch(authenticationFail("This email address hasn't been verified yet."));
      }
    } catch (error) {
      let message = 'Unknown error.';

      if (error instanceof Error) {
        message = error.message;
      }

      dispatch(authenticationFail(message));
    }
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

export const register = (data: { email: string; password: string }, hideModal: () => void) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(registerStart());

    try {
      await fire.auth().createUserWithEmailAndPassword(data.email, data.password);

      await fire.auth().currentUser?.sendEmailVerification();

      successToast('Your account has been created. Please verify your email to sign in.');
      hideModal();
      dispatch(registerEnd());
    } catch (error) {
      let message = 'Unknown error.';

      if (error instanceof Error) {
        message = error.message;
      }

      dispatch(authenticationFail(message));
    }
  };
};

export const unsetError = () => {
  return {
    type: ActionTypes.UNSET_ERROR,
  };
};
