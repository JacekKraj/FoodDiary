import { ActionTypes } from '../actionTypes/actionTypes';
import { Action } from './../actions/modals';
import { ModalTypes } from './.././../modalMenager/ModalMenager';

export const showModal = (type: ModalTypes, props: object = {}): Action => {
  return {
    type: ActionTypes.SHOW_MODAL,
    modalType: type,
    props,
  };
};

export const hideModal = (): Action => {
  return {
    type: ActionTypes.HIDE_MODAL,
  };
};
