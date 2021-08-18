import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';

import classes from './addProduct.module.scss';
import Button from '../../../../../UI/button/Button';
import InputAutoComplete from '../../../../../UI/inputAutoComplete/InputAutoComplete';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { theme } from './../../../../../../utils/breakpoints';
import useOnClickOutside from '../../../../../../utils/hooks/useOnClickOutside';

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

const AddProduct: React.FC = () => {
  const iconStyle = useStyles();

  const [productName, setProductName] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);

  const productBrowserRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useOnClickOutside(productBrowserRef, () => setInputFocus(false));

  // string.replace(/\s+/g, ' ').trim()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const pickItemFromAutoComplete = (value: string) => {
    setProductName(value);
    setInputFocus(false);
  };

  const handleCancelClick = () => {
    setProductName('');
    inputRef.current?.focus();
  };

  return (
    <form className={classes.addProduct}>
      <div className={classnames(classes.productBrowser, inputFocus && classes.focused)} ref={productBrowserRef}>
        <SearchIcon className={iconStyle.icon} />
        <input
          onFocus={() => setInputFocus(true)}
          type='text'
          ref={inputRef}
          placeholder='Search for product'
          value={productName}
          onChange={(e) => handleInputChange(e)}
          className={classes.inputAdditional}
        />
        <CancelIcon className={classnames(iconStyle.icon, iconStyle.clear, productName && iconStyle.clearVisible)} onClick={handleCancelClick} />
        <InputAutoComplete focus={inputFocus} value={productName} pickItem={pickItemFromAutoComplete} />
      </div>
      <Button className={classes.buttonAdditional}>Add</Button>
    </form>
  );
};

export default AddProduct;
