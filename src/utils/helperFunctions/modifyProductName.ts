export const modifyProductName = (name: string) => {
  return name
    .replace(/\s+/g, ' ')
    .replace(/[.?^${}()/|[\]@\\]/g, '')
    .trim()
    .toLocaleLowerCase();
};
