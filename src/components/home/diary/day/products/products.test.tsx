import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import Products from './Products';
import { findByTestAttr, storeFactory } from '../../../../../utils/tests/testHelperFunction';
import { getModifiedDate } from './../../../../../utils/helperFunctions/getModifiedDate';

interface InitialState {
  diary: {
    currentDate: string;
    currentDiary: {};
  };
}

const setup = (initialState: InitialState) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

describe('displaying products', () => {
  describe('no products added', () => {
    it('displays no products info', () => {
      const wrapper = setup({ diary: { currentDate: getModifiedDate(), currentDiary: { [getModifiedDate()]: { products: [] } } } });
      const noProductsInfo = findByTestAttr(wrapper, 'no-products-info');
      expect(noProductsInfo.text()).toEqual("You haven't added any products yet.");
    });
  });
  describe('products added', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = setup({
        diary: {
          currentDate: getModifiedDate(),
          currentDiary: { [getModifiedDate()]: { products: ['apple'] }, '2020-09-01': { products: ['banana'] } },
        },
      });
    });
    it('displays products only of current day', () => {
      const product = findByTestAttr(wrapper, 'product');
      expect(product.text()).toEqual('apple');
    });
    it('removes product on clicking remove icon', () => {
      let product = findByTestAttr(wrapper, 'component-product');
      const removeIcon = findByTestAttr(product, 'remove-icon').first();
      removeIcon.simulate('click');
      product = findByTestAttr(wrapper, 'component-product');
      expect(product.exists()).toBe(false);
    });

    it('displays 2 products after submitting browser form', () => {
      const addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
      addProductBrowser.simulate('change', { target: { value: 'orange' } });
      const componentAddProduct = findByTestAttr(wrapper, 'component-add-product');
      componentAddProduct.simulate('submit');
      const product = findByTestAttr(wrapper, 'component-product');
      expect(product.first().text()).toBe('apple');
      expect(product.last().text()).toBe('orange');
    });
  });
});
