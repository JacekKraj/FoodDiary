import { UserAutocomplitions } from '../../redux/reducers/diaryReducer';

export const filterUserAutocomplitions = (inputValue: string, userAutocomplitions: UserAutocomplitions[]) => {
  const modifiedValue = inputValue.replace(/\s+/g, ' ').trim();
  const autocomplitionsToFilter = userAutocomplitions.map((el) => el.product);
  let lastingAutocomplitions = autocomplitionsToFilter.filter((autocomplition) => {
    let foundMatchingWord = false;
    // check if whole autocomplition matches input value
    foundMatchingWord = autocomplition.slice(0, modifiedValue.length) === modifiedValue;
    // if whole autocomplition doesn't match, check single words and return
    return (
      foundMatchingWord ||
      !!autocomplition.split(' ').filter((el) => {
        return el.slice(0, modifiedValue.length) === modifiedValue;
      })[0]
    );
  });
  if (!modifiedValue) {
    lastingAutocomplitions = [];
  }
  return lastingAutocomplitions;
};
