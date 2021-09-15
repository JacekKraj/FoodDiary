import React from 'react';

import classes from './pageMainContentWrapper.module.scss';

interface Props {
  children: React.ReactNode;
}

const PageMainContentWrapper: React.FC<Props> = ({ children }) => {
  return <div className={classes.pageMainContentWrapper}>{children}</div>;
};

export default PageMainContentWrapper;
