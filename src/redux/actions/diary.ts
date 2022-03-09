import { ActionTypes } from '../actionTypes/actionTypes';
import { SingleDayData, SkinConditionValues, DiaryDays, AddedProduct } from './../reducers/diaryReducer';

interface AddProduct {
  type: ActionTypes.ADD_PRODUCT;
  name: string;
}

interface RemoveProduct {
  type: ActionTypes.REMOVE_PRODUCT;
  name: string;
}

export type SkinConditonTypes = 'currentSkinCondition' | 'comparedSkinCondition';

interface SetSkin {
  type: ActionTypes.SET_SKIN;
  condition: SkinConditionValues;
  skinType: SkinConditonTypes;
}

interface SaveDiary {
  type: ActionTypes.SAVE_DIARY;
}

interface ClearDiary {
  type: ActionTypes.CLEAR_DIARY;
}

interface SetDiary {
  type: ActionTypes.SET_SINGLE_DIARY_DAY;
  data: SingleDayData | null;
  date: string;
}

interface ChangeDate {
  type: ActionTypes.CHANGE_DATE;
  date: string;
}

interface AnalyzeFullDiary {
  type: ActionTypes.ANALYZE_FULL_DIARY;
  fullDiary: DiaryDays;
}

interface SetIsAnalysisLoading {
  type: ActionTypes.SET_ANALYSIS_LOADING;
  isLoading: boolean;
}

interface SetAddedProductsList {
  type: ActionTypes.SET_ADDED_PRODUCTS_LIST;
  addedProductsList: AddedProduct[];
}

export type Action =
  | SetAddedProductsList
  | AddProduct
  | ChangeDate
  | RemoveProduct
  | SetSkin
  | SaveDiary
  | ClearDiary
  | SetDiary
  | AnalyzeFullDiary
  | SetIsAnalysisLoading;
