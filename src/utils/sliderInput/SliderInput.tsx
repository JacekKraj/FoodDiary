import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

type Mark = {
  value: number;
  label: string;
};

interface Props {
  marks: Mark[];
  title: string;
  steps: number;
  value: number;
  classNames?: {
    slider: string;
    sliderContainer: string;
  };
  dataTest?: string;
  onChange: (e: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const SliderInput: React.FC<Props> = (props) => {
  const { marks, title, steps, classNames, onChange, value, dataTest } = props;

  return (
    <div className={classNames?.sliderContainer}>
      <Typography id='discrete-slider-custom' gutterBottom>
        {title}
      </Typography>
      <Slider value={value} step={100 / (steps - 1)} data-test={dataTest} className={classNames?.slider} marks={marks} onChange={onChange} />
    </div>
  );
};

export default SliderInput;
