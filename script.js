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

//Math Functions

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

//Add click Eventlisteners to all buttons

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function (event) {
    handleNum(event.target.value);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function (event) {
    setOperator(event.target.value);
  });
});

equals.addEventListener("click", function (event) {
  evaluate(event.target.value);
});

if (clear) {
  clear.addEventListener("click", clearDisplay);
  };

//Add keyboard eventlistener

document.addEventListener("keypress", function(event) {
  let keyPressed = event.key;

  if (keyPressed == "0" || keyPressed == "1" || keyPressed == "2" || keyPressed == "3" || keyPressed == "4" || keyPressed == "5" || keyPressed == "6" || keyPressed == "7" || keyPressed == "8" || keyPressed == "9") {
    handleNum(keyPressed);
  };
  
  if (firstNum && !firstNum.includes(".") && keyPressed == ".") {
    handleNum(keyPressed);
  }

  if (secondNum && !secondNum.includes(".") && keyPressed == ".") {
    handleNum(keyPressed);
  }

  if (keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/") {
    setOperator(keyPressed);
  }

  if (keyPressed == "Enter") {
    evaluate("=");
  }

})


//When numbers are called
function handleNum(val) {
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
    if (firstNum && firstNum !== answer) {
        firstNum += val;
      } else if (!firstNum) {
        firstNum = val;
      }
      if (firstNum && firstNum.includes(".")) {
        disableDot();
      }
    display.innerHTML = firstNum;
  };

  //set Second Number
  if (operator) {
     if (secondNum) {
      secondNum += val;
    } else if (!secondNum) {
      secondNum = val;
    }
    if (secondNum && secondNum.includes(".")) {
      disableDot();
     }
    display.innerHTML = secondNum;
  }

  currentOperation = currentOperation + val;
  operation.innerHTML = currentOperation;
}

function setOperator(val) {
  enableDot();

  if (secondNum) {
    operate(operator, firstNum, secondNum);
  }

  if (val == "/") {
    val = "÷";
  }

  if (val == "*") {
    val = "x"
  }

  if (val == "+") {
    operator = add;
  } else if (val == "-") {
    operator = subtract;
  } else if (val == "÷") {
    operator = divide;
  } else {
    operator = multiply;
  }
    
  let lastOp = currentOperation.slice(-1);

  if (lastOp == "=") {
    currentOperation = answer;
    display.innerHTML = "";
  } 

  if (lastOp == "+" || lastOp == "-" || lastOp == "÷" || lastOp == "x") {
    currentOperation = currentOperation.slice(0,-1)
  }

  currentOperation = currentOperation + val;
  operation.innerHTML = currentOperation;
}

function evaluate(val) {
  let lastOp = currentOperation.slice(-1);
  enableDot();

   if (lastOp == "="|| lastOp == "+" || lastOp == "-" || lastOp == "*" || lastOp == "/") {
    return;
   } 
  currentOperation = currentOperation + val;
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
};

function disableDot() {
  dotButton.disabled = true;
};

function enableDot() {
  dotButton.disabled = false;
};
