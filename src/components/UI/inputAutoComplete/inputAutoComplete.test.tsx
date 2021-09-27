import { mount } from 'enzyme';
import moxios from 'moxios';
import axios from 'axios';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../utils/tests/testHelperFunction';
import InputAutoComplete from './InputAutoComplete';

interface DefaultProps {
  pickItem: (value: string) => void;
  value: string;
  focus: boolean;
  typed: boolean;
  activeSuggestion: number;
  setValue: () => void;
  setActiveSuggestion: () => void;
  setTyped: () => void;
}

let store: any;

const setup = (defaultProps: DefaultProps) => {
  store = storeFactory({ diary: { userAutocomplitions: [{ product: 'acai', timesUsed: 1 }] } });
  return mount(
    <Provider store={store}>
      <InputAutoComplete {...defaultProps} />
    </Provider>
  );
};

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

const customProps = {
  typed: true,
  activeSuggestion: 0,
  pickItem: jest.fn(),
  setValue: jest.fn(),
  setActiveSuggestion: jest.fn(),
  setTyped: jest.fn(),
};

it('shows autocomplete, and displays item from user autocomplitions', (done) => {
  const wrapper = setup({ focus: true, value: 'a', ...customProps });
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request
      .respondWith({
        status: 200,
        response: ['apple'],
      })
      .then(() => {
        wrapper.update();
        const autoCompleteItem = findByTestAttr(wrapper, 'component-auto-complete-item');
        expect(autoCompleteItem.first().text()).toEqual('acai');
        expect(autoCompleteItem.last().text()).toEqual('apple');
        wrapper.unmount();
        done();
      });
  });
});

it("doesn't show autocomplete when no value comes", () => {
  const wrapper = setup({ focus: false, value: '', ...customProps });
  const autoCompleteItem = findByTestAttr(wrapper, 'component-auto-complete-item');
  expect(autoCompleteItem.exists()).toBe(false);
});
