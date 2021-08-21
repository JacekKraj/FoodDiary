import { ActionTypes } from './../actionTypes/actionTypes';
import { Action, Day, SkinConditionValues } from './../actions/diary';
import { getModifiedDate } from '../../utils/helperFunctions/getModifiedDate';

interface DiaryDay {
  [index: string]: Day;
}

interface InitialState {
  currentDate: string;
  // downloaded diary contains data which came from server (or recently saved data) to compare it  with actual data (while saving)
  // in order to see if any changes were made
  downloadedDiary: DiaryDay;
  currentDiary: DiaryDay;
  loading: boolean;
}

const initialState: InitialState = {
  loading: true,
  currentDiary: {
    [getModifiedDate()]: {
      products: [],
      currentSkinCondition: 50,
      comparedSkinCondition: 50,
    },
  },
  currentDate: getModifiedDate(),
  downloadedDiary: {},
};

const diaryReducer = (state: InitialState = initialState, action: Action) => {
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
        loading: false,
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
            currentSkinCondition: 50 as SkinConditionValues,
            comparedSkinCondition: 50 as SkinConditionValues,
            products: [],
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
              products: [],
              currentSkinCondition: 50 as SkinConditionValues,
              comparedSkinCondition: 50 as SkinConditionValues,
            },
          };
      return {
        ...state,
        loading: action.loading,
        currentDate: action.date,
        currentDiary: {
          ...state.currentDiary,
          ...diary,
        },
      };
    default:
      return state;
  }
};

export default diaryReducer;
