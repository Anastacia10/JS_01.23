import {
  recordOperand,
  prepareForRecordNextOperand,
  switchSign,
  calculateResult,
  resetAll,
  deleteOneChar,
} from "./actions.js";
import { getClass, getKeyType } from "./utils/utils.js";

export default () => {
  const calculator = document.querySelector("form");
  const screenResult = document.querySelector(".calculator_screen_result");

  const render = (state, { screenResult }) => {
    console.log(state);
    screenResult.textContent = state.mainMemory;
  };

  const state = {
    mainMemory: "",
    temporaryMemory: "",
    operator: null,
    isFinished: true,
  };

  calculator.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const classTarget = getClass(target);

    switch (classTarget) {
      case "numbers":
        recordOperand(state, value);
        render(state, { screenResult });
        break;
      case "operators_operation":
        prepareForRecordNextOperand(state, value);
        render(state, { screenResult });
        break;
      case "operators_switchSign":
        switchSign(state);
        render(state, { screenResult });
        break;
      case "operators_result":
        calculateResult(state);
        render(state, { screenResult });
        break;
      case "operators_resetAll":
        resetAll(state);
        render(state, { screenResult });
        break;
      case "operators_deleteOneChar":
        deleteOneChar(state);
        render(state, { screenResult });
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
        render(state, { screenResult });
        break;
      case ".":
        recordOperand(state, e.key);
        render(state, { screenResult });
        break;
      case "+":
        prepareForRecordNextOperand(state, "+");
        render(state, { screenResult });
        break;
      case "-":
        prepareForRecordNextOperand(state, "-");
        render(state, { screenResult });
        break;
      case "*":
        prepareForRecordNextOperand(state, "*");
        render(state, { screenResult });
        break;
      case "/":
        prepareForRecordNextOperand(state, "/");
        render(state, { screenResult });
        break;
      case "Enter":
        calculateResult(state);
        render(state, { screenResult });
        break;
      case "Backspace":
        deleteOneChar(state);
        render(state, { screenResult });
        break;
      default:
        break;
    }
  });
  render(state, { screenResult });
};
