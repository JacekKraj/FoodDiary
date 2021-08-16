import React from 'react';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import classes from './meal.module.scss';
import Product from './product/Product';
import AddProduct from './addProduct/AddProduct';
import { theme } from '../../../../../utils/breakpoints';

const useStyles = makeStyles(() => ({
  editIcon: {
    fontSize: 17,
    color: '#0078d4',
    cursor: 'pointer',
  },
  arrowIcon: {
    fontSize: 26,
    cursor: 'pointer',
    color: '#333',
    transition: '0.3s',
  },
  arrowIconReversed: {
    transform: 'rotate(180deg)',
  },
  [`${theme.breakpoints.up('md')} and (orientation : landscape)`]: {
    editIcon: {
      fontSize: 18,
      marginTop: -1,
    },
    arrowIcon: {
      fontSize: 30,
    },
  },
}));

const Meal: React.FC = () => {
  const iconStyle = useStyles();
  const [showProducts, setShowProducts] = React.useState(false);

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const productsContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={classes.meal}>
      <div className={classes.mealHeader}>
        <p className={classes.mealName}>Meal 1</p>
        <KeyboardArrowDownOutlinedIcon
          className={classnames(iconStyle.arrowIcon, showProducts && iconStyle.arrowIconReversed)}
          onClick={handleShowProducts}
        />
      </div>
      <div
        className={classes.productsContainer}
        ref={productsContainerRef}
        style={{ height: showProducts ? `${productsContainerRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className={classes.products}>
          <div>
            <Product />
            <Product />
            <Product />
          </div>
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default Meal;
