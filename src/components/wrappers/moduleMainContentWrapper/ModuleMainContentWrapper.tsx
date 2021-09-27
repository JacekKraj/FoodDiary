import React from 'react';
import classnames from 'classnames';

import classes from './moduleMainContentWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ModuleMainContentWrapper: React.FC<Props> = ({ children, className }) => {
  return <div className={classnames(classes.moduleMainContentWrapper, className)}>{children}</div>;
};

export default ModuleMainContentWrapper;
