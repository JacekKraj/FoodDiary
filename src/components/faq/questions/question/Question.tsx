import React from 'react';

import classes from './question.module.scss';

interface Props {
  question: string;
  answer: string;
}

const Question: React.FC<Props> = ({ question, answer }) => {
  return (
    <div className={classes.questionContainer}>
      <h3 className={classes.question}>{question}</h3>
      <p className={classes.answer}>{answer}</p>
    </div>
  );
};

export default Question;
