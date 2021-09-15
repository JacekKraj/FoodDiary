import React from 'react';

import classes from './footerWrapper.module.scss';

interface Props {
  children: React.ReactNode;
}

const FooterWrapper: React.FC<Props> = ({ children }) => {
  return <div className={classes.footerWrapper}>{children}</div>;
};

export default FooterWrapper;
