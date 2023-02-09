const isNumber = (value) => {
  return typeof value === "number" && isFinite(value);
};

const isAllNumbers = (arr) => {
  return arr.every((el) => {
    return isNumber(el);
  });
};

const sum = (a, b, c) => {
  if (!isAllNumbers([a, b, c])) {
    throw new Error();
  } else {
    return a + b + c;
  }
};

const curry = (func) => {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};
