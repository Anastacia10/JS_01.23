const isValidNumber = (value) => {
  return value >= 0 && Number.isInteger(value) && Number.isSafeInteger(value);
};
class Stack {
  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable");
    } else {
      const newStack = new Stack(iterable.length);
      for (let i = 0; i < iterable.length; i++) {
        newStack.push(iterable[i]);
      }
      return newStack;
    }
  }
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
      const deletedElem = this.stack[length - 1];
      delete this.stack[this.length - 1];
      this.length = length - 1;
      return deletedElem;
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
class LinkedList {
  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable");
    } else {
      const newList = new LinkedList();
      for (let i = 0; i < iterable.length; i++) {
        newList.append(iterable[i]);
      }
      return newList;
    }
  }
  constructor() {
    this._head = null;
    this._tail = null;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  set head(head) {
    this._head = head;
  }

  set tail(tail) {
    this._tail = tail;
  }

  append = (elem) => {
    const newNode = new Node(elem);
    if (this.tail) {
      this.tail.next = newNode;
    }
    newNode.prev = this.tail;
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  };

  prepend = (elem) => {
    const newNode = new Node(elem, this.head);
    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  };

  find = (elem, currentNode = this.head) => {
    if (currentNode === null) {
      return null;
    }
    if (currentNode.value === elem) {
      return currentNode;
    }
    return this.find(elem, currentNode.next);
  };

  toArray = (currentNode = this.head, array = [], index = 0) => {
    if (currentNode === null) {
      return array;
    } else {
      array[index] = currentNode.value;
      return this.toArray(currentNode.next, array, index + 1);
    }
  };
}
class Node {
  constructor(value, next = null, prev = null) {
    this._value = value;
    this._next = next;
    this._prev = prev;
  }

  get value() {
    return this._value;
  }

  get next() {
    return this._next;
  }

  get prev() {
    return this._prev;
  }

  set value(value) {
    this._value = value;
  }

  set next(next) {
    this._next = next;
  }

  set prev(prev) {
    this._prev = prev;
  }
}
