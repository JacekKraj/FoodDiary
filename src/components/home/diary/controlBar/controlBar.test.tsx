import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../../utils/tests/testHelperFunction';
import ControlBar from './ControlBar';
import { getModifiedDate } from '../../../../utils/helperFunctions/getModifiedDate';

interface InitialState {
  diary: {
    currentDate: string;
    currentDiary?: {};
  };
}

let store: any;
const setup = (initialState: InitialState, showRemove: boolean) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <ControlBar />
    </Provider>
  );
};

const createInitialState = (date: string, showRemove: boolean = true) => {
  return setup(
    {
      diary: {
        currentDate: date,
        currentDiary: {},
      },
    },
    showRemove
  );
};

describe('<ControlBar />', () => {
  describe('arrows availability', () => {
    it("has arrow forward disabled when it's on current date page", () => {
      const wrapper = createInitialState(getModifiedDate());
      const arrowBack = findByTestAttr(wrapper, 'arrow-forward-disabled').first();
      expect(arrowBack.exists()).toBe(true);
    });

    it("has arrow forward active when it isn't on current date page", () => {
      const wrapper = createInitialState('2020-08-31');
      const arrowBack = findByTestAttr(wrapper, 'arrow-forward-active').first();
      expect(arrowBack.exists()).toBe(true);
    });
  });

  describe('changes date on clicking arrows', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      wrapper = createInitialState('2020-08-31');
    });

    afterEach(() => {
      wrapper.unmount();
    });
    it('changes date after clicking arrow back', () => {
      const arrowBack = findByTestAttr(wrapper, 'arrow-back').first();
      arrowBack.simulate('click');
      expect(store.getState().diary.currentDate).toBe('2020-08-30');
    });
    it('changes date after clicking arrow forward', () => {
      const arrowBack = findByTestAttr(wrapper, 'arrow-forward-active').first();
      arrowBack.simulate('click');
      expect(store.getState().diary.currentDate).toBe('2020-09-01');
    });
  });
});
