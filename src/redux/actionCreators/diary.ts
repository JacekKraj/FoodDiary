import { Dispatch } from 'redux';

import { fire } from '../../fireConfig';
import { Action, Day, SkinConditionValues, SkinConditonTypes } from './../actions/diary';
import { ActionTypes } from './../actionTypes/actionTypes';
import { modifyString } from '../../utils/helperFunctions/modifyString';
import { successToast, failToast } from '../../utils/toasts/toasts';

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
    const modifiedEmail = modifyString(userEmail);
    fire
      .database()
      .ref(`${modifiedEmail}/${date}`)
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

interface DiaryDay {
  [index: string]: Day;
}

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

export const saveDiary = (userEmail: string, currentDiary: DiaryDay, downloadedDiary: DiaryDay) => {
  return (dispatch: Dispatch<Action>) => {
    if (JSON.stringify(currentDiary) !== JSON.stringify(downloadedDiary)) {
      const modifiedEmail = modifyString(userEmail);
      const modifiedDays = findModifiedDays(currentDiary, downloadedDiary);
      Promise.all(
        modifiedDays.map((el) => {
          return fire
            .database()
            .ref(`/${modifiedEmail}/${Object.keys(el)[0]}`)
            .update(Object.values(el)[0]);
        })
      )
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

export const changeDate = (date: string, loading: boolean): Action => {
  return {
    type: ActionTypes.CHANGE_DATE,
    date,
    loading,
  };
};
