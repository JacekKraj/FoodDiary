import React from 'react';

import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import Conclusion from './conclusion/Conclusion';
import classes from './conclusions.module.scss';
import NoDataInfo from '../../../../UI/noDataInfo/NoDataInfo';
import Spinner from './../../../../UI/spinner/Spinner';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';

const Conclusions: React.FC = () => {
  const { analysisLoading } = useTypedSelector((state) => state.diary);

  const noDataInfo = (
    <NoDataInfo>
      We couldn't find any products that we are almost sure will have a bad effect on your skin. Please try to provide us with more data.
    </NoDataInfo>
  );

  const conclusions = true ? (
    <div className={classes.conclusions}>
      <Conclusion
        header
        productName='Product'
        type='normal'
        skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
      />
      <Conclusion productName='apple' type='red' skinCondition={{ timesEaten: '8', probability: '88', improvement: '1', deterioration: '7' }} />
      <Conclusion
        productName='corn flakes'
        type='orange'
        skinCondition={{ timesEaten: '5', probability: '80', improvement: '1', deterioration: '4' }}
      />
      <Conclusion
        productName='corn flakes'
        type='orange'
        skinCondition={{ timesEaten: '5', probability: '80', improvement: '1', deterioration: '4' }}
      />
      <Conclusion
        productName='corn flakes'
        type='orange'
        skinCondition={{ timesEaten: '5', probability: '80', improvement: '1', deterioration: '4' }}
      />
      <Conclusion productName='peperoni' type='yellow' skinCondition={{ timesEaten: '5', probability: '60', improvement: '2', deterioration: '3' }} />
    </div>
  ) : (
    noDataInfo
  );
  return (
    <ModuleMainContentWrapper className={classes.moduleMainContentAdditional}>
      <h3 className={classes.title}>Products that seem to be bad for your skin:</h3>
      {!analysisLoading ? conclusions : <Spinner />}
    </ModuleMainContentWrapper>
  );
};

export default Conclusions;
