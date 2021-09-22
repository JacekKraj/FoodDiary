import React from 'react';

import classes from './addProduct.module.scss';
import Button from '../../../../../UI/button/Button';
import { useActions } from '../../../../../../redux/hooks/useActions';
import ProductBrowser from '../../../../../UI/productBrowser/ProductBrowser';

const AddProduct: React.FC = () => {
  const [productName, setProductName] = React.useState('');

  const [typed, setTyped] = React.useState(false);
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);

  const productBrowserRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { addProduct } = useActions();

  const handleAddProduct = (item: string) => {
    addProduct(item);
    setProductName('');
    setTyped(true);
    setActiveSuggestion(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = productName.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    if (product) {
      handleAddProduct(product);
      inputRef.current?.focus();
    }
  };

  return (
    <form className={classes.addProduct} onSubmit={handleSubmit} ref={productBrowserRef} data-test='component-add-product'>
      <ProductBrowser
        setTyped={setTyped}
        browserContainerRef={productBrowserRef}
        inputRef={inputRef}
        value={productName}
        setValue={setProductName}
        activeSuggestion={activeSuggestion}
        typed={typed}
        setActiveSuggestion={setActiveSuggestion}
        pickItem={handleAddProduct}
      />
      <Button dataTest='submit-button' className={classes.buttonAdditional}>
        Add
      </Button>
    </form>
  );
};

export default AddProduct;
