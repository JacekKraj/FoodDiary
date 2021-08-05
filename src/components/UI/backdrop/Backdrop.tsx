import React from 'react';

import classes from './backdrop.module.scss';

interface Props {
  onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

export default Backdrop;
