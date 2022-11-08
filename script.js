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
let dotPresent = false;


//Math Functions

function add(num1, num2) {
  let addNum1 = Number(num1);
  let addNum2 = Number(num2);
  return parseInt(addNum1) + parseInt(addNum2);
}

function subtract(num1, num2) {
  return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
  return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
  return parseInt(num1) / parseInt(num2);
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


// Add keyboard eventlistener

document.addEventListener("keypress", function(event) {
  let keyPressed = event.key;

  if (keyPressed == "0" || keyPressed == "1" || keyPressed == "2" || keyPressed == "3" || keyPressed == "4" || keyPressed == "5" || keyPressed == "6" || keyPressed == "7" || keyPressed == "8" || keyPressed == "9") {
    handleNum(keyPressed);
  };
  
  if (keyPressed == ".") {
    handleNum(keyPressed);
  }

  if (keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/") {
    setOperator(keyPressed);
  }

  if (keyPressed == "Enter") {
    evaluate("=");
  }
  
  
})




function handleNum(val) {
  let lastOp = currentOperation.slice(-1) 

   //check if evaluated
  if(lastOp == "=") {
    return;
  }
  
  if(lastOp == val.value && lastOp == "."){
    return;
  }
  
  if(dotPresent && val == ".") {
    val = "";
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
    if (firstNum && val == "." && !dotPresent) {
        console.log("hi");
        dotPresent = true;
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
    if (secondNum && !dotPresent && val == ".") {
      dotPresent = true;
     }
    display.innerHTML = secondNum;
  }

  currentOperation = currentOperation + val;
  operation.innerHTML = currentOperation;
}

function setOperator(val) {
  dotPresent = false;

  if(!firstNum) {
    firstNum = 0;

  }

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
  dotPresent = false;
   if (!operator) {
    return;
   }

   if (lastOp == "" || lastOp == "="|| lastOp == "+" || lastOp == "-" || lastOp == "*" || lastOp == "/") {
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

