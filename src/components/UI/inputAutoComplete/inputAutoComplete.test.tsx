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

it('shows autocomplete, and displays item from user autocomplitions', (done) => {
  const wrapper = setup({ pickItem: (_: string) => {}, focus: true, value: 'a' });
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
  const wrapper = setup({ pickItem: (_: string) => {}, focus: false, value: '' });
  const autoCompleteItem = findByTestAttr(wrapper, 'component-auto-complete-item');
  expect(autoCompleteItem.exists()).toBe(false);
});
