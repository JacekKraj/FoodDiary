import React from 'react';
import classnames from 'classnames';

import classes from './autoCompleteItem.module.scss';

interface Props {
  text: string;
  pickItem: (value: string) => void;
  active: boolean;
}

const AutoCompleteItem: React.FC<Props> = ({ text, pickItem, active }) => {
  return (
    <li
      className={classnames(classes.autoCompleteItem, active && classes.active)}
      onClick={() => pickItem(text)}
      data-test='component-auto-complete-item'
    >
      {text}
    </li>
  );
};
export default AutoCompleteItem;
