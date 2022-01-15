import { ModalTypes } from './../../modalMenager/ModalMenager';
import { Action } from './../actions/modals';
import { ActionTypes } from './../actionTypes/actionTypes';

interface InitialState {
  modalType: ModalTypes;
  props: object;
}

const initialState: InitialState = {
  modalType: '',
  props: {},
};

const modalsReducer = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case ActionTypes.SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        props: action.props,
      };
    case ActionTypes.HIDE_MODAL:
      return {
        ...state,
        modalType: '',
        props: {},
      };
    default:
      return state;
  }
};

export default modalsReducer;
