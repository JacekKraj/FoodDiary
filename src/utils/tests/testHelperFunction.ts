import { ReactWrapper } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '../../redux/reducers/index';

export const findByTestAttr = (wrapper: ReactWrapper, val: string) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const storeFactory = (initialState = {}) => {
  return createStore(reducers, initialState, applyMiddleware(thunk));
};

export const formikFindByInputName = (wrapper: ReactWrapper, name: string) => {
  return wrapper.find(`input[name='${name}']`);
};
