import React from 'react';

import classes from './diary.module.scss';
import Day from './day/Day';
import ControlBar from './controlBar/ControlBar';
import { getCurrentDate } from '../../../utils/helperFunctions/helperFunctions';
import Footer from './footer/Footer';
import ModuleWrapper from '../../UI/moduleWrapper/ModuleWrapper';

const Diary: React.FC = () => {
  const [date, setDate] = React.useState(getCurrentDate());

  const handleDateChange = (date: string) => {
    setDate(date);
  };
  return (
    <ModuleWrapper title="Store products and skin's condition">
      <ControlBar date={date} handleDateChange={handleDateChange} />
      <Day />
      <Footer />
    </ModuleWrapper>
  );
};

export default Diary;
