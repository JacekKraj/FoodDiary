import React from 'react';

import FooterWrapper from '../../../../wrappers/footerWrapper/FooterWrapper';
import classes from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <p className={classes.footer}>
        <span className={classes.shortcut}>TE</span> - times eaten, <span className={classes.shortcut}>D</span> - deterioration,{' '}
        <span className={classes.shortcut}>I</span> - improvement, <span className={classes.shortcut}>P</span> - probability.
        <span className={classes.notEnoughInfo}>
          <span className={classes.shortcut}>*</span> - this product was added less than 5 times. It is not enough to consider its results reliable.
          Try adding more.{' '}
        </span>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
