let display = document.querySelector(".display");
let operation = document.querySelector(".operation");
let buttons = document.querySelectorAll("button");
let equals = document.getElementById("equals");

let currentOperation = "";
let currentNumber;
let operator;
let firstNum;
let secondNum;

function add(num1, num2) {
    let addNum1 = Number(num1);
    let addNum2 = Number(num2);
    return addNum1 + addNum2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let answer = operator(num1,num2);
    display.innerHTML = answer;
}

buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        displayScreen(event.target);
    })
})

equals.addEventListener("click", function() {
    evaluate();
});

function displayScreen(val) {
    //set Second Number
    if (operator && val.value !== "=") {
        if (secondNum) {
            secondNum += val.value;
        } else if (!secondNum) {
            secondNum = val.value;
        }
    }
    
    //set Operator
     if (val.name) {
        if (val.name == "add") {
            operator = add;
        } else if (val.name == "subtract") {
            operator = subtract;
        } else if (val.name == "divide") {
            operator = divide;
        } else {
            operator = multiply;
        }
    }

    //set First Number
    if (!operator) {
        if (firstNum) {
            firstNum += val.value;
        } else if (!firstNum) {
        firstNum = val.value;
        }
    }
    

    console.log(firstNum);
    console.log(secondNum);    

    currentNumber = val.value;
    currentOperation = currentOperation + val.value;
    display.innerHTML = val.value;
    operation.innerHTML = currentOperation;
}

function evaluate () {
    operate(operator,firstNum, secondNum);
}