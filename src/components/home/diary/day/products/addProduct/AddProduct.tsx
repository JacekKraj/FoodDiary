import React from 'react';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';

import classes from './addProduct.module.scss';
import Button from '../../../../../UI/button/Button';
import InputAutoComplete from '../../../../../UI/inputAutoComplete/InputAutoComplete';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { theme } from '../../../../../../utils/breakpoints/breakpoints';
import useOnClickOutside from '../../../../../../utils/hooks/useOnClickOutside';
import { useActions } from '../../../../../../redux/hooks/useActions';

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

  const productBrowserRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { addProduct } = useActions();

  useOnClickOutside(productBrowserRef, () => setInputFocus(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const pickItemFromAutoComplete = (value: string) => {
    addProduct(value);
    setProductName('');
  };

  const handleCancelClick = () => {
    setProductName('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = productName.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    if (product) {
      addProduct(product);
      setProductName('');
      inputRef.current?.focus();
    }
  };

  return (
    <form className={classes.addProduct} onSubmit={handleSubmit} ref={productBrowserRef} data-test='component-add-product'>
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
          value={productName}
          onChange={(e) => handleInputChange(e)}
          className={classes.inputAdditional}
        />
        <CancelIcon
          data-test={`clear-browser-icon-${productName && 'visible'}`}
          className={classnames(iconStyle.icon, iconStyle.clear, productName && iconStyle.clearVisible)}
          onClick={handleCancelClick}
        />
        <InputAutoComplete focus={inputFocus} value={productName} pickItem={pickItemFromAutoComplete} />
      </div>
      <Button dataTest='submit-button' className={classes.buttonAdditional}>
        Add
      </Button>
    </form>
  );
};

export default AddProduct;
