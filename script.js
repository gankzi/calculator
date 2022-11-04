let display = document.querySelector(".display");
let operation = document.querySelector(".operation");
let buttons = document.querySelectorAll("button");

let currentOperation = "";
let currentNumber;
let firstNum;

function add(num1, num2) {
    return num1 + num2;
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
    return operator(num1,num2);
}

buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        displayScreen(event.target.value);
    })
})

function displayScreen(buttonPressed) {
    if (currentNumber === undefined) {
        firstNum = buttonPressed;
    }
    currentNumber = buttonPressed;
    currentOperation = currentOperation + buttonPressed;
    display.innerHTML = buttonPressed;
    operation.innerHTML = currentOperation;
}

