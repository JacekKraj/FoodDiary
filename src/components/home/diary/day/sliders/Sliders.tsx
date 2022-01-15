import React from 'react';

import classes from './sliders.module.scss';
import SliderInput from './../../../../../utils/sliderInput/SliderInput';
import { useActions } from '../../../../../redux/hooks/useActions';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import { SkinConditionValues } from '../../../../../redux/reducers/diaryReducer';

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

  const changeCurrentCondition = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setSkin(value as SkinConditionValues, 'currentSkinCondition');
  };

  const changeComparedCondition = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setSkin(value as SkinConditionValues, 'comparedSkinCondition');
  };
  return (
    <React.Fragment>
      <div className={classes.sliders}>
        <SliderInput
          dataTest='slider-current'
          value={currentDiary[currentDate].currentSkinCondition}
          marks={currSkinStateMarks}
          classNames={{
            slider: classes.slider,
            sliderContainer: classes.sliderContainer,
          }}
          title={'Current skin condition'}
          steps={currSkinStateMarks.length}
          onChange={changeCurrentCondition}
        />
        <SliderInput
          dataTest='slider-compared'
          value={currentDiary[currentDate].comparedSkinCondition}
          classNames={{
            slider: classes.slider,
            sliderContainer: classes.sliderContainer,
          }}
          marks={skinStateChangesMarks}
          title={'Skin condition compared to yesterday'}
          steps={skinStateChangesMarks.length}
          onChange={changeComparedCondition}
        />
      </div>
    </React.Fragment>
  );
};

export default Sliders;
