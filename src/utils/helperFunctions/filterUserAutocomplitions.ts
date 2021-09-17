import { UserAutocomplitions } from '../../redux/reducers/diaryReducer';

export const filterUserAutocomplitions = (inputValue: string, userAutocomplitions: UserAutocomplitions[]) => {
  const autocomplitionsToFilter = userAutocomplitions.map((el) => el.product);
  let lastingAutocomplitions = autocomplitionsToFilter.filter((el) => {
    return el.slice(0, inputValue.length) === inputValue;
  });
  if (!inputValue) {
    lastingAutocomplitions = [];
  }
  return lastingAutocomplitions;
};
