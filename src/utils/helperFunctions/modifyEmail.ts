export const modifyEmail = (email: string) => {
  return email.replace(/[.*+\-?^${}()|[\]@\\]/g, '');
};
