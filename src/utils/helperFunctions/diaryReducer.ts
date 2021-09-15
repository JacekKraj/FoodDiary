import { DiaryDay, Day, SkinConditionValues, ModifiedAnalyzedProduct, AnalyzedProducts } from '../../redux/reducers/diaryReducer';
import { getModifiedDate } from './getModifiedDate';

export const sortFullDiary = (fullDiary: DiaryDay) => {
  const sortedFullDiary: Day[] = [];
  for (let day in fullDiary) {
    if (fullDiary[day].products?.length) {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayDiary = fullDiary[getModifiedDate(nextDay)];
      if (nextDayDiary) {
        const sortedDiary = {
          products: fullDiary[day].products,
          comparedSkinCondition: nextDayDiary.comparedSkinCondition,
          currentSkinCondition: nextDayDiary.currentSkinCondition,
        };
        sortedFullDiary.push(sortedDiary);
      }
    }
  }
  return sortedFullDiary;
};

export const analyzeProducts = (sortedData: Day[]) => {
  let analyzedProducts: AnalyzedProducts = {};
  sortedData.forEach((el) => {
    let deterioration = 0;
    let improvement = 0;
    if (el.comparedSkinCondition === SkinConditionValues.lower || el.comparedSkinCondition === SkinConditionValues.low) {
      deterioration = 1;
    } else if (el.comparedSkinCondition === SkinConditionValues.higher || el.comparedSkinCondition === SkinConditionValues.high) {
      improvement = 1;
    } else {
      if (el.currentSkinCondition === SkinConditionValues.higher || el.currentSkinCondition === SkinConditionValues.high) {
        improvement = 1;
      } else {
        deterioration = 1;
      }
    }

    el.products.forEach((product) => {
      const previousProductState = analyzedProducts[product] || { timesEaten: 0, deterioration: 0, improvement: 0 };
      analyzedProducts[product] = {
        timesEaten: (+previousProductState.timesEaten + 1).toString(),
        deterioration: (+previousProductState.deterioration + deterioration).toString(),
        improvement: (+previousProductState.improvement + improvement).toString(),
      };
    });
  });
  return analyzedProducts;
};

export const modifyAnalyzedProducts = (analyzedProducts: AnalyzedProducts) => {
  const dangerousProducts: ModifiedAnalyzedProduct[] = [];
  const safeProducts: ModifiedAnalyzedProduct[] = [];
  for (let product in analyzedProducts) {
    const productValues = analyzedProducts[product];
    const probability = ((+productValues.deterioration / +productValues.timesEaten) * 100).toFixed();
    let type = 'normal';
    if (+probability >= 85) {
      type = 'red';
    } else if (+probability >= 70) {
      type = 'orange';
    } else if (+probability >= 50) {
      type = 'yellow';
    }

    const modifiedAnalyzedProduct = {
      ...productValues,
      probability,
      type,
      product,
    };
    const products = +probability >= 50 ? dangerousProducts : safeProducts;
    products.push(modifiedAnalyzedProduct);
  }
  return { safeProducts, dangerousProducts };
};
