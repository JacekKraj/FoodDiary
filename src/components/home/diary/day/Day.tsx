import React from 'react';

import classes from './day.module.scss';
import Products from './products/Products';
import SliderInput from './../../../../utils/sliderInput/SliderInput';
import Sliders from './sliders/Sliders';

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

const Day: React.FC = () => {
  return (
    <div className={classes.day}>
      <Products />
      <Sliders />
    </div>
  );
};

export default Day;
