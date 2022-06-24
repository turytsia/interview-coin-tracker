export const sortAscendingAlphabetical = (first, second) => {
  if (first > second) return 1;
  if (first < second) return -1;
  return 0;
};

export const sortDescendingAlphabetical = (first, second) => {
  if (first > second) return -1;
  if (first < second) return 1;
  return 0;
};

export const sortAscendingNumeric = (first, second) => {
  return first - second;
};

export const sortDescendingNumeric = (first, second) => {
  return second - first;
};
