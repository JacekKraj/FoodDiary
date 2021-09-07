import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../../../../utils/tests/testHelperFunction';
import AddProduct from './AddProduct';

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <AddProduct />
    </Provider>
  );
};

describe('<AddProduct />', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('typing in add product browser', () => {
    let addProductBrowser: ReactWrapper;
    let clearBrowserIcon: ReactWrapper;

    beforeEach(() => {
      addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
      addProductBrowser.simulate('change', { target: { value: 'app' } });
      clearBrowserIcon = findByTestAttr(wrapper, 'clear-browser-icon-visible');
    });

    describe('clear browser icon', () => {
      it('shows clear browser icon when browser has some text content', () => {
        expect(clearBrowserIcon.exists()).toBe(true);
      });

      it('clears input after clicking icon', () => {
        clearBrowserIcon.first().simulate('click');
        addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
        expect(addProductBrowser.prop('value')).toBe('');
      });
    });

    describe('browser focus', () => {
      beforeEach(() => {
        const addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
        addProductBrowser.simulate('focus');
      });
      it('changes add product browser style on being focused', () => {
        const addProductBrowserContainer = findByTestAttr(wrapper, 'add-product-browser-container');
        expect(addProductBrowserContainer.hasClass('focused')).toBe(true);
      });
      it('still has a focus after clicking submit button', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click');
        const addProductBrowserContainer = findByTestAttr(wrapper, 'add-product-browser-container');
        expect(addProductBrowserContainer.hasClass('focused')).toBe(true);
      });
    });
  });
});
