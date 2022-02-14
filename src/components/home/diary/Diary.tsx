import React from 'react';

import Day from './day/Day';
import ControlBar from './controlBar/ControlBar';
import Footer from './footer/Footer';
import ModuleWrapper from '../../wrappers/moduleWrapper/ModuleWrapper';
import PageMainContentWrapper from '../../wrappers/pageMainContentWrapper/PageMainContentWrapper';
import { useActions } from '../../../redux/hooks/useActions';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';

const Diary: React.FC = () => {
  const { downloadSingleDiaryDay } = useActions();

  const { currentDate, downloadedDiary } = useTypedSelector((state) => state.diary);

  React.useEffect(() => {
    if (!downloadedDiary[currentDate]) {
      downloadSingleDiaryDay(currentDate);
    }
  }, [currentDate]);

  return (
    <PageMainContentWrapper>
      <ModuleWrapper title="Store products and skin's condition">
        <ControlBar />
        <Day />
        <Footer />
      </ModuleWrapper>
    </PageMainContentWrapper>
  );
};

export default Diary;
