import React from 'react';

import classes from './modules.module.scss';
import DiarySummary from './diarySummary/DiarySummary';
import Conclusion from './conclusions/Conclusions';
import PageMainContentWrapper from '../../wrappers/pageMainContentWrapper/PageMainContentWrapper';

const Modules: React.FC = () => {
  return (
    <PageMainContentWrapper>
      <Conclusion />
      <DiarySummary />
    </PageMainContentWrapper>
  );
};

export default Modules;
