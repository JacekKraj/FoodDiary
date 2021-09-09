import React from 'react';

import ModuleWrapper from '../../../wrappers/moduleWrapper/ModuleWrapper';
import Day from './day/Day';
import ControlBarContainer from './controlBarContainer/ControlBarContainer';
import classes from './diarySummary.module.scss';

const DiarySummary: React.FC = () => {
  return (
    <ModuleWrapper title='Diary summary' className={classes.diarySummary}>
      <ControlBarContainer />
      <Day />
    </ModuleWrapper>
  );
};

export default DiarySummary;
