import React from 'react';

import SearchForProduct from './searchForProduct/SearchForProduct';
import ConclusionsModule from './conclusionsModule/ConclusionsModule';
import PageMainContentWrapper from '../../wrappers/pageMainContentWrapper/PageMainContentWrapper';

const Modules: React.FC = () => {
  return (
    <PageMainContentWrapper>
      <ConclusionsModule />
      <SearchForProduct />
    </PageMainContentWrapper>
  );
};

export default Modules;
