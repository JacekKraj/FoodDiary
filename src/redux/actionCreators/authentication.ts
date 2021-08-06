import { Dispatch } from 'redux';

import { fire } from '../../fireConfig';
import { Action } from './../actions/authentication';
import { ActionTypes } from './../actionTypes/actionTypes';

export const signOut = (): Action => {
  fire.auth().signOut();

  return {
    type: ActionTypes.SING_OUT,
  };
};

const authenticationStart = (): Action => {
  return {
    type: ActionTypes.AUTHENTICATION_START,
  };
};

export const authenticationEnd = (): Action => {
  return {
    type: ActionTypes.AUTHENTICATION_END,
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
        if (fire.auth().currentUser?.emailVerified) {
          // dispatch(authenticationEnd());
        }
      })
      .catch((error) => {
        dispatch(authenticationFail(error.message));
      });
  };
};

const registerStart = (): Action => {
  return {
    type: ActionTypes.REGISTER_START,
  };
};

const registerEnd = (): Action => {
  return {
    type: ActionTypes.REGISTER_END,
  };
};

const registerFail = (error: string): any => {
  return {
    type: ActionTypes.REGISTER_FAIL,
    error,
  };
};

export const register = (emailAddress: string, password: string) => {
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
