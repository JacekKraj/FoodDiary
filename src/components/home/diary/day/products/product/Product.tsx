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
  text: string;
}

const Product: React.FC<Props> = ({ text }) => {
  const iconStyle = useStyles();

  const { removeProduct } = useActions();

  const handleRemove = () => {
    removeProduct(text);
  };

  return (
    <div className={classes.product}>
      <ClearIcon className={iconStyle.remove} onClick={handleRemove} />
      <p className={classes.productName}>{text}</p>
    </div>
  );
};

export default Product;
