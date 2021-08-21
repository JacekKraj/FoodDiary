export const getModifiedDate = (dateToModify?: Date) => {
  const date = dateToModify || new Date();
  const years = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${years}-${month}-${day}`;
};
