const isValidNumber = (value) => {
  return value >= 0 && Number.isInteger(value) && Number.isSafeInteger(value);
};

const isValidString = (value) => {
  return typeof value === "string" && value.length >= 1 && value.length <= 50;
};

const isValidYear = (value) => {
  const yearCurrent = new Date().getFullYear();
  return Number.isInteger(value) && value >= 1950 && value <= yearCurrent;
};

const isValidMaxSpeed = (value) => {
  return Number.isFinite(value) && value >= 100 && value <= 330;
};

const isValidMaxFuelVolume = (value) => {
  return Number.isFinite(value) && value >= 20 && value <= 100;
};

const isValidFuelConsumption = (value) => {
  return value >= 1 && Number.isFinite(value);
};

const isValidDamage = (value) => {
  return Number.isFinite(value) && value >= 1 && value <= 5;
};

const isValidVolume = (value) => {
  return Number.isFinite(value) && value >= 0;
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
      this.maxSize = maxSize;
      this.stack = [];
      this.length = 0;
    } else {
      throw new Error("Invalid limit value");
    }
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
    this.head = null;
    this.tail = null;
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
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class Car {
  #brand = "";
  #model = "";
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  get brand() {
    return this.#brand;
  }
  get model() {
    return this.#model;
  }
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  get maxSpeed() {
    return this.#maxSpeed;
  }
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  get damage() {
    return this.#damage;
  }
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }
  get mileage() {
    return this.#mileage;
  }
  get health() {
    return this.#health;
  }
  get isStarted() {
    return this.#isStarted;
  }
  set brand(string) {
    if (!isValidString(string)) {
      throw new Error("Invalid brand name");
    } else {
      this.#brand = string;
    }
  }
  set model(string) {
    if (!isValidString(string)) {
      throw new Error("Invalid model name");
    } else {
      this.#model = string;
    }
  }
  set yearOfManufacturing(year) {
    if (!isValidYear(year)) {
      throw new Error("Invalid year of manufacturing");
    } else {
      this.#yearOfManufacturing = year;
    }
  }
  set maxSpeed(speed) {
    if (!isValidMaxSpeed(speed)) {
      throw new Error("Invalid max speed");
    } else {
      this.#maxSpeed = speed;
    }
  }
  set maxFuelVolume(volume) {
    if (!isValidMaxFuelVolume(volume)) {
      throw new Error("Invalid max speed");
    } else {
      this.#maxFuelVolume = volume;
    }
  }
  set fuelConsumption(degree) {
    if (!isValidFuelConsumption(degree)) {
      throw new Error("Invalid fuel consumption");
    } else {
      this.#fuelConsumption = degree;
    }
  }
  set damage(degree) {
    if (!isValidDamage(degree)) {
      throw new Error("Invalid damage");
    } else {
      this.#damage = degree;
    }
  }
  start = () => {
    if (this.isStarted) {
      throw new Error("Car has already started");
    } else {
      this.#isStarted = true;
    }
  };

  shutDownEngine = () => {
    if (!this.isStarted) {
      throw new Error("Car hasn't started yet");
    } else {
      this.#isStarted = false;
    }
  };

  fillUpGasTank = (volume) => {
    const amountToFillTank = this.getFullAmount();
    if (this.isStarted) {
      throw new Error("You have to shut down your car first");
    } else if (!isValidVolume(volume)) {
      throw new Error("Invalid fuel amount");
    } else if (volume > amountToFillTank) {
      throw new Error("Too much fuel");
    } else {
      this.#currentFuelVolume += volume;
    }
  };

  drive = (speed, duration) => {
    if (!Number.isFinite(speed) || speed <= 0) {
      throw new Error("Invalid speed");
    } else if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("Invalid duration");
    } else if (!this.isStarted) {
      throw new Error("You have to start your car first");
    } else if (speed > this.maxSpeed) {
      throw new Error("Car can't go this fast");
    } else {
      const miles = speed * duration;
      const neededFuelVolume = (miles * this.fuelConsumption) / 100;
      const calculatedDamage = (miles * this.damage) / 100;
      if (neededFuelVolume > this.currentFuelVolume) {
        throw new Error("You don't have enough fuel");
      } else if (calculatedDamage > this.health) {
        throw new Error("Your car won’t make it");
      } else {
        this.#currentFuelVolume -= neededFuelVolume;
        this.#health -= calculatedDamage;
        this.#mileage += miles;
      }
    }
  };

  repair = () => {
    if (this.isStarted) {
      throw new Error("You have to shut down your car first");
    } else {
      const amountToFillTank = this.getFullAmount();
      if (!amountToFillTank === 0) {
        throw new Error("You have to fill up your gas tank first");
      }
      this.#health = 100;
    }
  };

  getFullAmount = () => {
    if (this.currentFuelVolume === this.maxFuelVolume) {
      return 0;
    } else {
      return this.maxFuelVolume - this.currentFuelVolume;
    }
  };
}
