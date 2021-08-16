import React from 'react';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import classes from './product.module.scss';

const useStyles = makeStyles(() => ({
  remove: {
    color: 'rba(0,0,0,0.54)',
    fontSize: 20,
    cursor: 'pointer',
  },
}));

const Product: React.FC = () => {
  const iconStyle = useStyles();

  return (
    <div className={classes.product}>
      <p className={classes.productName}>Nazwa</p>
      <div className={classes.iconContainer}>
        <ClearIcon className={iconStyle.remove} />
      </div>
    </div>
  );
};

export default Product;
