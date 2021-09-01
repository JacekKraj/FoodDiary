import { mount } from 'enzyme';
import moxios from 'moxios';
import axios from 'axios';

import { findByTestAttr } from '../../../utils/tests/testHelperFunction';
import InputAutoComplete from './InputAutoComplete';

interface DefaultProps {
  pickItem: (value: string) => void;
  value: string;
  focus: boolean;
}

const setup = (defaultProps: DefaultProps) => {
  return mount(<InputAutoComplete {...defaultProps} />);
};

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

it('shows autocomplete', (done) => {
  const wrapper = setup({ pickItem: (_: string) => {}, focus: true, value: 'app' });
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
        expect(autoCompleteItem.text()).toEqual('apple');
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
