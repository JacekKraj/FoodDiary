import React from 'react';

import classes from './moduleWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
}

const ModuleWrapper: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={classes.moduleWrapper}>
      <h3>{title}</h3>
      <div className={classes.module}>{children}</div>
    </div>
  );
};

export default ModuleWrapper;
