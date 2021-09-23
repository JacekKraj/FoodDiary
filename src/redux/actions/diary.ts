import { ActionTypes } from '../actionTypes/actionTypes';
import { Day, SkinConditionValues, DiaryDay, UserAutocomplitions } from './../reducers/diaryReducer';

interface ChangeDate {
  type: ActionTypes.CHANGE_DATE;
  date: string;
  loading: boolean;
}

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
  loading: boolean;
}

interface AnalyzeDiary {
  type: ActionTypes.ANALYZE_DIARY;
  fullDiary: DiaryDay;
}

interface SetAnalysisLoading {
  type: ActionTypes.SET_ANALYSIS_LOADING;
  loading: boolean;
}

interface SetUserAutocomplitions {
  type: ActionTypes.SET_USER_AUTOCOMPLITIONS;
  autocomplitions: UserAutocomplitions[];
}

export type Action =
  | SetUserAutocomplitions
  | AddProduct
  | ChangeDate
  | RemoveProduct
  | SetSkin
  | SaveDiary
  | ClearDiary
  | SetDiary
  | AnalyzeDiary
  | SetAnalysisLoading;
