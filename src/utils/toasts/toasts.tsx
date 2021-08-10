import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './toasts.module.scss';

export const successToast = (message: string) => {
  toast(`${message}`, {
    position: 'bottom-right',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: classes.success,
    progressClassName: classes.successProgress,
  });
};
