import React from 'react';

import Day from './day/Day';
import ControlBar from './controlBar/ControlBar';
import Footer from './footer/Footer';
import ModuleWrapper from '../../UI/moduleWrapper/ModuleWrapper';
import { useActions } from '../../../redux/hooks/useActions';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';

const Diary: React.FC = () => {
  const { getDiary } = useActions();

  const { userEmail } = useTypedSelector((state) => state.auth);
  const { currentDate, downloadedDiary } = useTypedSelector((state) => state.diary);

  React.useEffect(() => {
    if (!downloadedDiary[currentDate]) {
      getDiary(currentDate, userEmail);
    }
  }, [currentDate, userEmail]);

  return (
    <ModuleWrapper title="Store products and skin's condition">
      <ControlBar />
      <Day />
      <Footer />
    </ModuleWrapper>
  );
};

export default Diary;
