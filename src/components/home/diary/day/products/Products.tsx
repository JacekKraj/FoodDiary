import React from 'react';

import classes from './products.module.scss';
import Product from './product/Product';
import AddProduct from './addProduct/AddProduct';

const Products: React.FC = () => {
  return (
    <div>
      <AddProduct />
      <div className={classes.products}>
        <Product text='chicken' />
        <Product text='pear' />
        <Product text='peperoncino' />
        <Product text='pasta' />
        <Product text='pepper' />
        <Product text='apple' />
        <Product text='macaronini' />
        <Product text='lemon' />
        <Product text='sugar' />
        <Product text='macaronini' />
        {/* <p className={classes.noProductsInfo}>You haven't added any products yet.</p> */}
      </div>
    </div>
  );
};

export default Products;
