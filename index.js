const isValidNumber = (value) => {
  return value >= 0 && Number.isInteger(value) && Number.isSafeInteger(value);
};
class Stack {
  static fromIterable(iterable) {}
  constructor(maxSize = 10) {
    if (isValidNumber(maxSize)) {
      this._maxSize = maxSize;
      this._stack = [];
      this._length = 0;
    } else {
      throw new Error("Invalid limit value");
    }
  }
  get stack() {
    return this._stack;
  }
  get maxSize() {
    return this._maxSize;
  }
  get length() {
    return this._length;
  }
  set length(length) {
    this._length = length;
  }
  set stack(stack) {
    this._stack = stack;
  }
  push = (el) => {
    let length = this.length;
    if (length === this.maxSize) {
      throw new Error("Limit exceeded");
    } else {
      this.stack[length] = el;
      this.length = length + 1;
    }
  };
  pop = () => {
    let length = this.length;
    if (length === 0) {
      throw new Error("Empty stack");
    } else {
      const newStack = [];
      this.length = length - 1;
      for (let i = 0; i < this.length; i++) {
        newStack[i] = this.stack[i];
      }
      this.stack = newStack;
    }
  };
  peek = () => {
    if (this.length === 0) {
      return null;
    } else {
      return this.stack[this.length - 1];
    }
  };
  isEmpty = () => {
    return this.length === 0 ? true : false;
  };
  toArray = () => {
    const newArray = [];
    const length = this.length;
    for (let i = 0; i < length; i++) {
      newArray[i] = this.stack[i];
    }
    return newArray;
  };
}
