import { mount } from 'enzyme';

import ProductBrowser from './ProductBrowser';
import { findByTestAttr } from '../../../utils/tests/testHelperFunction';

const mockSetValue = jest.fn();

const setup = () => {
  return mount(<ProductBrowser value='test' setValue={mockSetValue} browserContainerRef={{ current: null }} />);
};

describe('<ProductBrowser />', () => {
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
});
