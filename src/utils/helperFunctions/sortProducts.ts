import { ModifiedAnalyzedProduct } from '../../redux/reducers/diaryReducer';

export const sortProducts = (products: ModifiedAnalyzedProduct[]) => {
  const compare = (a: ModifiedAnalyzedProduct, b: ModifiedAnalyzedProduct) => {
    if (a.probability > b.probability) {
      return -1;
    }
    if (a.probability < b.probability) {
      return 1;
    }
    return 0;
  };

  return products.sort(compare);
};
