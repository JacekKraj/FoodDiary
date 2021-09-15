import React from 'react';

import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import Conclusion from './conclusion/Conclusion';
import classes from './conclusions.module.scss';
import NoDataInfo from '../../../../UI/noDataInfo/NoDataInfo';
import Spinner from './../../../../UI/spinner/Spinner';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';

const Conclusions: React.FC = () => {
  const { analysisLoading, dangerousProducts } = useTypedSelector((state) => state.diary);

  const noDataInfo = (
    <NoDataInfo>
      We couldn't find any products that we are almost sure to have a bad effect on your skin. Please try to provide us with more data. We need each
      product to be added at least 5 times to be considered as dengerous.
    </NoDataInfo>
  );

  const conclusions = dangerousProducts.length ? (
    <div className={classes.conclusions}>
      <Conclusion
        header
        productName='Product'
        type='normal'
        skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
      />
      {dangerousProducts.map((el) => {
        return (
          <Conclusion
            productName={el.product}
            type={el.type}
            skinCondition={{ timesEaten: el.timesEaten, probability: el.probability, improvement: el.improvement, deterioration: el.deterioration }}
          />
        );
      })}
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
