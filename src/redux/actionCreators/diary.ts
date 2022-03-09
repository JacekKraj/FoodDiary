import { Dispatch } from 'redux';

import { fire } from '../../fireConfig';
import { Action, SkinConditonTypes } from './../actions/diary';
import { SkinConditionValues, SingleDayData, DiaryDays, AddedProduct } from '../reducers/diaryReducer';
import { ActionTypes } from './../actionTypes/actionTypes';
import { successToast, failToast } from '../../utils/toasts/toasts';
import { RootState } from './../reducers';

const setIsAnalysisLoading = (isLoading: boolean): Action => {
  return {
    type: ActionTypes.SET_ANALYSIS_LOADING,
    isLoading,
  };
};

export const addProduct = (name: string): Action => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    name,
  };
};

export const removeProduct = (name: string): Action => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    name,
  };
};

export const setSingleDiaryDay = (data: SingleDayData | null, date: string): Action => {
  return {
    type: ActionTypes.SET_SINGLE_DIARY_DAY,
    data,
    date,
  };
};

export const downloadSingleDiaryDay = (date: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { userEmail } = getState().auth;

    const snapshot = await fire.database().ref(`${userEmail}/diary/${date}`).get();

    const singleDayData: SingleDayData | null = snapshot.val();

    dispatch(setSingleDiaryDay(singleDayData, date));
  };
};

const getModifiedDaysDates = (currentDiary: DiaryDays, downloadedDiary: DiaryDays) => {
  const modifiedDays: string[] = [];

  for (let date in currentDiary) {
    const day = currentDiary[date];
    const isEdited = JSON.stringify(currentDiary[date]) !== JSON.stringify(downloadedDiary[date]);
    const isBasicDay = !day.productsNames.length && day.currentSkinCondition === 50 && day.comparedSkinCondition === 50;

    if (!isBasicDay || isEdited) {
      modifiedDays.push(date);
    }
  }
  return modifiedDays;
};

export const saveDiary = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { userEmail } = getState().auth;
    const { currentDiary, downloadedDiary, addedProductsList } = getState().diary;

    if (JSON.stringify(currentDiary) === JSON.stringify(downloadedDiary)) return;

    const modifiedDaysDates = getModifiedDaysDates(currentDiary, downloadedDiary);

    try {
      await Promise.all([
        ...modifiedDaysDates.map((date) => {
          return fire.database().ref(`/${userEmail}/diary/${date}`).update(currentDiary[date]);
        }),
        fire.database().ref(`/${userEmail}/addedProductsList`).set(addedProductsList),
      ]);

      dispatch({ type: ActionTypes.SAVE_DIARY });
      successToast('Your data has been saved.');
    } catch (error) {
      let message = 'Failed to save.';

      if (error instanceof Error) {
        message = error.message;
      }
      failToast(message);
    }
  };
};

export const clearDiary = (): Action => {
  return {
    type: ActionTypes.CLEAR_DIARY,
  };
};

export const setSkin = (condition: SkinConditionValues, skinType: SkinConditonTypes): Action => {
  return {
    type: ActionTypes.SET_SKIN,
    condition,
    skinType,
  };
};

export const changeDate = (date: string): Action => {
  return {
    type: ActionTypes.CHANGE_DATE,
    date,
  };
};

const analyzeFullDiary = (fullDiary: DiaryDays): Action => {
  return {
    type: ActionTypes.ANALYZE_FULL_DIARY,
    fullDiary,
  };
};

export const getFullDiary = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { userEmail } = getState().auth;

    dispatch(setIsAnalysisLoading(true));

    try {
      const snapshot = await fire.database().ref(`${userEmail}/diary`).get();

      const fullDiary = snapshot.val();

      dispatch(analyzeFullDiary(fullDiary));
      dispatch(setIsAnalysisLoading(false));
    } catch (_) {
      dispatch(setIsAnalysisLoading(false));
    }
  };
};

const setAddedProductsListAction = (addedProductsList: AddedProduct[]): Action => {
  return {
    type: ActionTypes.SET_ADDED_PRODUCTS_LIST,
    addedProductsList,
  };
};

export const setAddedProductsList = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { userEmail } = getState().auth;

    try {
      const snapshot = await fire.database().ref(`${userEmail}/addedProductsList`).get();

      const addedProductsList = snapshot.val() as AddedProduct[];

      dispatch(setAddedProductsListAction(addedProductsList));
    } catch (_) {}
  };
};
