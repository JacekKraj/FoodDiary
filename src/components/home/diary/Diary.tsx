import React from 'react';

import Day from './day/Day';
import ControlBarContainer from './controlBarConainer/ControlBarContainer';
import Footer from './footer/Footer';
import ModuleWrapper from '../../wrappers/moduleWrapper/ModuleWrapper';
import PageMainContentWrapper from '../../wrappers/pageMainContentWrapper/PageMainContentWrapper';
import { useActions } from '../../../redux/hooks/useActions';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';

const Diary: React.FC = () => {
  const { getDiary, getUserAutocomplitions } = useActions();

  const { userEmail } = useTypedSelector((state) => state.auth);
  const { currentDate, downloadedDiary, userAutocomplitions } = useTypedSelector((state) => state.diary);

  React.useEffect(() => {
    if (!downloadedDiary[currentDate]) {
      getDiary(currentDate, userEmail);
    }
  }, [currentDate, userEmail]);

  React.useEffect(() => {
    if (!userAutocomplitions.length) {
      getUserAutocomplitions(userEmail);
    }
  }, []);

  return (
    <PageMainContentWrapper>
      <ModuleWrapper title="Store products and skin's condition">
        <ControlBarContainer />
        <Day />
        <Footer />
      </ModuleWrapper>
    </PageMainContentWrapper>
  );
};

export default Diary;
