const isObject = (value) => {
  return Object.prototype.toString.call(value) == "[object Object]";
};

const isArray = (value) => {
  return Object.prototype.toString.call(value) == "[object Array]";
};

const isPrimitive = (value) => {
  return value === null || typeof value !== "object";
};

const isDate = (value) => {
  return Object.prototype.toString.call(value) == "[object Date]";
};

const isMap = (value) => {
  return Object.prototype.toString.call(value) == "[object Map]";
};

const isSet = (value) => {
  return Object.prototype.toString.call(value) == "[object Set]";
};

const isFiniteNumber = (value) => {
  return Number.isFinite(value);
};

const isAllFinites = (arr) => {
  return arr.every((el) => {
    return isFiniteNumber(el);
  });
};

const isInteger = (value) => {
  return Number.isInteger(value) && Number.isSafeInteger(value);
};

const isAllIntegers = (arr) => {
  return arr.every((el) => {
    return isInteger(el);
  });
};

const isValidArray = (arr) => {
  return isArray(arr) && arr.length !== 0 ? isAllFinites(arr) : false;
};

const copyObject = (obj) => {
  if (isPrimitive(obj)) {
    return obj;
  } else if (isDate(obj)) {
    return new Date(obj);
  } else if (isArray(obj)) {
    return obj.map((el) => {
      return copyObject(el);
    });
  } else if (isMap(obj)) {
    const newMap = new Map();
    for (const key of obj.keys()) {
      const value = copyObject(obj.get(key));
      newMap.set(key, value);
    }
    return newMap;
  } else if (isSet(obj)) {
    const newSet = new Set();
    for (let el of obj) {
      newSet.add(copyObject(el));
    }
    return newSet;
  } else if (isObject(obj)) {
    let result = {};
    for (const key in obj) {
      result[key] = copyObject(obj[key]);
    }
    return result;
  }
};

const makeDeepCopy = (value) => {
  if (isPrimitive(value)) {
    throw new Error();
  } else {
    return copyObject(value);
  }
};

const selectFromInterval = (arr, firstNumber, secondNumber) => {
  if (!isValidArray(arr) || !isAllFinites([firstNumber, secondNumber])) {
    throw new Error();
  } else {
    const interval = [firstNumber, secondNumber].sort((a, b) => {
      return a - b;
    });
    const [min, max] = interval;
    const filteredArr = arr.filter((el) => {
      return el >= min && el <= max ? true : false;
    });
    return filteredArr;
  }
};

const createIterable = (fromNum, toNum) => {
  if (!isAllIntegers([fromNum, toNum]) || fromNum >= toNum) {
    throw new Error();
  } else {
    const obj = {
      from: fromNum,
      to: toNum,
    };
    obj[Symbol.iterator] = function () {
      return {
        current: this.from,
        last: this.to,
        next() {
          return this.current <= this.last
            ? { done: false, value: this.current++ }
            : { done: true };
        },
      };
    };
    return obj;
  }
};
