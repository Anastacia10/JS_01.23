const isValidThis = (value) => {
  return (
    Object.prototype.toString.call(value) == "[object Array]" ||
    typeof thisArg === "undefined"
  );
};

const isValidTime = (value) => {
  return value >= 0 && Number.isInteger(value) && Number.isSafeInteger(value);
};

Array.prototype.customFilter = function (cb, thisArg) {
  if (typeof cb !== "function" || !isValidThis(thisArg)) {
    throw new Error();
  }
  let context = this;
  if (thisArg && Object.prototype.toString.call(thisArg) == "[object Array]") {
    context = thisArg;
  }
  const array = Object(context);
  const length = array.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    if (i in array) {
      let current = array[i];
      if (cb.call(context, current, i, array)) {
        result.push(current);
      }
    }
  }
  return result;
};

const createDebounceFunction = function (cb, time) {
  if (typeof cb !== "function" || !isValidTime(time)) {
    throw new Error();
  }
  let isBusy = false;
  return function () {
    if (isBusy) return;
    cb.apply(this, arguments);
    isBusy = true;
    setTimeout(() => (isBusy = false), time);
  };
};
