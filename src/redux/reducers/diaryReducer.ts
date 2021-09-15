import { ActionTypes } from '../actionTypes/actionTypes';
import { Action } from '../actions/diary';
import { getModifiedDate } from '../../utils/helperFunctions/getModifiedDate';
import { sortFullDiary, analyzeProducts, modifyAnalyzedProducts } from '../../utils/helperFunctions/diaryReducer';
import { orange } from '@material-ui/core/colors';

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

interface InitialState {
  currentDate: string;
  // downloaded diary contains data which came from server (or recently saved data) to compare it  with actual data (while saving)
  // in order to see if any changes were made
  downloadedDiary: DiaryDay;
  currentDiary: DiaryDay;
  diaryLoading: boolean;
  analysisLoading: boolean;
  // safe products contains also products with probability higher than 50% but were eaten to little times to find the resultsa reliable
  safeProducts: ModifiedAnalyzedProduct[];
  dangerousProducts: ModifiedAnalyzedProduct[];
}

const initialState: InitialState = {
  diaryLoading: true,
  analysisLoading: true,
  currentDiary: {
    [getModifiedDate()]: {
      ...customDay,
    },
  },
  currentDate: getModifiedDate(),
  downloadedDiary: {},
  safeProducts: [],
  dangerousProducts: [],
};

const diaryReducer = (state: InitialState = initialState, action: Action): InitialState => {
  let currProducts: string[];
  let newProducts: string[];
  let diary: DiaryDay;
  switch (action.type) {
    case ActionTypes.SET_DIARY:
      diary = { [action.date]: { ...state.currentDiary[action.date] } };
      if (action.day) {
        diary = { [action.date]: { ...action.day } };
      }
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
      currProducts = state.currentDiary[state.currentDate].products;
      const isExisting = !!currProducts.find((el) => el === action.product);
      newProducts = isExisting ? currProducts : [...currProducts, action.product];
      return {
        ...state,
        currentDiary: {
          ...state.currentDiary,
          [state.currentDate]: {
            ...state.currentDiary[state.currentDate],
            products: newProducts,
          },
        },
      };
    case ActionTypes.REMOVE_PRODUCT:
      currProducts = state.currentDiary[state.currentDate].products;
      newProducts = currProducts.filter((el) => el !== action.product);

      return {
        ...state,
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
      return {
        ...state,
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
      diary = state.currentDiary[action.date]
        ? { [action.date]: { ...state.currentDiary[action.date] } }
        : {
            [action.date]: {
              ...customDay,
            },
          };
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
    case ActionTypes.SET_FULL_DIARY:
      const sortedFullDiary = sortFullDiary(action.fullDiary);
      const analyzedProducts = analyzeProducts(sortedFullDiary);
      const { dangerousProducts, safeProducts } = modifyAnalyzedProducts(analyzedProducts);
      return {
        ...state,
        dangerousProducts,
        safeProducts,
      };
    default:
      return state;
  }
};

export default diaryReducer;
