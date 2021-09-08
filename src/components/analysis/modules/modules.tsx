import React from 'react';

import classes from './modules.module.scss';
import DiarySummary from './diarySummary/DiarySummary';
import Conclusion from './conclusions/Conclusions';

const Modules: React.FC = () => {
  return (
    <div className={classes.modules}>
      <DiarySummary />
      <Conclusion />
    </div>
  );
};

export default Modules;
