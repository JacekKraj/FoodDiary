import { ActionTypes } from '../actionTypes/actionTypes';

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

export type SkinConditonTypes = 'currentSkinConditon' | 'comparedSkinCondition';
export type SkinConditionValues = 0 | 25 | 50 | 75 | 100;

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

export interface Day {
  products: string[];
  currentSkinCondition: SkinConditionValues;
  comparedSkinCondition: SkinConditionValues;
}

interface SetDiary {
  type: ActionTypes.SET_DIARY;
  day: Day | null;
  date: string;
}

export type Action = AddProduct | ChangeDate | RemoveProduct | SetSkin | SaveDiary | ClearDiary | SetDiary;
