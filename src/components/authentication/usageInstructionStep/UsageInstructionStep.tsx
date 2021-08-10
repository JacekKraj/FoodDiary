import React from 'react';

import classes from './usageInstructionStep.module.scss';

interface Props {
  step: {
    title: string;
    text?: string;
    number: number;
  };
  children?: React.ReactNode;
}

const UsageInstructionStep: React.FC<Props> = ({ step, children }) => {
  return (
    <div className={classes.useInstructionStep}>
      <div className={classes.stepNumber}>{step.number.toString()}</div>
      <div className={classes.stepDescription}>
        <h3 className={classes.stepTitle}>{step.title}</h3>
        {children}
        {step.text && <p className={classes.stepText}>{step.text}</p>}
      </div>
    </div>
  );
};

export default UsageInstructionStep;
