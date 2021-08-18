import React from 'react';

import classes from './autoCompleteItem.module.scss';

interface Props {
  text: string;
  pickItem: (value: string) => void;
}

const AutoCompleteItem: React.FC<Props> = ({ text, pickItem }) => {
  return (
    <li className={classes.autoCompleteItem} onClick={() => pickItem(text)}>
      {text}
    </li>
  );
};
export default AutoCompleteItem;
