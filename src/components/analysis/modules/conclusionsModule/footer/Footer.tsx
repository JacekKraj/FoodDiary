import React from 'react';

import FooterWrapper from '../../../../wrappers/footerWrapper/FooterWrapper';
import classes from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <p className={classes.footer}>
        The given figures show changes in the condition of your skin that were observed on the day after eating a given product ( over 50 percent of
        probbility ). <span className={classes.shortcut}>TE</span> - times eaten, <span className={classes.shortcut}>D</span> - deterioration,{' '}
        <span className={classes.shortcut}>I</span> - Improvement, <span className={classes.shortcut}>P</span> - probability.
      </p>
    </FooterWrapper>
  );
};

export default Footer;
