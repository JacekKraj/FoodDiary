import React from 'react';
import classnames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';

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
  inputFocus: boolean;
  setInputFocus: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  browserContainerRef: React.RefObject<HTMLElement>;
  value: string;
  handleOutsideClick: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setTyped?: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSuggestion?: React.Dispatch<React.SetStateAction<number>>;
}

const ProductBrowser: React.FC<Props> = (props) => {
  const iconStyle = useStyles();

  const { inputFocus, setInputFocus, children, inputRef, value, setValue, handleOutsideClick, browserContainerRef, setTyped, setActiveSuggestion } =
    props;

  useOnClickOutside(browserContainerRef, handleOutsideClick);

  const handleOnChange = (value: string) => {
    setValue(value);
    if (setTyped) {
      setTyped(true);
    }
    if (setActiveSuggestion) {
      setActiveSuggestion(0);
    }
  };

  return (
    <div
      className={classnames(classes.productBrowser, inputFocus && classes.focused)}
      data-test='add-product-browser-container'
      onClick={() => inputRef.current?.focus()}
    >
      <SearchIcon className={iconStyle.icon} />
      <input
        data-test='add-product-browser'
        onFocus={() => setInputFocus(true)}
        type='text'
        ref={inputRef}
        placeholder='Search for product'
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        className={classes.inputAdditional}
      />
      <CancelIcon
        data-test={`clear-browser-icon-${value && 'visible'}`}
        className={classnames(iconStyle.icon, iconStyle.clear, value && iconStyle.clearVisible)}
        onClick={() => handleOnChange('')}
      />
      {children}
    </div>
  );
};

export default ProductBrowser;
