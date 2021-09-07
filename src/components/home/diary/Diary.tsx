import React from 'react';

import Day from './day/Day';
import ControlBar from './controlBar/ControlBar';
import Footer from './footer/Footer';
import ModuleWrapper from '../../wrappers/moduleWrapper/ModuleWrapper';
import { useActions } from '../../../redux/hooks/useActions';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';
import classes from './diary.module.scss';

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
    <div className={classes.diary}>
      <ModuleWrapper title="Store products and skin's condition">
        <ControlBar />
        <Day />
        <Footer />
      </ModuleWrapper>
    </div>
  );
};

export default Diary;
