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
  setValue: React.Dispatch<React.SetStateAction<string>>;
  typed: boolean;
  setTyped: React.Dispatch<React.SetStateAction<boolean>>;
  activeSuggestion: number;
  setActiveSuggestion: React.Dispatch<React.SetStateAction<number>>;
}

const InputAutoComplete: React.FC<Props> = (props) => {
  const { value, pickItem, focus, setValue, typed, setTyped, activeSuggestion, setActiveSuggestion } = props;
  const [foundItems, setFoundItems] = React.useState<string[]>([]);
  const { userAutocomplitions } = useTypedSelector((state) => state.diary);

  React.useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (focus && foundItems.length) {
        let newSuggestionIndex = activeSuggestion;

        if (e.key === 'ArrowDown') {
          newSuggestionIndex += 1;
          newSuggestionIndex = newSuggestionIndex > foundItems.length ? 1 : newSuggestionIndex;
          setTyped(false);
          setValue(foundItems[newSuggestionIndex - 1]);
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          newSuggestionIndex -= 1;
          newSuggestionIndex = newSuggestionIndex === 0 ? (newSuggestionIndex = foundItems.length) : newSuggestionIndex;
          setValue(foundItems[newSuggestionIndex - 1]);
          setTyped(false);
        }

        setActiveSuggestion(newSuggestionIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [foundItems, activeSuggestion]);

  React.useEffect(() => {
    const axiosRequest = axios.CancelToken.source();
    if (typed) {
      axios
        .get<string[]>(`https://api.edamam.com/auto-complete?q=${value}`, {
          cancelToken: axiosRequest.token,
        })
        .then((response) => {
          const newFoundItems = [...filterUserAutocomplitions(value, userAutocomplitions)];
          // check if suggestions from API aren't already included in user autocomplitions
          response.data.forEach((el) => {
            !newFoundItems.includes(el) && newFoundItems.push(el);
          });
          setFoundItems(newFoundItems.slice(0, 4));
        })
        .catch(() => {});
    }
    return () => {
      axiosRequest.cancel();
    };
  }, [value, typed]);

  return (
    <div>
      {foundItems.length && focus ? (
        <ul className={classes.inputAutoComplete}>
          {foundItems.map((el: string, index: number) => {
            return <AutoCompleteItem text={el} key={el} pickItem={pickItem} active={index + 1 === activeSuggestion} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};
export default InputAutoComplete;
