import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Sliders from './Sliders';
import { findByTestAttr, storeFactory } from '../../../../../utils/tests/testHelperFunction';
import { getModifiedDate } from '../../../../../utils/helperFunctions/getModifiedDate';

const setup = () => {
  const initialState = {
    diary: {
      currentDate: getModifiedDate(),
      currentDiary: {
        [getModifiedDate()]: {
          currentSkinCondition: 75,
          comparedSkinCondition: 25,
          products: [],
        },
      },
    },
  };
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Sliders />
    </Provider>
  );
};

it('has initially values from redux store', () => {
  const wrapper = setup();
  const sliderCurrent = findByTestAttr(wrapper, 'slider-current').first();
  const sliderCompared = findByTestAttr(wrapper, 'slider-compared').first();
  expect(sliderCurrent.prop('value')).toEqual(75);
  expect(sliderCompared.prop('value')).toEqual(25);
});
