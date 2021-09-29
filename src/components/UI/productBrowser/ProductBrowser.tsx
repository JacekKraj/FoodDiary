import React from 'react';
import classnames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';
import InputAutoComplete from '../inputAutoComplete/InputAutoComplete';

import classes from './productBrowser.module.scss';
import { theme } from '../../../utils/breakpoints/breakpoints';
import useOnClickOutside from './../../../utils/hooks/useOnClickOutside';

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
  [theme.breakpoints.up('sm')]: {
    icon: {
      fontSize: 22,
    },
  },
}));

interface Props {
  browserContainerRef: React.RefObject<HTMLElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setTyped?: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSuggestion?: React.Dispatch<React.SetStateAction<number>>;
  activeSuggestion?: number;
  typed?: boolean;
  pickItem?: (item: string) => void;
}

const ProductBrowser: React.FC<Props> = (props) => {
  const [inputFocus, setInputFocus] = React.useState(false);

  const iconStyle = useStyles();

  const { value, setValue, browserContainerRef, setTyped, setActiveSuggestion, activeSuggestion, typed, pickItem } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  useOnClickOutside(browserContainerRef, () => setInputFocus(false));

  const handleOnChange = (value: string) => {
    setValue(value);
    if (setTyped && setActiveSuggestion) {
      setTyped(true);
      setActiveSuggestion(0);
    }
  };

  React.useEffect(() => {
    const browserRef = browserContainerRef.current;
    const setFocus = () => {
      setInputFocus(true);
      inputRef.current?.focus();
    };
    browserRef?.addEventListener('click', setFocus);
    return () => {
      browserRef?.removeEventListener('click', setFocus);
    };
  }, [browserContainerRef.current]);

  return (
    <div className={classnames(classes.productBrowser, inputFocus && classes.focused)} data-test='add-product-browser-container'>
      <SearchIcon className={iconStyle.icon} />
      <input
        data-test='add-product-browser'
        type='text'
        ref={inputRef}
        placeholder='Search for product'
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        className={classes.input}
      />
      <CancelIcon
        data-test={`clear-browser-icon-${value && 'visible'}`}
        className={classnames(iconStyle.icon, iconStyle.clear, value && iconStyle.clearVisible)}
        onClick={() => handleOnChange('')}
      />
      {setTyped && setActiveSuggestion && activeSuggestion !== undefined && typed !== undefined && pickItem && (
        <InputAutoComplete
          focus={inputFocus}
          value={value}
          setValue={setValue}
          pickItem={pickItem}
          typed={typed}
          setTyped={setTyped}
          activeSuggestion={activeSuggestion}
          setActiveSuggestion={setActiveSuggestion}
        />
      )}
    </div>
  );
};

export default ProductBrowser;
