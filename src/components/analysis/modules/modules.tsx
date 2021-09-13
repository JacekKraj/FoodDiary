import React from 'react';

import classes from './modules.module.scss';
import DiarySummary from './diarySummary/DiarySummary';
import ConclusionsModule from './conclusionsModule/ConclusionsModule';
import PageMainContentWrapper from '../../wrappers/pageMainContentWrapper/PageMainContentWrapper';

const Modules: React.FC = () => {
  return (
    <PageMainContentWrapper>
      <ConclusionsModule />
      <DiarySummary />
    </PageMainContentWrapper>
  );
};

export default Modules;
