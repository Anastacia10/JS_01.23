import { add, multiply, substract, divide } from "./utils/utils.js";

export const recordOperand = (state, value) => {
  if (state.isFinished) {
    state.isFinished = false;
    state.mainMemory = "";
  }
  state.mainMemory += value;
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
      state.mainMemory = divide(+state.temporaryMemory, +state.mainMemory);
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
