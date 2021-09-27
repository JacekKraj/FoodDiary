import React from 'react';

import classes from './questions.module.scss';
import Question from './question/Question';

const Questions: React.FC = () => {
  return (
    <div className={classes.questions}>
      <Question
        question='What is this page for?'
        answer="The website is intended for people with skin problems who haven't been able to find the source of their problem so far. By adding the products you eat that day and the skin condition the next day, this page helps you identify which products may affect badly your skin condition."
      />
      <Question
        question='How to correctly use Food Diary?'
        answer='To obtain the most reliable results, you should add all the products that you ate on a given day and assess the condition of your skin as accurately as possible. Skipping any product can lead to wrong conclusions.'
      />
      <Question
        question='How many samples of a given product are needed to determine if it is harmful?'
        answer='The minimum number of times that a given product should be added to include it in the analysis is 5 times, because with a smaller number the result is hard to be considered credible. Therefore, the conclusions will be closer to reality the more times a given product is added.'
      />
      <Question
        question='Is page free to use?'
        answer='Yes, all the functions of this website are completely free and you can use them with no limit.'
      />
      <Question
        question='What do we do with the data we collect?'
        answer='The data you provide to our website is only used to analyze your skin problems. They are not transferred to any persons or institutions unrelated to the Food Diary.'
      />
    </div>
  );
};

export default Questions;
