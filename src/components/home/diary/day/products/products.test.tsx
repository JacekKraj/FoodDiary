import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import moxios from 'moxios';

import Products from './Products';
import { findByTestAttr, storeFactory } from '../../../../../utils/tests/testHelperFunction';
import { getModifiedDate } from './../../../../../utils/helperFunctions/getModifiedDate';
import { AddedProduct } from './../../../../../redux/reducers/diaryReducer';

interface InitialState {
  diary: {
    currentDate: string;
    currentDiary: {};
    addedProductsList?: AddedProduct[];
  };
}
let store: any;
const setup = (initialState: InitialState) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

describe('<Products />', () => {
  describe('no products added', () => {
    it('displays no products info', () => {
      const wrapper = setup({ diary: { currentDate: getModifiedDate(), currentDiary: { [getModifiedDate()]: { productsNames: [] } } } });
      const noProductsInfo = findByTestAttr(wrapper, 'no-data-info');
      expect(noProductsInfo.text()).toEqual("You haven't added any products yet.");
    });
  });
  describe('products added', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      moxios.install();
      wrapper = setup({
        diary: {
          currentDate: getModifiedDate(),
          currentDiary: { [getModifiedDate()]: { productsNames: ['apple'] }, '2020-09-01': { productsNames: ['banana'] } },
          addedProductsList: [{ name: 'apple', timesAdded: 1 }],
        },
      });
    });

    afterEach(() => {
      moxios.uninstall();
      wrapper.unmount();
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
      expect(store.getState().diary.addedProductsList).toEqual([]);
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
