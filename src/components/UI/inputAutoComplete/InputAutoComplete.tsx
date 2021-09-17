import React from 'react';
import axios from 'axios';

import classes from './inputAutoComplete.module.scss';
import AutoCompleteItem from './autoCompletItem/AutoCompleteItem';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';
import { filterUserAutocomplitions } from './../../../utils/helperFunctions/filterUserAutocomplitions';

interface Props {
  value: string;
  pickItem: (value: string) => void;
  focus: boolean;
}

const InputAutoComplete: React.FC<Props> = ({ value, pickItem, focus }) => {
  const [foundItems, setFoundItems] = React.useState<string[]>([]);
  const { userAutocomplitions } = useTypedSelector((state) => state.diary);
  const trimmedValue = value.trim();

  React.useEffect(() => {
    axios.get<string[]>(`https://api.edamam.com/auto-complete?q=${value}`).then((response) => {
      const foundUserAutocomplitions = filterUserAutocomplitions(trimmedValue, userAutocomplitions);
      setFoundItems([...foundUserAutocomplitions, ...response.data].slice(0, 4));
    });
  }, [trimmedValue]);

  return (
    <div>
      {foundItems.length && focus ? (
        <ul className={classes.inputAutoComplete}>
          {foundItems.map((el: string) => {
            return <AutoCompleteItem text={el} key={el} pickItem={pickItem} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};
export default InputAutoComplete;
