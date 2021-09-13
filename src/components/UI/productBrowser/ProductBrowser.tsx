import React from 'react';
import classnames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';

import classes from './productBrowser.module.scss';
import { theme } from '../../../utils/breakpoints/breakpoints';

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
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ProductBrowser: React.FC<Props> = (props) => {
  const iconStyle = useStyles();

  const { inputFocus, setInputFocus, children, inputRef, value, setValue } = props;
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
        onChange={(e) => setValue(e.target.value)}
        className={classes.inputAdditional}
      />
      <CancelIcon
        data-test={`clear-browser-icon-${value && 'visible'}`}
        className={classnames(iconStyle.icon, iconStyle.clear, value && iconStyle.clearVisible)}
        onClick={() => setValue('')}
      />
      {children}
    </div>
  );
};

export default ProductBrowser;
