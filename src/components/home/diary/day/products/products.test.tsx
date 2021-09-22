import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import moxios from 'moxios';
import axios from 'axios';

import Products from './Products';
import { findByTestAttr, storeFactory } from '../../../../../utils/tests/testHelperFunction';
import { getModifiedDate } from './../../../../../utils/helperFunctions/getModifiedDate';
import { UserAutocomplitions } from './../../../../../redux/reducers/diaryReducer';

interface InitialState {
  diary: {
    currentDate: string;
    currentDiary: {};
    userAutocomplitions?: UserAutocomplitions[];
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
      moxios.install();
      wrapper = setup({
        diary: {
          currentDate: getModifiedDate(),
          currentDiary: { [getModifiedDate()]: { products: ['apple'] }, '2020-09-01': { products: ['banana'] } },
          userAutocomplitions: [{ product: 'apple', timesUsed: 1 }],
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
      expect(store.getState().diary.userAutocomplitions).toEqual([]);
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

    it('changes input value on picking item with arrows from autocomplete', (done) => {
      let addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
      addProductBrowser.simulate('focus');
      addProductBrowser.simulate('change', { target: { value: 'a' } });

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request
          .respondWith({
            status: 200,
            response: ['acai'],
          })
          .then(() => {
            wrapper.update();
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            global.dispatchEvent(event);
            wrapper.update();
            addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
            expect(addProductBrowser.prop('value')).toEqual('apple');
            done();
          });
      });
    });
  });
});
