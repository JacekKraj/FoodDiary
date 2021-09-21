import React from 'react';

import classes from './addProduct.module.scss';
import Button from '../../../../../UI/button/Button';
import InputAutoComplete from '../../../../../UI/inputAutoComplete/InputAutoComplete';
import { useActions } from '../../../../../../redux/hooks/useActions';
import ProductBrowser from '../../../../../UI/productBrowser/ProductBrowser';

const AddProduct: React.FC = () => {
  const [productName, setProductName] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);
  const [typed, setTyped] = React.useState(false);
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);

  const productBrowserRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { addProduct } = useActions();

  const pickItemFromAutoComplete = (value: string) => {
    addProduct(value);
    setProductName('');
    setTyped(true);
    setActiveSuggestion(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = productName.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    if (product) {
      setActiveSuggestion(0);
      setTyped(true);
      addProduct(product);
      setProductName('');
      inputRef.current?.focus();
    }
  };

  return (
    <form className={classes.addProduct} onSubmit={handleSubmit} ref={productBrowserRef} data-test='component-add-product'>
      <ProductBrowser
        setTyped={setTyped}
        inputFocus={inputFocus}
        browserContainerRef={productBrowserRef}
        handleOutsideClick={() => {
          setInputFocus(false);
        }}
        setInputFocus={setInputFocus}
        inputRef={inputRef}
        value={productName}
        setValue={setProductName}
        setActiveSuggestion={setActiveSuggestion}
      >
        <InputAutoComplete
          focus={inputFocus}
          value={productName.replace(/\s+/g, ' ').trim()}
          setValue={setProductName}
          pickItem={pickItemFromAutoComplete}
          typed={typed}
          setTyped={setTyped}
          activeSuggestion={activeSuggestion}
          setActiveSuggestion={setActiveSuggestion}
        />
      </ProductBrowser>
      <Button dataTest='submit-button' className={classes.buttonAdditional}>
        Add
      </Button>
    </form>
  );
};

export default AddProduct;
