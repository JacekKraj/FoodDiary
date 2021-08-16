import React from 'react';

import classes from './diary.module.scss';
import Day from './day/Day';
import ControlBar from './controlBar/ControlBar';
import { getCurrentDate } from '../../../utils/helperFunctions/helperFunctions';
import Footer from './footer/Footer';

const Diary: React.FC = () => {
  const [date, setDate] = React.useState(getCurrentDate());

  const handleDateChange = (date: string) => {
    setDate(date);
  };
  return (
    <div className={classes.diary}>
      <ControlBar date={date} handleDateChange={handleDateChange} />
      <Day />
      <Footer />
    </div>
  );
};

export default Diary;
