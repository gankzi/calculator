let display = document.querySelector(".display");
let operation = document.querySelector(".operation");
let numberButtons = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let dotButton = document.getElementById("dot");
let equals = document.getElementById("equals");
let clear = document.getElementById("clear");

let currentOperation = "";
let defaultNumber = 0;
let operator;
let firstNum;
let secondNum;
let answer;
let dotPresent;

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

function operate(operateF, num1, num2) {
  answer = operateF(num1, num2);
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
  let lastOp = currentOperation.slice(-1) 

  
   //check if evaluated
  if(lastOp == "=") {
    return;
  }
  
  if(lastOp == val.value && lastOp == "."){
    return;
  }
  
  //set First Number
  if (answer) {
    firstNum = answer;
  };

  
  if (!operator) {
    if (firstNum && firstNum.includes(".")) {
      disableDot();
    }
    if (firstNum && firstNum !== answer) {
        firstNum += val.value;
      } else if (!firstNum) {
        firstNum = val.value;
      }
    display.innerHTML = firstNum;
  };



  //set Second Number
  if (operator) {
   if (secondNum && secondNum.includes(".")) {
    disableDot();
   }
   if (secondNum) {
      secondNum += val.value;
    } else if (!secondNum) {
      secondNum = val.value;
    }
    display.innerHTML = secondNum;
  }

  console.log(firstNum);
  console.log(secondNum);


  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
}

function setOperator(val) {
  enableDot();

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
    
  let lastOp = currentOperation.slice(-1);

  if (lastOp == "=") {
    currentOperation = answer;
    display.innerHTML = "";
  } 

  if (lastOp == "+" || lastOp == "-" || lastOp == "/" || lastOp == "*") {
    currentOperation = currentOperation.slice(0,-1)
  }

  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
}

function evaluate(val) {
  let lastOp = currentOperation.slice(-1);
  enableDot();
   if (lastOp == "=") {
    return;
   } 
  currentOperation = currentOperation + val.value;
  operation.innerHTML = currentOperation;
  operate(operator, firstNum, secondNum);
 };


function clearDisplay() {
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
  answer = undefined;
  currentOperation = "";
  operation.innerHTML = currentOperation;
  display.innerHTML = defaultNumber;
}

function disableDot() {
  dotButton.disabled = true;
}

function enableDot() {
  dotButton.disabled = false;
}
