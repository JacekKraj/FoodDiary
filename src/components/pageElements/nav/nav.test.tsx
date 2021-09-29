import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Nav from './Nav';
import { findByTestAttr, storeFactory } from '../../../utils/tests/testHelperFunction';

interface InitialState {
  auth: {
    isAuthenticated: boolean;
  };
}

const setup = (initialState: InitialState) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Nav handleShowSignIn={jest.fn()} />
      </BrowserRouter>
    </Provider>
  );
};

describe('user unauthenticated', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup({ auth: { isAuthenticated: false } });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('has 0 nav items available', () => {
    const navItems = findByTestAttr(wrapper, 'component-nav-item');
    expect(navItems.length).toBe(0);
  });
  it('has sign in button', () => {
    const button = findByTestAttr(wrapper, 'authentication-button').first();
    expect(button.text()).toEqual('Sign in');
  });
});

describe('user authenticated', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup({ auth: { isAuthenticated: true } });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('has only all available nav items ', () => {
    const navItems = findByTestAttr(wrapper, 'component-nav-item');
    expect(navItems.length).toBe(6);
  });
  it('has sign out button', () => {
    const button = findByTestAttr(wrapper, 'authentication-button').first();
    expect(button.text()).toEqual('Sign out');
  });
});
