let display = document.querySelector(".display");
let operation = document.querySelector(".operation");
let numberButtons = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.getElementById("equals");
let clear = document.getElementById("clear");

let currentOperation = "";
let defaultNumber = 0;
let operator;
let firstNum;
let secondNum;
let answer;

function add(num1, num2) {
  let addNum1 = Number(num1);
  let addNum2 = Number(num2);
  return addNum1 + addNum2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  answer = operator(num1, num2);
  display.innerHTML = answer;
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
}

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function (event) {
    displayNum(event.target);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function (event) {
    setOperator(event.target);
  });
});

equals.addEventListener("click", function (event) {
  evaluate(event.target);
});

if (clear) {
  clear.addEventListener("click", function () {
    clearDisplay();
  });
}

function displayNum(val) {
  //set First Number
  if (answer) {
    firstNum = answer;
  };

  if (!operator) {
      if (firstNum && firstNum !== answer) {
        firstNum += val.value;
      } else if (!firstNum) {
        firstNum = val.value;
      }
      display.innerHTML = firstNum;
    }
  

  //set Second Number
  if (operator) {
    if (secondNum) {
      secondNum += val.value;
    } else if (!secondNum) {
      secondNum = val.value;
    }
    display.innerHTML = secondNum;
  }

  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
}

function setOperator(val) {
  if (secondNum) {
    operate(operator, firstNum, secondNum);
  }

  // //set Operator
  if (val.name == "add") {
    operator = add;
  } else if (val.name == "subtract") {
    operator = subtract;
  } else if (val.name == "divide") {
    operator = divide;
  } else {
    operator = multiply;
  }

  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
}

function evaluate(val) {
  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
  operate(operator, firstNum, secondNum);
}

function clearDisplay() {
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
  answer = undefined;
  currentOperation = "";
  operation.innerHTML = currentOperation;
  display.innerHTML = defaultNumber;
}
