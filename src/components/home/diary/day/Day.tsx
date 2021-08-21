import React from 'react';

import classes from './day.module.scss';
import Products from './products/Products';
import Sliders from './sliders/Sliders';
import Spinner from './../../../UI/spinner/Spinner';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';

const Day: React.FC = () => {
  const { loading } = useTypedSelector((state) => state.diary);

  return (
    <div className={classes.day}>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Products />
          <Sliders />
        </React.Fragment>
      )}
    </div>
  );
};

export default Day;
