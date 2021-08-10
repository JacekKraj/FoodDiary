import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';

export const reducers = combineReducers({
  auth: authenticationReducer,
});

export type RootState = ReturnType<typeof reducers>;
