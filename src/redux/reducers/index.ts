import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import diaryReducer from './diaryReducer';

export const reducers = combineReducers({
  auth: authenticationReducer,
  diary: diaryReducer,
});

export type RootState = ReturnType<typeof reducers>;
