import React from 'react';

import Products from './products/Products';
import Sliders from './sliders/Sliders';
import Spinner from './../../../UI/spinner/Spinner';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';
import ModuleMainContentWrapper from './../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';

const Day: React.FC = () => {
  const { isDiaryLoading } = useTypedSelector((state) => state.diary);

  return (
    <ModuleMainContentWrapper>
      {isDiaryLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Products />
          <Sliders />
        </React.Fragment>
      )}
    </ModuleMainContentWrapper>
  );
};

export default Day;
