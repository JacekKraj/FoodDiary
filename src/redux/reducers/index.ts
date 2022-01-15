import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import diaryReducer from './diaryReducer';
import modalsReducer from './modalsReducer';

export const reducers = combineReducers({
  auth: authenticationReducer,
  diary: diaryReducer,
  modals: modalsReducer,
});

export type RootState = ReturnType<typeof reducers>;
