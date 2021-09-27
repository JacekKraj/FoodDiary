import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../../../../utils/tests/testHelperFunction';
import AddProduct from './AddProduct';
import { getModifiedDate } from './../../../../../../utils/helperFunctions/getModifiedDate';
import { DiaryDay, UserAutocomplition } from './../../../../../../redux/reducers/diaryReducer';

interface InitialState {
  diary: {
    currentDiary: DiaryDay;
    currentDate: string;
    userAutocomplitions: UserAutocomplition[];
  };
}

const initialState: InitialState = {
  diary: {
    currentDiary: {
      [getModifiedDate()]: {
        products: [],
        currentSkinCondition: 50,
        comparedSkinCondition: 50,
      },
    },
    currentDate: getModifiedDate(),
    userAutocomplitions: [],
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
  expect(store.getState().diary.userAutocomplitions[0].product).toEqual('app');
});

it('still has a focus after clicking submit button', () => {
  addProductBrowser.simulate('focus');
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click');
  const addProductBrowserContainer = findByTestAttr(wrapper, 'add-product-browser-container');
  expect(addProductBrowserContainer.hasClass('focused')).toBe(true);
});
