import React from 'react';

import classes from './sliders.module.scss';
import SliderInput from './../../../../../utils/sliderInput/SliderInput';
import { useActions } from '../../../../../redux/hooks/useActions';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import { SkinConditionValues, SkinConditonTypes } from '../../../../../redux/actions/diary';

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
  const { setSkin } = useActions();
  const { currentDate, currentDiary } = useTypedSelector((state) => state.diary);

  const handleCurrentChange = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setSkin(value as SkinConditionValues, 'currentSkinCondition' as SkinConditonTypes);
  };

  const handleComparedChange = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setSkin(value as SkinConditionValues, 'comparedSkinCondition' as SkinConditonTypes);
  };
  return (
    <React.Fragment>
      <div className={classes.sliders}>
        <SliderInput
          dataTest='slider-current'
          value={currentDiary[currentDate].currentSkinCondition}
          marks={currSkinStateMarks}
          sliderContainerClassName={classes.sliderContainer}
          sliderClassName={classes.slider}
          title={'Current skin condition'}
          steps={currSkinStateMarks.length}
          onChange={handleCurrentChange}
        />
        <SliderInput
          dataTest='slider-compared'
          value={currentDiary[currentDate].comparedSkinCondition}
          sliderContainerClassName={classes.sliderContainer}
          marks={skinStateChangesMarks}
          sliderClassName={classes.slider}
          title={'Skin condition compared to yesterday'}
          steps={skinStateChangesMarks.length}
          onChange={handleComparedChange}
        />
      </div>
    </React.Fragment>
  );
};

export default Sliders;
