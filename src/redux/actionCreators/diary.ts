import { Dispatch } from 'redux';

import { fire } from '../../fireConfig';
import { Action, SkinConditonTypes } from './../actions/diary';
import { SkinConditionValues, Day, DiaryDay, AddedProduct } from '../reducers/diaryReducer';
import { ActionTypes } from './../actionTypes/actionTypes';
import { modifyEmail } from '../../utils/helperFunctions/modifyEmail';
import { successToast, failToast } from '../../utils/toasts/toasts';

const setAnalysisLoading = (loading: boolean): Action => {
  return {
    type: ActionTypes.SET_ANALYSIS_LOADING,
    loading,
  };
};

export const addProduct = (product: string): Action => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    product,
  };
};

export const removeProduct = (product: string): Action => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    product,
  };
};

export const setDiary = (day: Day | null, date: string): Action => {
  return {
    type: ActionTypes.SET_DIARY,
    day,
    date,
  };
};

export const getDiary = (date: string, userEmail: string) => {
  return (dispatch: Dispatch<Action>) => {
    const modifiedEmail = modifyEmail(userEmail);
    fire
      .database()
      .ref(`${modifiedEmail}/diary/${date}`)
      .get()
      .then((snapshot) => {
        let day: Day | null = snapshot.val();
        if (day && !day.products) {
          day = { ...day, products: [] };
        }
        dispatch(setDiary(day, date));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const findModifiedDays = (currentDiary: DiaryDay, downloadedDiary: DiaryDay) => {
  const modifiedDays: DiaryDay[] = [];
  for (let date in currentDiary) {
    const day = currentDiary[date];
    const wasEdited = JSON.stringify(currentDiary[date]) !== JSON.stringify(downloadedDiary[date]);
    const isBasicDay = !day.products.length || day.currentSkinCondition === 50 || day.comparedSkinCondition === 50;
    if (!isBasicDay || wasEdited) {
      modifiedDays.push({ [date]: day });
    }
  }
  return modifiedDays;
};

export const saveDiary = (userEmail: string, currentDiary: DiaryDay, downloadedDiary: DiaryDay, autocomplitions: AddedProduct[]) => {
  return (dispatch: Dispatch<Action>) => {
    if (JSON.stringify(currentDiary) !== JSON.stringify(downloadedDiary)) {
      const modifiedEmail = modifyEmail(userEmail);
      const modifiedDays = findModifiedDays(currentDiary, downloadedDiary);
      Promise.all([
        ...modifiedDays.map((el) => {
          return fire
            .database()
            .ref(`/${modifiedEmail}/diary/${Object.keys(el)[0]}`)
            .update(Object.values(el)[0]);
        }),
        fire.database().ref(`/${modifiedEmail}/addedProductsList`).set(autocomplitions),
      ])
        .then(() => {
          dispatch({ type: ActionTypes.SAVE_DIARY });
          successToast('Your data has been saved.');
        })
        .catch((error: { message: string }) => {
          failToast(error.message);
        });
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

const analyzeDiary = (fullDiary: DiaryDay): Action => {
  return {
    type: ActionTypes.ANALYZE_DIARY,
    fullDiary: fullDiary,
  };
};

export const getFullDiary = (userEmail: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(setAnalysisLoading(true));
    const modifiedEmail = modifyEmail(userEmail);
    fire
      .database()
      .ref(`${modifiedEmail}/diary`)
      .get()
      .then((snapshot) => {
        dispatch(analyzeDiary(snapshot.val()));
        dispatch(setAnalysisLoading(false));
      })
      .catch(() => {
        dispatch(setAnalysisLoading(false));
      });
  };
};

const setAddedProductsListAction = (addedProductsList: AddedProduct[]): Action => {
  return {
    type: ActionTypes.SET_ADDED_PRODUCTS_LIST,
    addedProductsList,
  };
};

////////////////////////////////////// @@@@@@@@@@@@@@@@@@@@@@222

export const setAddedProductsList = (userEmail: string) => {
  return (dispatch: Dispatch<Action>) => {
    const modifiedEmail = modifyEmail(userEmail);
    fire
      .database()
      .ref(`${modifiedEmail}/addedProductsList`)
      .get()
      .then((snapshot) => {
        const addedProductsList = snapshot.val() as AddedProduct[];
        dispatch(setAddedProductsListAction(addedProductsList));
      })
      .catch(() => {});
  };
};

////////////////////////////////////// @@@@@@@@@@@@@@@@@@@@@@@2 22
