import React from 'react';

import classes from './products.module.scss';
import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import ProductBrowser from '../../../../UI/productBrowser/ProductBrowser';
import Conclusion from '../../conclusionsModule/conclusions/conclusion/Conclusion';
import NoDataInfo from './../../../../UI/noDataInfo/NoDataInfo';

const Products: React.FC = () => {
  const [productName, setProductName] = React.useState('');
  const inputRef = React.useRef(null);
  const browserContainerRef = React.useRef(null);

  return (
    <ModuleMainContentWrapper className={classes.moduleMainContentAdditional}>
      <div ref={browserContainerRef}>
        <ProductBrowser browserContainerRef={browserContainerRef} value={productName} setValue={setProductName} inputRef={inputRef} />
      </div>
      {!true ? (
        <div className={classes.conclusions}>
          <React.Fragment>
            {' '}
            <Conclusion
              header
              productName='Product'
              type='normal'
              skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
            />
            <Conclusion productName='apple' type='red' skinCondition={{ timesEaten: '8', probability: '88', improvement: '1', deterioration: '7' }} />
            <Conclusion productName='apple' type='red' skinCondition={{ timesEaten: '8', probability: '88', improvement: '1', deterioration: '7' }} />
            <Conclusion
              productName='apple'
              type='red'
              skinCondition={{ timesEaten: '8', probability: '88', improvement: '1', deterioration: '7' }}
            />{' '}
          </React.Fragment>
        </div>
      ) : (
        <div className={classes.noDataInfoContainer}>
          <NoDataInfo>Serch for product that you have already added into our database.</NoDataInfo>
        </div>
      )}
    </ModuleMainContentWrapper>
  );
};

export default Products;
