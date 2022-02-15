import React from 'react';
import classnames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';
import InputAutoComplete from '../inputAutoComplete/InputAutoComplete';

import classes from './productBrowser.module.scss';
import { breakpoints } from '../../../utils/breakpoints/breakpoints';
import useOnClickOutside from '../../../utils/hooks/useOnClickOutside';

const { mobileHorizontal } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 21,
  },
  clear: {
    opacity: 0,
  },
  clearVisible: {
    opacity: 1,
    cursor: 'pointer',
  },
  [mobileHorizontal]: {
    icon: {
      fontSize: 22,
    },
  },
}));

interface AutocompleteProps {
  activeSuggestion: { index: number; setIndex: React.Dispatch<React.SetStateAction<number>> };
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  pickItem: (item: string) => void;
}

interface Props {
  browserContainerRef: React.RefObject<HTMLElement>;
  input: { value: string; setValue: React.Dispatch<React.SetStateAction<string>> };
  autocomplete?: AutocompleteProps;
}

const ProductBrowser: React.FC<Props> = (props) => {
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const { input, browserContainerRef, autocomplete } = props;

  const iconStyle = useStyles();

  const inputRef = React.useRef<HTMLInputElement>(null);

  useOnClickOutside(browserContainerRef, () => setIsInputFocused(false));

  const changeValue = (value: string) => {
    input.setValue(value);

    if (!!autocomplete) {
      autocomplete.setIsTyping(true);
      autocomplete.activeSuggestion.setIndex(0);
    }
  };

  React.useEffect(() => {
    const browserRef = browserContainerRef.current;

    const setBrowserFocus = () => {
      setIsInputFocused(true);
      inputRef.current?.focus();
    };

    browserRef?.addEventListener('click', setBrowserFocus);
    return () => {
      browserRef?.removeEventListener('click', setBrowserFocus);
    };
  }, [browserContainerRef.current]);

  return (
    <div className={classnames(classes.productBrowser, isInputFocused && classes.focused)} data-test='add-product-browser-container'>
      <SearchIcon className={iconStyle.icon} />
      <input
        data-test='add-product-browser'
        type='text'
        ref={inputRef}
        placeholder='Search for product'
        value={input.value}
        onChange={(e) => changeValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        className={classes.input}
      />
      <CancelIcon
        data-test={`clear-browser-icon-${input.value && 'visible'}`}
        className={classnames(iconStyle.icon, iconStyle.clear, input.value && iconStyle.clearVisible)}
        onClick={() => changeValue('')}
      />
      {!!autocomplete && (
        <InputAutoComplete
          input={{ ...input, isFocused: isInputFocused }}
          pickItem={autocomplete.pickItem}
          isTyping={autocomplete.isTyping}
          setIsTyping={autocomplete.setIsTyping}
          activeSuggestion={{ ...autocomplete.activeSuggestion }}
        />
      )}
    </div>
  );
};

export default ProductBrowser;
