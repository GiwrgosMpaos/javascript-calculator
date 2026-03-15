const hLine = document.querySelector(".history-line");
const inLine = document.querySelector(".input-line");
const buttons = document.querySelectorAll(".calc-button");

let firstNumber = 0;
let operator = "";
let waitingForSecondNumber = false;
let gotResult = false;

console.log(buttons);

function cleanDec(x) {
    let str = String(num);

    if (str.endsWith(".")) {
        str = str.slice(0, -1);
    }

    return str;
}

function handleNumber(x) {

    if (gotResult) {
        inLine.value = x;
        gotResult = false;
        return;
    }

    if(waitingForSecondNumber) {
        inLine.value = x;
        waitingForSecondNumber = false;
    } else if (inLine.value === "0") {
        inLine.value = x;
    } else {
        inLine.value += x
    }
}

function handleDecimal() {
    if (waitingForSecondNumber) {
        inLine.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if(gotResult) {
        if (!inLine.value.includes(".")) {
        inLine.value += ".";
        }

        gotResult = false;
        return;
    }

    if (!inLine.value.includes(".")) {
        inLine.value += ".";
    }
}

function handleClear() {
    inLine.value = "0";
    hLine.value = "";
    firstNumber = 0;
    operator = "";
    waitingForSecondNumber = false;
    gotResult = false;
}

function handleOperator(op) {

    if (waitingForSecondNumber) {
        operator = op;
        hLine.value = `${cleanDec(firstNumber)} ${op}`;
        return;
    }

    if (operator && !waitingForSecondNumber) {
        const secondNumber = inLine.value;
        const result = calculate(firstNumber, operator, secondNumber);

        firstNumber = String(result);
        inLine.value = result;
        operator = op;
        waitingForSecondNumber = true;
        hLine.value = `${cleanDec(firstNumber)} ${op}`;
        return;
    }

    firstNumber = inLine.value;
    operator = op;
    waitingForSecondNumber = true;
    hLine.value = `${cleanDec(firstNumber)} ${op}`;
    inLine.value = "0";
}

function calculate(x,op,y) {
    let num1 = parseFloat(x);
    let num2 = parseFloat(y);

    if (op == "+") {
        return num1 + num2;
    } else if (op == "-") {
        return num1 - num2;
    } else if (op == "/") {
        return num1 / num2;
    } else if (op == "x") {
        return num1 * num2;
    }
}

function handleResult() {
    if (!(operator == "")) {
        const secondNumber = inLine.value;
        inLine.value = calculate(firstNumber,operator,secondNumber);
        hLine.value = `${firstNumber} ${operator} ${secondNumber} =`;
        operator = "";
        gotResult = true;
    }
}

function handlePercent() {
    let num = parseFloat(inLine.value);
    inLine.value = num / 100;

}

buttons.forEach((b)=> {
    b.addEventListener("click",()=>{
        const bValue = b.textContent;
        console.log(bValue);

        if (!isNaN(bValue)) {
            handleNumber(bValue);
        } else if (bValue == ".") {
            handleDecimal();
        } else if (bValue == "CLEAR") {
            handleClear();
        } else if (bValue == "+") {
            handleOperator("+");
        } else if (bValue == "-") {
            handleOperator("-");
        } else if (bValue == "/") {
            handleOperator("/");
        } else if (bValue == "x") {
            handleOperator("x");
        } else if (bValue == "=") {
            handleResult();
        } else if (bValue == "%") {
            handlePercent();
        }
    })
})