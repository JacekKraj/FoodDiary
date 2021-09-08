import React from 'react';

import ModuleWrapper from '../../../wrappers/moduleWrapper/ModuleWrapper';
import Day from './day/Day';
import ControlBarContainer from './controlBarContainer/ControlBarContainer';
const DiarySummary: React.FC = () => {
  return (
    <ModuleWrapper title='Diary summary'>
      <ControlBarContainer />
      <Day />
    </ModuleWrapper>
  );
};

export default DiarySummary;
