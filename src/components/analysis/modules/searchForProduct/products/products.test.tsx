import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { ModifiedAnalyzedProduct, UserAutocomplition } from '../../../../../redux/reducers/diaryReducer';

import Products from './Products';
import { findByTestAttr, storeFactory } from '../../../../../utils/tests/testHelperFunction';

interface InitialState {
  diary: {
    dangerousProducts: ModifiedAnalyzedProduct[];
    safeProducts: ModifiedAnalyzedProduct[];
    userAutocomplitions: UserAutocomplition[];
  };
}

const customProduct = (number: string) => {
  return {
    timesEaten: number,
    improvement: '0',
    deterioration: number,
    type: 'red',
    probability: '100',
  };
};

const setup = () => {
  const initialState: InitialState = {
    diary: {
      dangerousProducts: [{ product: 'apple', ...customProduct('5') }],
      safeProducts: [{ product: 'banana', ...customProduct('1') }],
      userAutocomplitions: [
        { product: 'apple', timesUsed: 1 },
        { product: 'banana', timesUsed: 1 },
      ],
    },
  };
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );
};
describe('<Products />', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('shows no products info initially', () => {
    const noProductsInfo = findByTestAttr(wrapper, 'no-data-info');
    expect(noProductsInfo.exists()).toBe(true);
  });

  it('displays apropriate product on typing in product browser', () => {
    const addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
    addProductBrowser.simulate('change', { target: { value: 'a' } });
    const conclusionProductName = findByTestAttr(wrapper, 'conclusion-product-name');
    // finds to product names because first is a header
    expect(conclusionProductName.last().text()).toEqual('apple');
  });

  it('displays no products info when product browser value doesnt match any user autocomplition', () => {
    const addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
    addProductBrowser.simulate('change', { target: { value: 'c' } });
    const noProductsInfo = findByTestAttr(wrapper, 'no-data-info');
    expect(noProductsInfo.exists()).toBe(true);
  });
});
