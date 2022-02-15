import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ProductBrowser from './ProductBrowser';
import { findByTestAttr } from '../../../utils/tests/testHelperFunction';
import moxios from 'moxios';
import { storeFactory } from '../../../utils/tests/testHelperFunction';

const mockSetValue = jest.fn();

const autocompleteProps = {
  activeSuggestion: { index: 0, setIndex: jest.fn() },
  isTyping: true,
  setIsTyping: jest.fn(),
  pickItem: jest.fn(),
};

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <ProductBrowser input={{ value: 'test', setValue: mockSetValue }} autocomplete={autocompleteProps} browserContainerRef={{ current: null }} />
    </Provider>
  );
};

describe('<ProductBrowser />', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('shows clear browser icon when browser has some text content', () => {
    const wrapper = setup();
    const clearBrowserIcon = findByTestAttr(wrapper, 'clear-browser-icon-visible');
    expect(clearBrowserIcon.exists()).toBe(true);
  });

  it('calls setValue with empty string after clicking clear browser icon', () => {
    // calling setValue with empty string means that product browser is cleared
    const wrapper = setup();
    const clearBrowserIcon = findByTestAttr(wrapper, 'clear-browser-icon-visible');
    clearBrowserIcon.first().simulate('click');
    expect(mockSetValue).toHaveBeenCalledWith('');
  });

  it('changes add product browser style on being focused', () => {
    const wrapper = setup();
    const addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
    addProductBrowser.simulate('focus');
    const addProductBrowserContainer = findByTestAttr(wrapper, 'add-product-browser-container');
    expect(addProductBrowserContainer.hasClass('focused')).toBe(true);
  });

  it('changes input value on picking items with arrows from autocomplete', (done) => {
    const wrapper = setup();

    const input = findByTestAttr(wrapper, 'add-product-browser');
    input.simulate('focus');

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: ['texta', 'textab'],
        })
        .then(() => {
          const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
          global.dispatchEvent(event);
          wrapper.update();
          expect(mockSetValue).toHaveBeenCalledWith('texta');
          wrapper.unmount();
          done();
        });
    });
  });
});
