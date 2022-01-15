import React from 'react';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import classes from './product.module.scss';
import { useActions } from '../../../../../../redux/hooks/useActions';

const useStyles = makeStyles(() => ({
  remove: {
    color: 'white',
    fontSize: 18,
    cursor: 'pointer',
    marginRight: '0.25em',
    transition: '200ms',
    '&:hover': {
      position: 'relative',
      transform: 'scale(1.3)',
      fontWeight: 'bold',
    },
  },
}));

interface Props {
  name: string;
}

const Product: React.FC<Props> = ({ name }) => {
  const iconStyle = useStyles();

  const { removeProduct } = useActions();

  const remove = () => {
    removeProduct(name);
  };

  return (
    <div className={classes.product} data-test='component-product'>
      <ClearIcon className={iconStyle.remove} onClick={remove} data-test='remove-icon' />
      <p className={classes.productName} data-test='product'>
        {name}
      </p>
    </div>
  );
};

export default Product;
