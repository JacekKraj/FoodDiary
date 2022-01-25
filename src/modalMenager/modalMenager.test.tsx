import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import { storeFactory, findByTestAttr } from '../utils/tests/testHelperFunction';
import App from './../App';

const setup = () => {
  const initialState = {
    auth: {
      isAuthenticated: false,
      isLoading: false,
      userEmail: 'jacekkrajewski12wppl',
    },
    diary: {
      dangerousProducts: [],
    },
    modals: {
      modalType: '',
      props: {},
    },
  };

  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe('<ModalMenager />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  const showModalAndCheckBackdrop = (modalType: string) => {
    const button = findByTestAttr(wrapper, `${modalType}-button`);
    button.simulate('click');
    wrapper.setProps({});

    const backdrop = findByTestAttr(wrapper, 'component-backdrop');
    expect(backdrop.exists()).toBe(true);
  };

  it('shows and hides SignIn modal', () => {
    showModalAndCheckBackdrop('sign-in');

    const signInModal = findByTestAttr(wrapper, `component-sign-in`);
    expect(signInModal.exists()).toBe(true);
  });

  it('shows and hides SignUp modal', () => {
    showModalAndCheckBackdrop('sign-up');

    const signUnModal = findByTestAttr(wrapper, `component-sign-up`);
    expect(signUnModal.exists()).toBe(true);
  });
});
