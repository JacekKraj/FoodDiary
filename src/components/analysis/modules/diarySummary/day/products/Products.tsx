import React from 'react';

import classes from './products.module.scss';
import NoDataInfo from '../../../../../UI/noDataInfo/NoDataInfo';

const Products: React.FC = () => {
  return (
    <div>
      <p className={classes.title}>Products you ate on previous day:</p>
      {true ? (
        <div className={classes.productsContainer}>
          {[
            'apple',
            'banana',
            'orange',
            'rice',
            'mango juice',
            'chicken',
            'pipipapojogo',
            'apple',
            'banana',
            'orange',
            'rice',
            'mango juice',
            'chicken',
            'pipipapojogo',
          ].map((el) => {
            return (
              <span className={classes.product} key={el}>
                {el},{' '}
              </span>
            );
          })}
        </div>
      ) : (
        <NoDataInfo>No products added for that day.</NoDataInfo>
      )}
    </div>
  );
};

export default Products;
