import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import AuthModal from './AuthModal';
import { storeFactory, findByTestAttr } from '../../../utils/tests/testHelperFunction';
import SignUp from './../signUp/SignUp';
import SignIn from './../signIn/SignIn';
import * as actionCreators from './../../../redux/actionCreators/index';

interface InitialState {
  auth?: {
    error?: string;
  };
}

let store: any;
const setup = (initialState: InitialState = {}, isSignIn: boolean) => {
  store = storeFactory(initialState);

  const children = isSignIn ? <SignIn handleShowSignIn={jest.fn()} /> : <SignUp handleShowSignUp={jest.fn()} />;

  const props = {
    onClick: () => {},
    children: children,
  };
  return mount(
    <Provider store={store}>
      <AuthModal {...props}>{children}</AuthModal>
    </Provider>
  );
};

describe('shows spinner after dispatching registerStart', () => {
  const dispatchAction = (isSignIn: boolean) => {
    const wrapper = setup({}, isSignIn);
    store.dispatch(isSignIn ? actionCreators.authenticationStart() : actionCreators.registerStart());
    wrapper.setProps({});
    return findByTestAttr(wrapper, 'component-spinner');
  };
  it('shows spinner when <SignUp /> is rendered ', () => {
    const spinner = dispatchAction(false);
    expect(spinner.exists()).toBe(true);
  });
  it('shows spinner when <SignIn /> is rendered ', () => {
    const spinner = dispatchAction(true);
    expect(spinner.exists()).toBe(true);
  });
});

describe('shows error after dispatching register/authentication error', () => {
  const dispatchAction = (isSignIn: boolean) => {
    const wrapper = setup({}, isSignIn);
    const errorMessage = 'test error';
    store.dispatch(isSignIn ? actionCreators.authenticationFail(errorMessage) : actionCreators.registerFail(errorMessage));
    wrapper.setProps({});
    return findByTestAttr(wrapper, 'component-error');
  };
  it('shows spinner when <SignUp /> is rendered ', () => {
    const error = dispatchAction(false);
    expect(error.text()).toBe('test error');
  });
  it('shows spinner when <SignIn /> is rendered ', () => {
    const error = dispatchAction(true);
    expect(error.text()).toBe('test error');
  });
});
