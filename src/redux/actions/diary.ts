import { ActionTypes } from '../actionTypes/actionTypes';
import { Day, SkinConditionValues, DiaryDay, AddedProduct } from './../reducers/diaryReducer';

interface AddProduct {
  type: ActionTypes.ADD_PRODUCT;
  product: string;
}

interface RemoveProduct {
  type: ActionTypes.REMOVE_PRODUCT;
  product: string;
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
  type: ActionTypes.SET_DIARY;
  day: Day | null;
  date: string;
}

interface ChangeDate {
  type: ActionTypes.CHANGE_DATE;
  date: string;
}

interface AnalyzeDiary {
  type: ActionTypes.ANALYZE_DIARY;
  fullDiary: DiaryDay;
}

interface SetAnalysisLoading {
  type: ActionTypes.SET_ANALYSIS_LOADING;
  loading: boolean;
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
  | AnalyzeDiary
  | SetAnalysisLoading;
