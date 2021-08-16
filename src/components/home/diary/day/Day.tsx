import React from 'react';

import classes from './day.module.scss';
import Meal from './meal/Meal';
import SliderInput from './../../../../utils/sliderInput/SliderInput';

const Day: React.FC = () => {
  const currSkinStateMarks = [
    {
      value: 0,
      label: 'Terrible',
    },
    {
      value: 25,
      label: 'Bad',
    },
    {
      value: 50,
      label: 'Medium',
    },
    {
      value: 75,
      label: 'Good',
    },
    {
      value: 100,
      label: 'Perfect',
    },
  ];

  const skinStateChangesMarks = [
    {
      value: 0,
      label: 'Much worse',
    },
    {
      value: 25,
      label: 'Worse',
    },
    {
      value: 50,
      label: 'Same',
    },
    {
      value: 75,
      label: 'Better',
    },
    {
      value: 100,
      label: 'Much better',
    },
  ];
  return (
    <div className={classes.day}>
      <Meal />
      <Meal />
      <Meal />
      <div className={classes.slidersContainer}>
        <SliderInput
          marks={currSkinStateMarks}
          sliderContainerClassName={classes.sliderContainer}
          sliderClassName={classes.slider}
          title={'Current skin state'}
          steps={currSkinStateMarks.length}
        />
        <SliderInput
          sliderContainerClassName={classes.sliderContainer}
          marks={skinStateChangesMarks}
          sliderClassName={classes.slider}
          title={'Skin condtion compared to yesterday'}
          steps={skinStateChangesMarks.length}
        />
      </div>
    </div>
  );
};

export default Day;
