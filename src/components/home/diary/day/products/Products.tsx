import React from 'react';

import classes from './products.module.scss';
import Product from './product/Product';
import AddProduct from './addProduct/AddProduct';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import NoDataInfo from '../../../../UI/noDataInfo/NoDataInfo';

const Products: React.FC = () => {
  const { currentDiary, currentDate } = useTypedSelector((state) => state.diary);
  return (
    <div>
      <AddProduct />
      <div className={classes.products}>
        {currentDiary[currentDate].products.length ? (
          currentDiary[currentDate].products.map((el) => {
            return <Product text={el} key={el} />;
          })
        ) : (
          <NoDataInfo>You haven't added any products yet.</NoDataInfo>
        )}
      </div>
    </div>
  );
};

export default Products;
