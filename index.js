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
class Calculator {
  constructor(x, y) {
    if (isAllNumbers([x, y])) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error();
    }
  }
  setX = (x) => {
    if (!isNumber(x)) {
      throw new Error();
    } else {
      this.x = x;
    }
  };
  setY = (y) => {
    if (!isNumber(y)) {
      throw new Error();
    } else {
      this.y = y;
    }
  };
  getSum = () => {
    return this.x + this.y;
  };
  getSub = () => {
    return this.x - this.y;
  };
  getMul = () => {
    return this.x * this.y;
  };
  getDiv = () => {
    if (this.y === 0) {
      throw new Error();
    }
    return this.x / this.y;
  };
}
