import React from 'react';

import ModuleWrapper from '../../../wrappers/moduleWrapper/ModuleWrapper';
import Footer from './footer/Footer';
import Conclusions from './conclusions/Conclusions';

const ConclusionsModule: React.FC = () => {
  return (
    <ModuleWrapper title='Conclusions'>
      <Conclusions />
      <Footer />
    </ModuleWrapper>
  );
};

export default ConclusionsModule;
