import React from 'react';
import classnames from 'classnames';

import classes from './noDataInfo.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const NoDataInfo: React.FC<Props> = ({ children, className }) => {
  return (
    <p data-test='no-data-info' className={classnames(classes.noProductsInfo, className)}>
      {children}
    </p>
  );
};

export default NoDataInfo;
