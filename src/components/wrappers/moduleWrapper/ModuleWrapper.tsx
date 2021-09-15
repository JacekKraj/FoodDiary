import React from 'react';
import classnames from 'classnames';

import classes from './moduleWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const ModuleWrapper: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div className={classnames(classes.moduleWrapper, className)}>
      <h3>{title}</h3>
      <div className={classes.module}>{children}</div>
    </div>
  );
};

export default ModuleWrapper;
