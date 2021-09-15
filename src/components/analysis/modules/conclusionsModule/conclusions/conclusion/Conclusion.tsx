import React from 'react';
import classnames from 'classnames';

import classes from './conclusion.module.scss';

interface Props {
  productName: string;
  skinCondition: {
    timesEaten: string;
    improvement: string;
    deterioration: string;
    probability: string;
  };
  header?: boolean;
  type: string;
}

const Conclusion: React.FC<Props> = (props) => {
  const { productName, skinCondition, header, type } = props;
  const { timesEaten, improvement, deterioration, probability } = skinCondition;
  return (
    <div className={classnames(classes.conclusion, header && classes.header, classes[type])}>
      <p className={classes.productName}>{productName}</p>
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
