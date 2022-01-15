import React from 'react';

import classes from './addProduct.module.scss';
import Button from '../../../../../UI/button/Button';
import { useActions } from '../../../../../../redux/hooks/useActions';
import ProductBrowser from '../../../../../UI/productBrowser/ProductBrowser';
import { modifyProductName } from '../../../../../../utils/helperFunctions/modifyProductName';

const AddProduct: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);

  const productBrowserRef = React.useRef<HTMLFormElement>(null);

  const { addProduct } = useActions();

  const handleAdd = (product: string) => {
    addProduct(product);
    setInputValue('');
    setIsTyping(true);
    setActiveSuggestionIndex(0);
  };

  const submitBrowser = (e: React.FormEvent) => {
    e.preventDefault();

    const productNameModified = modifyProductName(inputValue);

    if (!!productNameModified) {
      handleAdd(productNameModified);
    }
  };

  return (
    <form className={classes.addProduct} onSubmit={submitBrowser} ref={productBrowserRef} data-test='component-add-product'>
      <ProductBrowser
        browserContainerRef={productBrowserRef}
        input={{ value: inputValue, setValue: setInputValue }}
        autocomplete={{
          activeSuggestion: { index: activeSuggestionIndex, setIndex: setActiveSuggestionIndex },
          pickItem: handleAdd,
          setIsTyping,
          isTyping,
        }}
      />
      <Button dataTest='submit-button' className={classes.buttonAdditional}>
        Add
      </Button>
    </form>
  );
};

export default AddProduct;
