import React from 'react';

import classes from './products.module.scss';
import ModuleMainContentWrapper from '../../../../wrappers/moduleMainContentWrapper/ModuleMainContentWrapper';
import ProductBrowser from '../../../../UI/productBrowser/ProductBrowser';
import Conclusion from '../../conclusionsModule/conclusions/conclusion/Conclusion';
import NoDataInfo from './../../../../UI/noDataInfo/NoDataInfo';
import { useTypedSelector } from '../../../../../redux/hooks/useTypedSelector';
import { getMatchingAddedProductsNames } from '../../../../../utils/helperFunctions/getMatchingAddedProductsNames';

const Products: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const browserContainerRef = React.useRef(null);

  const { dangerousProducts, safeProducts, addedProductsList } = useTypedSelector((state) => state.diary);

  const getMatchingWithInputValueProducts = React.useMemo(() => {
    const matchingAddedProducts = getMatchingAddedProductsNames(inputValue, addedProductsList);

    const matchingProducts = [...dangerousProducts, ...safeProducts].filter((product) => {
      return !!matchingAddedProducts.includes(product.product);
    });

    return matchingProducts;
  }, [inputValue, dangerousProducts, safeProducts, addedProductsList]);

  const noProductsInfo = (
    <NoDataInfo className={classes.noDataInfoAdditional}>Search for product that you have already added into our database.</NoDataInfo>
  );

  return (
    <ModuleMainContentWrapper className={classes.moduleMainContentAdditional}>
      <div ref={browserContainerRef}>
        <ProductBrowser browserContainerRef={browserContainerRef} input={{ value: inputValue, setValue: setInputValue }} />
      </div>
      {getMatchingWithInputValueProducts?.length ? (
        <div className={classes.conclusions}>
          <Conclusion
            isHeader
            product={{
              name: 'Product',
              type: 'normal',
            }}
            skinCondition={{ timesEaten: 'TE', probability: 'P[%]', improvement: 'I', deterioration: 'D' }}
          />
          {getMatchingWithInputValueProducts.map((el) => {
            const { product, timesEaten, type, probability, improvement, deterioration } = el;
            return (
              <Conclusion
                key={product}
                product={{
                  name: product + (+timesEaten < 5 ? '*' : ''),
                  type,
                }}
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
