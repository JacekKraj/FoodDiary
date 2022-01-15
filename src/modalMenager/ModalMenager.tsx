import React from 'react';

import SignInModal from '../components/authentication/signInModal/SignInModal';
import SignUpModal from '../components/authentication/signUpModal/SignUpModal';
import Backdrop from '../components/UI/backdrop/Backdrop';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';
import { useActions } from '../redux/hooks/useActions';

export const MODAL_TYPES = {
  SIGN_UP: 'SIGN_UP' as const,
  SIGN_IN: 'SIGN_IN' as const,
};

export type ModalTypes = keyof typeof MODAL_TYPES | '';

const MODAL_COMPONENTS = {
  [MODAL_TYPES.SIGN_UP]: SignUpModal,
  [MODAL_TYPES.SIGN_IN]: SignInModal,
};

const ModalMenager: React.FC = () => {
  const { modalType } = useTypedSelector((state) => state.modals);
  const { hideModal } = useActions();

  const renderModal = () => {
    if (!modalType) return <div></div>;

    const ModalComponent = MODAL_COMPONENTS[modalType];

    return (
      <React.Fragment>
        <ModalComponent />
        <Backdrop onClick={hideModal} />
      </React.Fragment>
    );
  };

  return renderModal();
};

export default ModalMenager;
