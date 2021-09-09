import React from 'react';

import classes from './noDataInfo.module.scss';

interface Props {
  children: React.ReactNode;
}

const NoDataInfo: React.FC<Props> = ({ children }) => {
  return (
    <p data-test='no-products-info' className={classes.noProductsInfo}>
      {children}
    </p>
  );
};

export default NoDataInfo;
