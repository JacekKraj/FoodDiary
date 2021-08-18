import React from 'react';
import axios from 'axios';

import classes from './inputAutoComplete.module.scss';
import AutoCompleteItem from './autoCompletItem/AutoCompleteItem';

interface Props {
  value: string;
  pickItem: (value: string) => void;
  focus: boolean;
}

const InputAutoComplete: React.FC<Props> = ({ value, pickItem, focus }) => {
  const [foundItems, setFoundItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios.get<string[]>(`https://api.edamam.com/auto-complete?q=${value}`).then((response) => {
      setFoundItems(response.data.slice(0, 4));
    });
  }, [value.trim()]);

  return (
    <React.Fragment>
      {foundItems.length && focus ? (
        <ul className={classes.inputAutoComplete}>
          {foundItems.map((el: string) => {
            return <AutoCompleteItem text={el} key={el} pickItem={pickItem} />;
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default InputAutoComplete;
