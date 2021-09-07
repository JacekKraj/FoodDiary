import { ActionTypes } from './../actionTypes/actionTypes';
interface AuthenticationStart {
  type: ActionTypes.AUTHENTICATION_START;
}

interface AuthenticationEnd {
  type: ActionTypes.AUTHENTICATION_END;
  userEmail: string;
}

interface AuthenticationFail {
  type: ActionTypes.AUTHENTICATION_FAIL;
  error: string;
}

interface RegisterStart {
  type: ActionTypes.REGISTER_START;
}

interface RegisterEnd {
  type: ActionTypes.REGISTER_END;
}

interface RegisterFail {
  type: ActionTypes.REGISTER_FAIL;
  error: string;
}

interface SignOut {
  type: ActionTypes.SING_OUT;
}

interface unsetError {
  type: ActionTypes.UNSET_ERROR;
}

export type Action = AuthenticationStart | AuthenticationEnd | AuthenticationFail | RegisterStart | RegisterEnd | RegisterFail | SignOut | unsetError;
