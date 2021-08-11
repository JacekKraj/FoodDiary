import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory, findByTestAttr } from '../../utils/tests/testHelperFunction';
import Authentication from './Authentication';

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
    </Provider>
  );
};

describe('shows auth modals on clicking buttons and hide on clicking backdrop', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  afterEach(() => {
    wrapper.unmount();
  });

  const checkShowModal = (type: string) => {
    const button = findByTestAttr(wrapper, `sign-${type}-button`);
    button.simulate('click');
    return findByTestAttr(wrapper, `component-sign-${type}`);
  };
  const checkHideModal = (type: string) => {
    const backdrop = findByTestAttr(wrapper, 'component-backdrop');
    backdrop.simulate('click');
    wrapper.setProps({});
    return findByTestAttr(wrapper, `component-sign-${type}`);
  };
  it('shows and hides sign in modal', () => {
    let signInModal = checkShowModal('in');
    expect(signInModal.exists()).toBe(true);
    signInModal = checkHideModal('in');
    expect(signInModal.exists()).toBe(false);
  });
  it('shows and hides sign up modal', () => {
    let signUpModal = checkShowModal('up');
    expect(signUpModal.exists()).toBe(true);
    signUpModal = checkHideModal('up');
    expect(signUpModal.exists()).toBe(false);
  });
});
