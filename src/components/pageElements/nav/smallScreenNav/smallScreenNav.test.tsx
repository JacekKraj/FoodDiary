import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SmallScreenNav from './SmallScreenNav';
import { findByTestAttr, storeFactory } from '../../../../utils/tests/testHelperFunction';

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <SmallScreenNav handleShowSignIn={jest.fn()} />
      </BrowserRouter>
    </Provider>
  );
};

describe('<SmallScreenNav />', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
    findByTestAttr(wrapper, 'menu-button').first().simulate('click');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  const findNavElements = () => {
    const backdrop = findByTestAttr(wrapper, 'component-backdrop');
    const smallScreenNav = findByTestAttr(wrapper, 'component-small-screen-nav');
    return { backdrop, smallScreenNav };
  };
  it('shows nav and backdrop on clicking menu button', () => {
    const { backdrop, smallScreenNav } = findNavElements();
    expect(backdrop.exists()).toBe(true);
    expect(smallScreenNav.hasClass('active')).toBe(true);
  });

  it('hides nav and backdrop on clicking backdrop', () => {
    let { backdrop } = findNavElements();
    backdrop.simulate('click');
    backdrop = findByTestAttr(wrapper, 'component-backdrop');
    const smallScreenNav = findByTestAttr(wrapper, 'component-small-screen-nav');
    expect(backdrop.exists()).toBe(false);
    expect(smallScreenNav.hasClass('active')).toBe(false);
  });

  it('hides nav and backdrop on clicking close icon', () => {
    const closeIcon = findByTestAttr(wrapper, 'close-icon').first();
    closeIcon.simulate('click');
    const { backdrop, smallScreenNav } = findNavElements();
    expect(backdrop.exists()).toBe(false);
    expect(smallScreenNav.hasClass('active')).toBe(false);
  });
});
