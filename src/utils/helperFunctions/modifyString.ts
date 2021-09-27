export const modifyString = (string: string) => {
  return string.replace(/[.*+\-?^${}()|[\]@\\]/g, '');
};
