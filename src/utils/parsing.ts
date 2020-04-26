const NUMBER_REGEX = /^\d+$/;

export const tryParseInt = (str: string) => {
  if (str === '') return NaN;
  return NUMBER_REGEX.test(str) ? Number(str) : NaN;
};
