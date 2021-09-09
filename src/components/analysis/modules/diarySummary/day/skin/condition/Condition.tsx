import React from 'react';

import classes from './condition.module.scss';

interface Props {
  title: string;
  value: string;
}

const Condition: React.FC<Props> = ({ title, value }) => {
  return (
    <div className={classes.condition}>
      <p className={classes.title}>{title}:</p>
      <p className={classes.value}>{value}</p>
    </div>
  );
};

export default Condition;
