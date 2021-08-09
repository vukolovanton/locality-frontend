export const validateObjectValues = (
  objectToValidate: Object,
  callback: (s: string) => void
) => {
  const values: Array<string> = Object.values(objectToValidate);
  values.forEach((value) => {
    if (!value) {
      callback("Review your entities and try again bitch");
    }
  });
};
