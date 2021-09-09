import React from 'react';

import classes from './day.module.scss';
import Products from './products/Products';
import Skin from './skin/Skin';
import Spinner from './../../../../UI/spinner/Spinner';
import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';

const Day: React.FC = () => {
  const summary = (
    <div className={classes.summary}>
      <Skin />
      <Products />
    </div>
  );

  return <ModuleMainContentWrapper className={classes.day}>{true ? summary : <Spinner />}</ModuleMainContentWrapper>;
};

export default Day;
