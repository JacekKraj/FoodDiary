import React from 'react';
import classnames from 'classnames';

import classes from './conclusion.module.scss';

interface Props {
  product: {
    name: string;
    type: string;
  };
  skinCondition: {
    timesEaten: string;
    improvement: string;
    deterioration: string;
    probability: string;
  };
  isHeader?: boolean;
}

const Conclusion: React.FC<Props> = (props) => {
  const { product, skinCondition, isHeader } = props;
  const { timesEaten, improvement, deterioration, probability } = skinCondition;
  return (
    <div className={classnames(classes.conclusion, isHeader && classes.header, classes[product.type])}>
      <p className={classes.productName} data-test='conclusion-product-name'>
        {product.name}
      </p>
      <ul className={classes.skinCondition}>
        <li>{timesEaten}</li>
        <li>{deterioration}</li>
        <li>{improvement}</li>
        <li>{probability}</li>
      </ul>
    </div>
  );
};

export default Conclusion;
