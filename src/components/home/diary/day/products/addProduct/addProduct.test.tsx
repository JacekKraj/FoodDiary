import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../../../../utils/tests/testHelperFunction';
import AddProduct from './AddProduct';
import { getModifiedDate } from './../../../../../../utils/helperFunctions/getModifiedDate';
import { DiaryDays, AddedProduct } from './../../../../../../redux/reducers/diaryReducer';

interface InitialState {
  diary: {
    currentDiary: DiaryDays;
    currentDate: string;
    addedProductsList: AddedProduct[];
  };
}

const initialState: InitialState = {
  diary: {
    currentDiary: {
      [getModifiedDate()]: {
        productsNames: [],
        currentSkinCondition: 50,
        comparedSkinCondition: 50,
      },
    },
    currentDate: getModifiedDate(),
    addedProductsList: [],
  },
};

let store: any;

const setup = () => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <AddProduct />
    </Provider>
  );
};

describe('<AddProduct />', () => {
  let addProductBrowser: ReactWrapper;
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup();
    addProductBrowser = findByTestAttr(wrapper, 'add-product-browser');
    addProductBrowser.simulate('change', { target: { value: 'app' } });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('adds product to user autocomplitions', () => {
    const form = findByTestAttr(wrapper, 'component-add-product');
    form.simulate('submit');
    expect(store.getState().diary.addedProductsList[0].name).toEqual('app');
  });

  it('still has a focus after clicking submit button', () => {
    addProductBrowser.simulate('focus');
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click');
    const addProductBrowserContainer = findByTestAttr(wrapper, 'add-product-browser-container');
    expect(addProductBrowserContainer.hasClass('focused')).toBe(true);
  });
});
