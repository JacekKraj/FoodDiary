import React from 'react';

import classes from './skin.module.scss';
import Condition from './condition/Condition';

const Skin: React.FC = () => {
  return (
    <div className={classes.skin}>
      <Condition title='Skin condtion on this day' value='Medium' />
      <Condition title='Skin condtion comapred to previous day' value='Same' />
    </div>
  );
};

export default Skin;
