import React from 'react';

import classes from './products.module.scss';
import Product from './product/Product';
import AddProduct from './addProduct/AddProduct';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import NoDataInfo from '../../../../UI/noDataInfo/NoDataInfo';

const Products: React.FC = () => {
  const { currentDiary, currentDate } = useTypedSelector((state) => state.diary);

  const areCurrentDateProductsExisting = !!currentDiary[currentDate].productsNames.length;

  return (
    <div>
      <AddProduct />
      <div className={classes.products}>
        {areCurrentDateProductsExisting ? (
          currentDiary[currentDate].productsNames.map((name) => {
            return <Product name={name} key={name} />;
          })
        ) : (
          <NoDataInfo className={classes.noDataInfoAdditional}>You haven't added any products yet.</NoDataInfo>
        )}
      </div>
    </div>
  );
};

export default Products;
