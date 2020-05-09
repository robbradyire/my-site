const shuffle = (array: any[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * TODO: There should be number limits by row, eg. for 5-row 1-75 bingo:
 * - Row 0: 1-15
 * - Row 1: 16-30
 * - Row 2: 31-45
 * - Row 3: 46-60
 * - Row 4: 61-75
 *
 * So for any row n with ceiling C, possible numbers should be within n*C+1 -> (n+1)*C
 */
export const generateNumbers = (size: number, ceiling: number) =>
  shuffle(
    Array(ceiling)
      .fill(0)
      .map((__value, i) => i + 1)
  ).slice(0, size * size);
