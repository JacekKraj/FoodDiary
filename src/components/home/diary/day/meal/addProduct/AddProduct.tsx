import React from 'react';

import classes from './addProduct.module.scss';
import Input from './../../../../../UI/input/Input';
import Button from './../../../../../UI/button/Button';

const AddProduct: React.FC = () => {
  const [productName, setProductName] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  return (
    <div className={classes.addProduct}>
      <Input type='text' autofocus value={productName} onChange={(e) => handleInputChange(e)} className={classes.inputAdditional} />
      <Button className={classes.buttonAdditional} typeLight>
        Add
      </Button>
    </div>
  );
};

export default AddProduct;
