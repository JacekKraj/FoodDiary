import { AddedProduct } from '../../redux/reducers/diaryReducer';
import { modifyProductName } from './modifyProductName';

const getFilteredAddedProductsNames = (modifiedInputValue: string, addedProductsNames: string[]) => {
  if (!modifiedInputValue) {
    return [];
  }

  const filteredAddedProductsNames = addedProductsNames.filter((name) => {
    let isMatchingWordFound = false;
    // check if whole name matches input value
    isMatchingWordFound = name.slice(0, modifiedInputValue.length) === modifiedInputValue;
    // if whole name doesn't match, check single words and return
    return (
      isMatchingWordFound ||
      !!name.split(' ').filter((namePart) => {
        return namePart.slice(0, modifiedInputValue.length) === modifiedInputValue;
      })[0]
    );
  });

  return filteredAddedProductsNames;
};

export const getMatchingAddedProductsNames = (inputValue: string, addedProducts: AddedProduct[]) => {
  const modifiedInputValue = modifyProductName(inputValue);

  const addedProductsNames = addedProducts.map((product) => product.name);

  const matchingAddedProducts = getFilteredAddedProductsNames(modifiedInputValue, addedProductsNames);

  return matchingAddedProducts;
};
