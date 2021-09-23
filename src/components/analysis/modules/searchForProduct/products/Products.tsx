import React from 'react';

import classes from './products.module.scss';
import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import ProductBrowser from '../../../../UI/productBrowser/ProductBrowser';
import Conclusion from '../../conclusionsModule/conclusions/conclusion/Conclusion';
import NoDataInfo from './../../../../UI/noDataInfo/NoDataInfo';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import { filterUserAutocomplitions } from '../../../../../utils/helperFunctions/filterUserAutocomplitions';

const Products: React.FC = () => {
  const [productName, setProductName] = React.useState('');
  const inputRef = React.useRef(null);
  const browserContainerRef = React.useRef(null);

  const { dangerousProducts, safeProducts, userAutocomplitions } = useTypedSelector((state) => state.diary);

  const filterProducts = React.useMemo(() => {
    const filteredUserAutocomplitions = filterUserAutocomplitions(productName, userAutocomplitions);
    return [...dangerousProducts, ...safeProducts].filter((el) => {
      return filteredUserAutocomplitions.includes(el.product);
    });
  }, [productName, dangerousProducts, safeProducts, userAutocomplitions]);

  const noProductsInfo = (
    <div className={classes.noDataInfoContainer}>
      <NoDataInfo>Serch for product that you have already added into our database.</NoDataInfo>
    </div>
  );

  return (
    <ModuleMainContentWrapper className={classes.moduleMainContentAdditional}>
      <div ref={browserContainerRef}>
        <ProductBrowser browserContainerRef={browserContainerRef} value={productName} setValue={setProductName} inputRef={inputRef} />
      </div>
      {filterProducts?.length ? (
        <div className={classes.conclusions}>
          <Conclusion
            header
            productName='Product'
            type='normal'
            skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
          />
          {filterProducts.map((el) => {
            const { product, timesEaten, type, probability, improvement, deterioration } = el;
            return (
              <Conclusion
                key={product}
                productName={product + (+timesEaten < 5 ? '*' : '')}
                type={type}
                skinCondition={{
                  timesEaten,
                  probability,
                  improvement,
                  deterioration,
                }}
              />
            );
          })}
        </div>
      ) : (
        noProductsInfo
      )}
    </ModuleMainContentWrapper>
  );
};

export default Products;
