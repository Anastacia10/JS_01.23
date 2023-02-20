import {
  add,
  multiply,
  substract,
  divide,
  isZeroInStartOfOneCharStr,
} from "./utils/utils.js";

export const recordOperand = (state, value) => {
  if (state.isFinished) {
    state.isFinished = false;
    state.mainMemory = "";
  }

  if (state.mainMemory.length === state.uiLimit) {
    return state;
  }

  if (
    isZeroInStartOfOneCharStr(state.mainMemory) &&
    (value === "0" || value === "00")
  ) {
    return state;
  } else {
    state.mainMemory += value;
  }
};

export const makeDecimalNumber = (state) => {
  if (state.mainMemory.includes(".")) {
    return state;
  } else if (state.mainMemory !== "") {
    state.mainMemory += ".";
  }
};

export const prepareForRecordNextOperand = (state, value) => {
  if (state.mainMemory && state.temporaryMemory && state.operator) {
    calculateResult(state);
  }
  state.temporaryMemory = state.mainMemory;
  state.operator = value;
  state.mainMemory = "";
};

export const switchSign = (state) => {
  state.mainMemory = -+state.mainMemory;
};

export const calculateResult = (state) => {
  switch (state.operator) {
    case "-":
      state.mainMemory = substract(+state.temporaryMemory, +state.mainMemory);
      break;
    case "+":
      state.mainMemory = add(+state.temporaryMemory, +state.mainMemory);
      break;
    case "*":
      state.mainMemory = multiply(+state.temporaryMemory, +state.mainMemory);
      break;
    case "/":
      if (state.mainMemory === "0") {
        state.mainMemory = "";
      } else {
        state.mainMemory = divide(+state.temporaryMemory, +state.mainMemory);
      }
      break;
    default:
      break;
  }
  state.temporaryMemory = "";
  state.operator = null;
  state.isFinished = true;
};

export const resetAll = (state) => {
  state.mainMemory = "";
  state.temporaryMemory = "";
  state.operator = null;
  state.isFinished = false;
};

export const deleteOneChar = (state) => {
  state.mainMemory = state.mainMemory.slice(0, -1);
};
