import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Conclusions from './Conclusions';
import { findByTestAttr, storeFactory } from './../../../../../utils/tests/testHelperFunction';
import { ModifiedAnalyzedProduct } from './../../../../../redux/reducers/diaryReducer';

interface InitialState {
  diary: {
    analysisLoading: boolean;
    dangerousProducts: ModifiedAnalyzedProduct[];
  };
}

const setup = (initialState: InitialState) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Conclusions />
    </Provider>
  );
};

it('shows spinner when loading is true', () => {
  const wrapper = setup({ diary: { analysisLoading: true, dangerousProducts: [] } });
  const spinner = findByTestAttr(wrapper, 'component-spinner');
  expect(spinner.exists()).toBe(true);
});

it('shows no products info when dangerous products array is empty', () => {
  const wrapper = setup({ diary: { analysisLoading: false, dangerousProducts: [] } });
  const noProductsInfo = findByTestAttr(wrapper, 'no-data-info');
  expect(noProductsInfo.exists()).toBe(true);
});

it('shows products in correct order when dangerous products array is not empty', () => {
  const wrapper = setup({
    diary: {
      analysisLoading: false,
      dangerousProducts: [
        { timesEaten: '5', improvement: '0', deterioration: '5', probability: '100', type: 'red', product: 'apple' },
        { timesEaten: '5', improvement: '1', deterioration: '4', probability: '20', type: 'normal', product: 'banana' },
      ],
    },
  });
  const conclusionProductName = findByTestAttr(wrapper, 'conclusion-product-name');
  // first conclusionProductName is header so real products start at index 1
  expect(conclusionProductName.at(1).text()).toEqual('apple');
  expect(conclusionProductName.last().text()).toEqual('banana');
});
