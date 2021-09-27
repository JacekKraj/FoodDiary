import React from 'react';

import ModuleWrapper from '../../../wrappers/moduleWrapper/ModuleWrapper';
import classes from './searchForProduct.module.scss';
import Footer from './footer/Footer';
import Products from './products/Products';

const SearchForProduct: React.FC = () => {
  return (
    <ModuleWrapper title='Search for any product' className={classes.diarySummary}>
      <Products />
      <Footer />
    </ModuleWrapper>
  );
};

export default SearchForProduct;
