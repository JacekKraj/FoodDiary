import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import Diary from './Diary';
import { findByTestAttr, storeFactory } from '../../../utils/tests/testHelperFunction';
import { getModifiedDate } from './../../../utils/helperFunctions/getModifiedDate';
import { UserAutocomplition } from './../../../redux/reducers/diaryReducer';

interface Days {
  [index: string]: { products: string[]; currentSkinCondition: number; comparedSkinCondition: number };
}

interface InitialState {
  diary: {
    currentDate: string;
    currentDiary: Days;
    downloadedDiary: Days;
    userAutocomplitions: UserAutocomplition[];
  };
}

let store: any;
const setup = (initialState: InitialState) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Diary />
    </Provider>
  );
};

const sampleSkinCondition = {
  currentSkinCondition: 25,
  comparedSkinCondition: 75,
};

const sampleDiary = { [getModifiedDate()]: { products: ['apple'], ...sampleSkinCondition } };

describe('changing date', () => {
  const simulateClicking = (wrapper: ReactWrapper) => {
    const arrowBack = findByTestAttr(wrapper, 'arrow-back').first();
    arrowBack.simulate('click');
    return findByTestAttr(wrapper, 'component-spinner');
  };
  it("shows spinner on clicking change date arrow when this day's content wasn't downloaded yet", () => {
    const wrapper = setup({
      diary: { currentDate: getModifiedDate(), currentDiary: sampleDiary, downloadedDiary: {}, userAutocomplitions: [] },
    });
    const spinner = simulateClicking(wrapper);
    expect(spinner.exists()).toBe(true);
  });
  it("doesn't show spinner on clicking change date arrow when this day's conntent already exists in downloaded", () => {
    const wrapper = setup({
      diary: { currentDate: getModifiedDate(), currentDiary: sampleDiary, downloadedDiary: sampleDiary, userAutocomplitions: [] },
    });
    const spinner = simulateClicking(wrapper);
    expect(spinner.exists()).toBe(true);
  });
  it("displays new day's products and new slider's values", () => {
    const diary = {
      '2021-09-01': { products: ['apple'], ...sampleSkinCondition },
      '2021-08-31': { products: ['orange'], currentSkinCondition: 75, comparedSkinCondition: 25 },
    };
    const wrapper = setup({ diary: { currentDate: '2021-09-01', currentDiary: diary, downloadedDiary: diary, userAutocomplitions: [] } });
    simulateClicking(wrapper);
    const product = findByTestAttr(wrapper, 'product');
    const comparedSlider = findByTestAttr(wrapper, 'slider-compared').first();
    const currentSlider = findByTestAttr(wrapper, 'slider-current').first();
    expect(comparedSlider.prop('value')).toBe(25);
    expect(currentSlider.prop('value')).toBe(75);
    expect(product.text()).toBe('orange');
  });
});

describe('clicking remove content button', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup({
      diary: {
        currentDate: getModifiedDate(),
        currentDiary: sampleDiary,
        downloadedDiary: sampleDiary,
        userAutocomplitions: [{ product: 'apple', timesUsed: 1 }],
      },
    });
    const removeContentButton = findByTestAttr(wrapper, 'remove-content-button').first();
    removeContentButton.simulate('click');
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('updates userAutocomplitions state', () => {
    expect(store.getState().diary.userAutocomplitions).toEqual([]);
  });
  it('removes existing products', () => {
    const product = findByTestAttr(wrapper, 'product');
    expect(product.exists()).toBe(false);
  });
  it('resets sliders value', () => {
    const comparedSlider = findByTestAttr(wrapper, 'slider-compared').first();
    const currentSlider = findByTestAttr(wrapper, 'slider-current').first();
    expect(comparedSlider.prop('value')).toBe(50);
    expect(currentSlider.prop('value')).toBe(50);
  });
});
