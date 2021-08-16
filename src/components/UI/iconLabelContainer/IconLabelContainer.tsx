import React from 'react';

import classes from './iconLabelContainer.module.scss';

interface Props {
  children: React.ReactNode;
  text: string;
}

const iconLabel: React.FC<Props> = ({ children, text }) => {
  return (
    <div className={classes.iconLabelContainer}>
      {children}
      <span className={classes.iconLabel}>{text}</span>
    </div>
  );
};

export default iconLabel;
