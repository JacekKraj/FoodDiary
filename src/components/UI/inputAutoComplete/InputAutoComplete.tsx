import React from 'react';
import axios from 'axios';

import classes from './inputAutoComplete.module.scss';
import AutoCompleteItem from './autoCompletItem/AutoCompleteItem';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';
import { getMatchingAddedProductsNames } from '../../../utils/helperFunctions/getMatchingAddedProductsNames';
import { modifyProductName } from './../../../utils/helperFunctions/modifyProductName';

interface Props {
  input: { value: string; setValue: React.Dispatch<React.SetStateAction<string>>; isFocused: boolean };
  pickItem: (value: string) => void;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  activeSuggestion: { index: number; setIndex: React.Dispatch<React.SetStateAction<number>> };
}

const InputAutoComplete: React.FC<Props> = (props) => {
  const { input, pickItem, isTyping, setIsTyping, activeSuggestion } = props;
  const [autocomplitions, setAutocomplitions] = React.useState<string[]>([]);
  const { addedProductsList } = useTypedSelector((state) => state.diary);

  React.useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!input.isFocused || !autocomplitions.length) return;

      let newSuggestionIndex = activeSuggestion.index;

      if (e.key === 'ArrowDown') {
        newSuggestionIndex = newSuggestionIndex + 1 > autocomplitions.length ? 1 : newSuggestionIndex + 1;
        input.setValue(autocomplitions[newSuggestionIndex - 1]);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        newSuggestionIndex = newSuggestionIndex - 1 <= 0 ? autocomplitions.length : newSuggestionIndex - 1;
        input.setValue(autocomplitions[newSuggestionIndex - 1]);
      }

      setIsTyping(false);
      activeSuggestion.setIndex(newSuggestionIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [autocomplitions, activeSuggestion]);

  React.useEffect(() => {
    const axiosRequest = axios.CancelToken.source();

    if (!isTyping) return;

    const updateAutocomplitions = async () => {
      const autocomplitinsFromAddedProductsList = [...getMatchingAddedProductsNames(input.value, addedProductsList)];

      try {
        const response = await axios.get<string[]>(`https://api.edamam.com/auto-complete?q=${modifyProductName(input.value)}`, {
          cancelToken: axiosRequest.token,
        });

        const autocomplitionsFromAPI = response.data;

        const connectedAutocomplitions = [...autocomplitinsFromAddedProductsList];

        autocomplitionsFromAPI.forEach((autocomplition) => {
          if (!connectedAutocomplitions.includes(autocomplition)) {
            connectedAutocomplitions.push(autocomplition);
          }
        });

        setAutocomplitions(connectedAutocomplitions.slice(0, 4));
      } catch (_) {
        setAutocomplitions(autocomplitinsFromAddedProductsList.slice(0, 4));
      }
    };

    updateAutocomplitions();

    return () => {
      axiosRequest.cancel();
    };
  }, [input.value, isTyping]);

  return (
    <div>
      {autocomplitions.length && input.isFocused ? (
        <ul className={classes.inputAutoComplete}>
          {autocomplitions.map((text: string, index: number) => {
            return <AutoCompleteItem text={text} key={text} pickItem={pickItem} isActive={index + 1 === activeSuggestion.index} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};
export default InputAutoComplete;
