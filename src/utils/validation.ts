interface BaseValidator<T> {
  validator: (input: T) => boolean;
  preconditions?: Validator<T>[];
}
export interface Validator<T> extends BaseValidator<T> {
  getErrorMessage: (label?: string) => string;
}

export const isNumber: Validator<number> = {
  validator: (input) => !Number.isNaN(input),
  getErrorMessage: (label) => `${label} must be a number`,
};

export const nonZero: Validator<number> = {
  validator: (input) => input !== 0,
  getErrorMessage: (label) => `${label} can not be 0`,
};

export const atLeast = (
  target: number,
  errorMessage: string
): Validator<number> => ({
  validator: (input) => input >= target,
  getErrorMessage: () => errorMessage,
  preconditions: [isNumber, nonZero],
});

export const atMost = (
  target: number,
  errorMessage: string
): Validator<number> => ({
  validator: (input) => input <= target,
  getErrorMessage: () => errorMessage,
  preconditions: [isNumber, nonZero],
});
