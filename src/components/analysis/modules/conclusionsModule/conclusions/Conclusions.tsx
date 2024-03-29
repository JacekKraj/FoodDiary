import React from 'react';

import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import Conclusion from './conclusion/Conclusion';
import classes from './conclusions.module.scss';
import NoDataInfo from '../../../../UI/noDataInfo/NoDataInfo';
import Spinner from './../../../../UI/spinner/Spinner';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';

const Conclusions: React.FC = () => {
  const { isAnalysisLoading, dangerousProducts } = useTypedSelector((state) => state.diary);

  const noConclusionsInfo = (
    <NoDataInfo className={classes.noDataInfoAdditional}>
      We couldn't find any products that we are almost sure to have a bad effect on your skin. Please try to provide us with more data. We need each
      product to be added at least 5 times to be considered as dengerous.
    </NoDataInfo>
  );

  const conclusions = dangerousProducts.length ? (
    <div className={classes.conclusions}>
      <Conclusion
        isHeader
        product={{
          name: 'Product',
          type: 'normal',
        }}
        skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
      />
      {dangerousProducts.map((product) => {
        const { name, timesEaten, type, probability, improvement, deterioration } = product;
        return <Conclusion key={name} product={{ name, type }} skinCondition={{ timesEaten, probability, improvement, deterioration }} />;
      })}
    </div>
  ) : (
    noConclusionsInfo
  );

  return (
    <ModuleMainContentWrapper className={classes.moduleMainContentAdditional}>
      <h3 className={classes.title}>Products that seem to be bad for your skin:</h3>
      {!isAnalysisLoading ? conclusions : <Spinner />}
    </ModuleMainContentWrapper>
  );
};

export default Conclusions;
