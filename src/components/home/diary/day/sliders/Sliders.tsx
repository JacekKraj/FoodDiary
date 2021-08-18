import React from 'react';

import classes from './sliders.module.scss';
import SliderInput from './../../../../../utils/sliderInput/SliderInput';

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

const Sliders: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.sliders}>
        <SliderInput
          marks={currSkinStateMarks}
          sliderContainerClassName={classes.sliderContainer}
          sliderClassName={classes.slider}
          title={'Current skin condition'}
          steps={currSkinStateMarks.length}
        />
        <SliderInput
          sliderContainerClassName={classes.sliderContainer}
          marks={skinStateChangesMarks}
          sliderClassName={classes.slider}
          title={'Skin condition compared to yesterday'}
          steps={skinStateChangesMarks.length}
        />
      </div>
    </React.Fragment>
  );
};

export default Sliders;
