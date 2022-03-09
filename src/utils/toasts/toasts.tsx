import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './toasts.module.scss';

const commonParameters = {
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
};

export const successToast = (message: string) => {
  toast(`${message}`, {
    position: 'bottom-right',
    ...commonParameters,
    autoClose: 7000,
    className: classes.success,
    progressClassName: classes.successProgress,
  });
};

export const failToast = (message: string) => {
  toast(`${message}`, {
    ...commonParameters,
    position: 'bottom-right',
    autoClose: 5000,
    className: classes.fail,
    progressClassName: classes.failProgress,
  });
};
