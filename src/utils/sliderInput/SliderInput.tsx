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
  sliderClassName?: string;
  sliderContainerClassName?: string;
}

const SliderInput: React.FC<Props> = (props) => {
  const { marks, title, steps, sliderClassName, sliderContainerClassName } = props;

  const valuetext = (value: number) => {
    return `${value}`;
  };

  const countDefaultValue = () => {
    return 100 / +((steps - 1) / 2).toFixed();
  };
  return (
    <div className={sliderContainerClassName}>
      <Typography id='discrete-slider-custom' gutterBottom>
        {title}
      </Typography>
      <Slider
        defaultValue={countDefaultValue()}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-custom'
        step={100 / (steps - 1)}
        // valueLabelDisplay='auto'
        className={sliderClassName}
        marks={marks}
      />
    </div>
  );
};

export default SliderInput;
