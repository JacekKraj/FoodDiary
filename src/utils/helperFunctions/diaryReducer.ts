import {
  DiaryDays,
  SingleDayData,
  SkinConditionValues,
  ModifiedAnalyzedProduct,
  AnalyzedProducts,
  AddedProduct,
} from '../../redux/reducers/diaryReducer';
import { getModifiedDate } from './getModifiedDate';
import { getSortedProducts } from './sortProducts';

interface Product {
  name: string;
  isExisting: boolean;
  operation: 'add' | 'remove';
}

const getUpdatedAddedProductAndIndex = (addedProductsList: AddedProduct[], product: Product) => {
  const addedProductIndex = addedProductsList.findIndex((addedProduct) => addedProduct.name === product.name);

  const updatedAddedProduct = addedProductsList[addedProductIndex] || {
    name: product.name,
    timesAdded: 0,
  };

  updatedAddedProduct.timesAdded = product.operation === 'add' ? updatedAddedProduct.timesAdded + 1 : updatedAddedProduct.timesAdded - 1;

  let updatedIndex = addedProductIndex;

  if (updatedAddedProduct.timesAdded === 0) {
    updatedIndex = -1;
  }

  if (addedProductIndex < 0) {
    updatedIndex = addedProductsList.length;
  }

  return { updatedAddedProduct, updatedIndex };
};

export const getUpdatedAddedProductsList = (product: Product, currentAddedProductsList: AddedProduct[]) => {
  let newAddedProductsList = [...currentAddedProductsList];

  if (product.isExisting && product.operation === 'add') return currentAddedProductsList;

  const { updatedAddedProduct, updatedIndex } = getUpdatedAddedProductAndIndex(newAddedProductsList, product);

  if (updatedIndex >= 0) {
    newAddedProductsList[updatedIndex] = updatedAddedProduct;
  } else {
    newAddedProductsList = newAddedProductsList.filter((addedProduct) => addedProduct.name !== product.name);
  }

  return newAddedProductsList;
};

const getNextSingleDayData = (fullDiary: DiaryDays, currentDayDate: string) => {
  const nextDayDate = new Date(currentDayDate);
  nextDayDate.setDate(nextDayDate.getDate() + 1);
  const nextSingleDayData = fullDiary[getModifiedDate(nextDayDate)];
  return nextSingleDayData;
};

// fuction makes objects that contains one day's products a the next they skin condition
export const getSortedFullDiary = (fullDiary: DiaryDays) => {
  const sortedFullDiary: SingleDayData[] = [];

  for (let date in fullDiary) {
    if (!fullDiary[date].productsNames?.length) continue;

    const nextSingleDayData = getNextSingleDayData(fullDiary, date);

    if (!nextSingleDayData) continue;

    const sortedSingleDayData = {
      productsNames: fullDiary[date].productsNames,
      comparedSkinCondition: nextSingleDayData.comparedSkinCondition,
      currentSkinCondition: nextSingleDayData.currentSkinCondition,
    };

    sortedFullDiary.push(sortedSingleDayData);
  }

  return sortedFullDiary;
};

const getDeteriorationAndImprovementValues = (singleDayData: SingleDayData) => {
  const { comparedSkinCondition, currentSkinCondition } = singleDayData;

  const deteriorated = {
    deteriorated: 1,
    improved: 0,
  };

  const improved = {
    deteriorated: 0,
    improved: 1,
  };

  if (comparedSkinCondition === SkinConditionValues.lower || comparedSkinCondition === SkinConditionValues.low) return { ...deteriorated };

  if (comparedSkinCondition === SkinConditionValues.higher || comparedSkinCondition === SkinConditionValues.high) return { ...improved };

  if (currentSkinCondition === SkinConditionValues.higher || currentSkinCondition === SkinConditionValues.high) return { ...improved };

  return { ...deteriorated };
};

const customAnalyzedPorduct = { timesEaten: 0, deterioration: 0, improvement: 0 };

const buildAnalyzedProduct = (singleDayData: SingleDayData, analyzedProducts: AnalyzedProducts) => {
  const { deteriorated, improved } = getDeteriorationAndImprovementValues(singleDayData);

  singleDayData.productsNames.forEach((product) => {
    const { timesEaten, deterioration, improvement } = analyzedProducts[product] || customAnalyzedPorduct;

    analyzedProducts[product] = {
      timesEaten: (+timesEaten + 1).toString(),
      deterioration: (+deterioration + deteriorated).toString(),
      improvement: (+improvement + improved).toString(),
    };
  });
};

export const getAnalyzedProducts = (sortedFullDiary: SingleDayData[]) => {
  let analyzedProducts: AnalyzedProducts = {};

  sortedFullDiary.forEach((singleDayData) => {
    buildAnalyzedProduct(singleDayData, analyzedProducts);
  });

  return analyzedProducts;
};

const getProductType = (harmfulnessProbability: string) => {
  if (+harmfulnessProbability >= 85) return 'red';

  if (+harmfulnessProbability >= 70) return 'orange';

  return 'yellow';
};

export const getSafeAndDangerousProducts = (analyzedProducts: AnalyzedProducts) => {
  const dangerousProducts: ModifiedAnalyzedProduct[] = [],
    safeProducts: ModifiedAnalyzedProduct[] = [];

  for (let product in analyzedProducts) {
    const productValues = analyzedProducts[product];
    const harmfulnessProbability = ((+productValues.deterioration / +productValues.timesEaten) * 100).toFixed();

    const type = getProductType(harmfulnessProbability);

    const modifiedAnalyzedProduct = {
      ...productValues,
      probability: harmfulnessProbability,
      type,
      name: product,
    };

    // if product was eaten less than 5 times it must be considered as safe, because it's too little data to find results reliable
    const isProductDangerous = +harmfulnessProbability > 50 && +modifiedAnalyzedProduct.timesEaten >= 5;

    const products = isProductDangerous ? dangerousProducts : safeProducts;
    products.push(modifiedAnalyzedProduct);
  }
  // sortProducts ranks products in order of probability (from low to high)
  return { safeProducts: getSortedProducts(safeProducts), dangerousProducts: getSortedProducts(dangerousProducts) };
};
