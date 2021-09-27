import { ActionTypes } from '../actionTypes/actionTypes';
import { Action } from '../actions/diary';
import { getModifiedDate } from '../../utils/helperFunctions/getModifiedDate';
import { sortFullDiary, analyzeProducts, modifyAnalyzedProducts } from '../../utils/helperFunctions/diaryReducer';

export enum SkinConditionValues {
  lower = 0,
  low = 25,
  medium = 50,
  high = 75,
  higher = 100,
}

export interface Day {
  products: string[];
  currentSkinCondition: SkinConditionValues;
  comparedSkinCondition: SkinConditionValues;
}

export interface DiaryDay {
  [index: string]: Day;
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
  product: string;
} & AnalyzedProduct;

const customDay = {
  products: [],
  currentSkinCondition: SkinConditionValues.medium,
  comparedSkinCondition: SkinConditionValues.medium,
};

export interface UserAutocomplition {
  product: string;
  timesUsed: number;
}

interface InitialState {
  currentDate: string;
  // downloaded diary contains data which came from server (or recently saved data) to compare it  with actual data (while saving)
  // in order to see if any changes were made
  downloadedDiary: DiaryDay;
  currentDiary: DiaryDay;
  diaryLoading: boolean;
  analysisLoading: boolean;
  // safe products contains also products with probability higher than 50% but which were eaten to little times to find the resultsa reliable
  safeProducts: ModifiedAnalyzedProduct[];
  dangerousProducts: ModifiedAnalyzedProduct[];
  userAutocomplitions: UserAutocomplition[];
}

const initialState: InitialState = {
  diaryLoading: true,
  analysisLoading: true,
  currentDiary: {},
  currentDate: getModifiedDate(),
  downloadedDiary: {},
  safeProducts: [],
  dangerousProducts: [],
  userAutocomplitions: [],
};

const diaryReducer = (state: InitialState = initialState, action: Action): InitialState => {
  let currProducts: string[];
  let newProducts: string[];
  let diary: DiaryDay;
  switch (action.type) {
    case ActionTypes.SET_DIARY:
      diary = { [action.date]: action.day || customDay };
      return {
        ...state,
        diaryLoading: false,
        currentDiary: {
          ...state.currentDiary,
          ...diary,
        },
        downloadedDiary: {
          ...state.downloadedDiary,
          ...diary,
        },
      };
    case ActionTypes.ADD_PRODUCT:
      // adding product
      currProducts = state.currentDiary[state.currentDate].products;
      const isExisting = !!currProducts.find((el) => el === action.product);
      newProducts = isExisting ? currProducts : [...currProducts, action.product];
      // updating userAutocomplitions
      const addAutocomplition = () => {
        const newAutocomplitions = [...state.userAutocomplitions];
        if (!isExisting) {
          const autocomplitionIndex = newAutocomplitions.findIndex((el) => el.product === action.product);
          const autocomplition = newAutocomplitions[autocomplitionIndex] || {
            product: action.product,
            timesUsed: 0,
          };
          autocomplition.timesUsed += 1;
          const currentIndex = autocomplitionIndex >= 0 ? autocomplitionIndex : newAutocomplitions.length;
          newAutocomplitions[currentIndex] = autocomplition;
        }
        return newAutocomplitions;
      };
      return {
        ...state,
        userAutocomplitions: addAutocomplition(),
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            products: newProducts,
          },
        },
      };
    case ActionTypes.REMOVE_PRODUCT:
      // remove product
      currProducts = state.currentDiary[state.currentDate].products;
      newProducts = currProducts.filter((el) => el !== action.product);
      // update userAutocomplitions
      const removeAutocomplition = () => {
        let newAutocomplitions = [...state.userAutocomplitions];
        const autocompliton = newAutocomplitions.filter((el) => el.product === action.product)[0];
        autocompliton.timesUsed -= 1;
        if (!autocompliton.timesUsed) {
          newAutocomplitions = newAutocomplitions.filter((el) => el.product !== action.product);
        }
        return newAutocomplitions;
      };
      return {
        ...state,
        userAutocomplitions: removeAutocomplition(),
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            products: newProducts,
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
      const clearAutocomplitions = () => {
        let newAutocomplitions = [...state.userAutocomplitions];
        const removedProducts = state.currentDiary[state.currentDate].products;
        newAutocomplitions = newAutocomplitions.map((el) => {
          if (removedProducts.includes(el.product)) {
            el.timesUsed -= 1;
          }
          return el;
        });
        return newAutocomplitions.filter((el) => el.timesUsed);
      };

      return {
        ...state,
        userAutocomplitions: clearAutocomplitions(),
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...customDay,
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
      diary = { [action.date]: state.currentDiary[action.date] || customDay };
      return {
        ...state,
        diaryLoading: action.loading,
        currentDate: action.date,
        currentDiary: {
          ...state.currentDiary,
          ...diary,
        },
      };
    case ActionTypes.SET_ANALYSIS_LOADING:
      return {
        ...state,
        analysisLoading: action.loading,
      };
    case ActionTypes.ANALYZE_DIARY:
      const sortedFullDiary = sortFullDiary(action.fullDiary);
      const analyzedProducts = analyzeProducts(sortedFullDiary);
      const { dangerousProducts, safeProducts } = modifyAnalyzedProducts(analyzedProducts);
      return {
        ...state,
        dangerousProducts,
        safeProducts,
      };
    case ActionTypes.SET_USER_AUTOCOMPLITIONS:
      return {
        ...state,
        userAutocomplitions: action.autocomplitions || [],
      };
    default:
      return state;
  }
};

export default diaryReducer;
