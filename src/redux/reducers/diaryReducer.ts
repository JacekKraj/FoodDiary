import { ActionTypes } from '../actionTypes/actionTypes';
import { Action } from '../actions/diary';
import { getModifiedDate } from '../../utils/helperFunctions/getModifiedDate';
import {
  getSortedFullDiary,
  getAnalyzedProducts,
  getSafeAndDangerousProducts,
  getUpdatedAddedProductsList,
} from '../../utils/helperFunctions/diaryReducer';

export enum SkinConditionValues {
  lower = 0,
  low = 25,
  medium = 50,
  high = 75,
  higher = 100,
}

export interface SingleDayData {
  productsNames: string[];
  currentSkinCondition: SkinConditionValues;
  comparedSkinCondition: SkinConditionValues;
}

export interface DiaryDays {
  [index: string]: SingleDayData;
}

interface AnalyzedProduct {
  timesEaten: string;
  deterioration: string;
  improvement: string;
}

export interface AnalyzedProducts {
  [index: string]: AnalyzedProduct;
}

export type ModifiedAnalyzedProduct = {
  type: string;
  probability: string;
  name: string;
} & AnalyzedProduct;

const customDayData = {
  productsNames: [],
  currentSkinCondition: SkinConditionValues.medium,
  comparedSkinCondition: SkinConditionValues.medium,
};

export interface AddedProduct {
  name: string;
  timesAdded: number;
}

interface InitialState {
  currentDate: string;
  // downloaded diary contains data which came from server (or recently saved data) to compare it  with actual data (while saving)
  // in order to see if any changes were made
  downloadedDiary: DiaryDays;
  currentDiary: DiaryDays;
  isDiaryLoading: boolean;
  isAnalysisLoading: boolean;
  // safe products contains also products with probability higher than 50% but which were eaten to little times to find the results reliable
  safeProducts: ModifiedAnalyzedProduct[];
  dangerousProducts: ModifiedAnalyzedProduct[];
  addedProductsList: AddedProduct[];
}

const initialState: InitialState = {
  isDiaryLoading: true,
  isAnalysisLoading: true,
  currentDiary: {},
  currentDate: getModifiedDate(),
  downloadedDiary: {},
  safeProducts: [],
  dangerousProducts: [],
  addedProductsList: [],
};

const diaryReducer = (state: InitialState = initialState, action: Action): InitialState => {
  let currProducts: string[];
  let newProducts: string[];
  let diary: DiaryDays;
  let updatedAddedProductsList: AddedProduct[];
  switch (action.type) {
    case ActionTypes.SET_SINGLE_DIARY_DAY:
      const singleDiaryDay = { [action.date]: action.data || customDayData };

      if (!action.data?.productsNames) {
        singleDiaryDay[action.date].productsNames = [];
      }

      return {
        ...state,
        isDiaryLoading: false,
        currentDiary: {
          ...state.currentDiary,
          ...singleDiaryDay,
        },
        downloadedDiary: {
          ...state.downloadedDiary,
          ...singleDiaryDay,
        },
      };
    case ActionTypes.ADD_PRODUCT:
      currProducts = state.currentDiary[state.currentDate].productsNames;
      const isProductExistingOnThatDay = !!currProducts.find((name) => name === action.name);
      newProducts = isProductExistingOnThatDay ? currProducts : [...currProducts, action.name];

      updatedAddedProductsList = getUpdatedAddedProductsList(
        { name: action.name, isExisting: isProductExistingOnThatDay, operation: 'add' },
        state.addedProductsList
      );

      return {
        ...state,
        addedProductsList: updatedAddedProductsList,
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            productsNames: newProducts,
          },
        },
      };
    case ActionTypes.REMOVE_PRODUCT:
      currProducts = state.currentDiary[state.currentDate].productsNames;
      newProducts = currProducts.filter((name) => name !== action.name);

      updatedAddedProductsList = getUpdatedAddedProductsList({ name: action.name, isExisting: true, operation: 'remove' }, state.addedProductsList);

      return {
        ...state,
        addedProductsList: updatedAddedProductsList,
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            productsNames: newProducts,
          },
        },
      };
    case ActionTypes.SAVE_DIARY:
      return {
        ...state,
        downloadedDiary: {
          ...state.currentDiary,
        },
      };
    case ActionTypes.CLEAR_DIARY:
      const getClearedAddedProductsList = () => {
        const productsToBeRemovedNames = state.currentDiary[state.currentDate].productsNames;

        const newAddedProductsList = [...state.addedProductsList].map((product) => {
          if (productsToBeRemovedNames.includes(product.name)) {
            product.timesAdded -= 1;
          }
          return product;
        });

        return newAddedProductsList.filter((product) => product.timesAdded);
      };

      return {
        ...state,
        addedProductsList: getClearedAddedProductsList(),
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...customDayData,
          },
        },
      };
    case ActionTypes.SET_SKIN:
      return {
        ...state,
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            [action.skinType]: action.condition,
          },
        },
      };
    case ActionTypes.CHANGE_DATE:
      diary = { [action.date]: state.currentDiary[action.date] || customDayData };
      return {
        ...state,
        isDiaryLoading: !state.currentDiary[action.date],
        currentDate: action.date,
        currentDiary: {
          ...state.currentDiary,
          ...diary,
        },
      };
    case ActionTypes.SET_ANALYSIS_LOADING:
      return {
        ...state,
        isAnalysisLoading: action.isLoading,
      };
    case ActionTypes.ANALYZE_FULL_DIARY:
      const sortedFullDiary = getSortedFullDiary(action.fullDiary);
      const analyzedProducts = getAnalyzedProducts(sortedFullDiary);
      const { dangerousProducts, safeProducts } = getSafeAndDangerousProducts(analyzedProducts);
      return {
        ...state,
        dangerousProducts,
        safeProducts,
      };
    case ActionTypes.SET_ADDED_PRODUCTS_LIST:
      return {
        ...state,
        addedProductsList: action.addedProductsList || [],
      };
    default:
      return state;
  }
};

export default diaryReducer;
