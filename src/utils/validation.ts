interface BaseValidator<T> {
  validator: (input: T) => boolean;
}
interface Validator<T> extends BaseValidator<T> {
  errorMessage: string;
  getErrorMessage?: never;
}
interface DynamicErrorValidator<T> extends BaseValidator<T> {
  errorMessage?: never;
  getErrorMessage: (label: string) => string;
}

export type InputValidator<T> = Validator<T> | DynamicErrorValidator<T>;

export const isNumber: InputValidator<number> = {
  validator: (input) => !Number.isNaN(input),
  getErrorMessage: (label) => `${label} must be a number`,
};

export const nonZero: InputValidator<number> = {
  validator: (input) => input !== 0,
  getErrorMessage: (label) => `${label} can not be 0`,
};

export const atLeast = (
  target: number,
  errorMessage: string
): InputValidator<number> => ({
  validator: (input) => input >= target,
  errorMessage,
});

export const atMost = (
  target: number,
  errorMessage: string
): InputValidator<number> => ({
  validator: (input) => input <= target,
  errorMessage,
});
