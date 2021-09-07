export enum ActionTypes {
  // authentication
  REGISTER_START = 'REGISTER_START',
  REGISTER_END = 'REGISTER_END',
  REGISTER_FAIL = 'REGISTER_FAIL',
  AUTHENTICATION_START = 'AUTHENTICATION_START',
  AUTHENTICATION_END = 'AUTHENTICATION_END',
  AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL',
  SING_OUT = 'SING_OUT',
  UNSET_ERROR = 'UNSET_ERROR',
  // diary
  CHANGE_DATE = 'CHANGE_DATE',
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  SET_SKIN = 'SET_SKIN',
  SAVE_DIARY = 'SAVE_DIARY',
  CLEAR_DIARY = 'CLEAR_DIARY',
  SET_DIARY = 'SET_DIARY',
}
