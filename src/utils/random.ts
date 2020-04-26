const shuffle = (array: any[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const generateNumbers = (size: number, ceiling: number) =>
  shuffle(
    Array(ceiling)
      .fill(0)
      .map((__value, i) => i + 1)
  ).slice(0, size * size);
