import {
  recordOperand,
  prepareForRecordNextOperand,
  switchSign,
  calculateResult,
  resetAll,
  deleteOneChar,
  makeDecimalNumber,
} from "./actions.js";
import { getClass, getKeyType } from "./utils/utils.js";

export default () => {
  const calculator = document.querySelector("form");
  const screenResult = document.querySelector(".calculator_screen_result");
  const screenlog = document.querySelector(".calculator_screen_log");

  const render = (state, { screenResult, screenlog }) => {
    if (state.mainMemory.length === 0) {
      screenResult.textContent = 0;
    } else if (state.mainMemory.length >= state.uiLimit) {
      screenResult.textContent = `Uilimit is ${state.uiLimit} symbols, sorry`;
    } else {
      screenResult.textContent = state.mainMemory;
    }
    if (!state.mainMemory && !state.operator && !state.temporaryMemory) {
      screenlog.textContent = ``;
    } else if (state.temporaryMemory && state.operator && !state.mainMemory) {
      screenlog.textContent = `${state.temporaryMemory} ${state.operator}`;
    } else if (state.temporaryMemory && state.operator && state.mainMemory) {
      screenlog.textContent = `${state.temporaryMemory} ${state.operator} ${state.mainMemory}`;
    }
  };

  const state = {
    mainMemory: "",
    temporaryMemory: "",
    operator: "",
    isFinished: true,
    uiLimit: 21,
  };

  calculator.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const classTarget = getClass(target);

    switch (classTarget) {
      case "numbers":
        recordOperand(state, value);
        render(state, { screenResult, screenlog });
        break;
      case "numbers_point":
        makeDecimalNumber(state);
        render(state, { screenResult, screenlog });
        break;
      case "operators_operation":
        prepareForRecordNextOperand(state, value);
        render(state, { screenResult, screenlog });
        break;
      case "operators_switchSign":
        switchSign(state);
        render(state, { screenResult, screenlog });
        break;
      case "operators_result":
        calculateResult(state);
        render(state, { screenResult, screenlog });
        break;
      case "operators_resetAll":
        resetAll(state);
        render(state, { screenResult, screenlog });
        break;
      case "operators_deleteOneChar":
        deleteOneChar(state);
        render(state, { screenResult, screenlog });
        break;
      default:
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    const keyType = getKeyType(e.key);
    switch (keyType) {
      case "number":
        recordOperand(state, e.key);
        render(state, { screenResult, screenlog });
        break;
      case ".":
        makeDecimalNumber(state, e.key);
        render(state, { screenResult, screenlog });
        break;
      case "+":
        prepareForRecordNextOperand(state, "+");
        render(state, { screenResult, screenlog });
        break;
      case "-":
        prepareForRecordNextOperand(state, "-");
        render(state, { screenResult, screenlog });
        break;
      case "*":
        prepareForRecordNextOperand(state, "*");
        render(state, { screenResult, screenlog });
        break;
      case "/":
        prepareForRecordNextOperand(state, "/");
        render(state, { screenResult, screenlog });
        break;
      case "Enter":
        calculateResult(state);
        render(state, { screenResult, screenlog });
        break;
      case "Backspace":
        deleteOneChar(state);
        render(state, { screenResult, screenlog });
        break;
      default:
        break;
    }
  });
  render(state, { screenResult, screenlog });
};
