import { ActionTypes } from '../actionTypes/actionTypes';
import { Day, SkinConditionValues } from './../reducers/diaryReducer';

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

export type Action = AddProduct | ChangeDate | RemoveProduct | SetSkin | SaveDiary | ClearDiary | SetDiary;
