import { ActionTypes } from '../actionTypes/actionTypes';
import { ModalTypes } from './.././../modalMenager/ModalMenager';

interface ShowModal {
  type: ActionTypes.SHOW_MODAL;
  modalType: ModalTypes;
  props: object;
}

interface HideModal {
  type: ActionTypes.HIDE_MODAL;
}

export type Action = ShowModal | HideModal;
