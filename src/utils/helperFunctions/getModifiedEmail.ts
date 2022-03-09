export const getModifiedEmail = (email: string) => {
  return email.replace(/[.*+\-?^${}()|[\]@\\]/g, '');
};
