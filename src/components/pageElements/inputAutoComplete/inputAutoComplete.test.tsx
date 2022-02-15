import { mount } from 'enzyme';
import moxios from 'moxios';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../../../utils/tests/testHelperFunction';
import InputAutoComplete from './InputAutoComplete';

interface DefaultProps {
  pickItem: (value: string) => void;
  input: {
    value: string;
    setValue: () => void;
    isFocused: boolean;
  };
  isTyping: boolean;
  setIsTyping: () => void;
  activeSuggestion: {
    index: number;
    setIndex: () => void;
  };
}

let store: any;

const setup = (defaultProps: DefaultProps) => {
  store = storeFactory({ diary: { addedProductsList: [{ name: 'acai', timesAdded: 1 }] } });
  return mount(
    <Provider store={store}>
      <InputAutoComplete {...defaultProps} />
    </Provider>
  );
};

describe('<InputAutoComplete />', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const customProps = {
    isTyping: true,
    activeSuggestion: { index: 0, setIndex: jest.fn() },
    pickItem: jest.fn(),
    setIsTyping: jest.fn(),
  };

  it('shows autocomplete, and displays item from user autocomplitions', (done) => {
    const wrapper = setup({
      input: {
        isFocused: true,
        value: 'a',
        setValue: jest.fn(),
      },
      ...customProps,
    });

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
    const wrapper = setup({
      input: {
        isFocused: false,
        value: '',
        setValue: jest.fn(),
      },
      ...customProps,
    });
    const autoCompleteItem = findByTestAttr(wrapper, 'component-auto-complete-item');
    expect(autoCompleteItem.exists()).toBe(false);
  });
});
