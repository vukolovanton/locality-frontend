export const validateObjectValues = (
  objectToValidate: Object,
  callback: (s: string) => void
): boolean => {
  let isValid = true;
  const values: Array<string> = Object.values(objectToValidate);
  values.forEach((value) => {
    if (!value) {
      isValid = false;
      callback("Review your entities and try again");
    }
  });

  return isValid;
};
