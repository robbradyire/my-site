export type InputValidator<T> = {
  validator: (input: T) => boolean;
  getErrorMessage: (label: string) => string;
};

export const isNumber: InputValidator<number> = {
  validator: (input) => !Number.isNaN(input),
  getErrorMessage: (label) => `${label} must be a number`,
};

export const nonZero: InputValidator<number> = {
  validator: (input) => input !== 0,
  getErrorMessage: (label) => `${label} can not be 0`,
};
