import React from 'react';
import classnames from 'classnames';

import classes from './autoCompleteItem.module.scss';

interface Props {
  text: string;
  pickItem: (value: string) => void;
  isActive: boolean;
}

const AutoCompleteItem: React.FC<Props> = ({ text, pickItem, isActive }) => {
  return (
    <li
      className={classnames(classes.autoCompleteItem, isActive && classes.active)}
      onClick={() => pickItem(text)}
      data-test='component-auto-complete-item'
    >
      {text}
    </li>
  );
};
export default AutoCompleteItem;
