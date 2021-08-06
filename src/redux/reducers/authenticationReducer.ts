import { Action } from '../actions/authentication';
import { ActionTypes } from '../actionTypes/actionTypes';

interface InitialState {
  isLoading: boolean;
  error: string;
  isAuthenticated: boolean;
}

const initialState = {
  isLoading: false,
  error: '',
  isAuthenticated: false,
};

const authenticationReducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_START:
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    case ActionTypes.AUTHENTICATION_END:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case ActionTypes.AUTHENTICATION_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case ActionTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case ActionTypes.REGISTER_END:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case ActionTypes.SING_OUT:
      return {
        ...state,
        error: '',
        isAuthenticated: false,
      };
    case ActionTypes.UNSET_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default authenticationReducer;
