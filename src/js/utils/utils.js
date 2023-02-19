const roundNumber = (num, toNDecimalPlace = 8) => {
  const a = 10 ** toNDecimalPlace;
  const result = +(Math.round(num * a) / a).toFixed(toNDecimalPlace);
  return result;
};

export const divide = (a, b) => {
  const result = roundNumber(a / b);
  return String(result);
};

export const multiply = (a, b) => {
  const result = roundNumber(a * b);
  return String(result);
};

export const add = (a, b) => {
  const result = roundNumber(a + b);
  return String(result);
};

export const substract = (a, b) => {
  const result = roundNumber(a - b);
  return String(result);
};

export const getClass = (target) => {
  return target.classList[0];
};

export const getKeyType = (key) => {
  const isValidNumber = Number.isFinite(+key) && +key <= 9 && +key >= 0;
  return isValidNumber ? "number" : key;
};
