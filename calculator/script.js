let displayArray = [];
let operands = ['+', '-', '*', '/', '.'];

function operate(a, operand, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operand) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                result = 'Don\'t do that!';
            } else {
                result = (a / b);
            }
    }
    // Limit number of digits to 10 due to screen size
    decimalNumber = 10 - result.toFixed(0).toString().length;
    return result.toFixed(decimalNumber).replace(/\.?0+$/, '').toString();
}

function clear() {
    displayArray = [];
}

function calculate() {
    if (displayArray.length === 3) {
        let result = operate(...displayArray);
        displayArray = [result];
    }
}

function updateDisplay() {
    let display = document.getElementById('Display');
    display.textContent = displayArray.join(' ');
}

function isDecimal(value) {
    return value.includes('.');
}

function buttonPressed(value) {
    switch (value) {
        case 'C':
            clear();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (displayArray.length === 3) {
                calculate();
            }
            displayArray.push(value);
            break;
        case'.':
            lastElement = displayArray[displayArray.length - 1];
            if (lastElement !== undefined && !lastElement.includes('.')) {
                displayArray[displayArray.length - 1] += '.';
            }
            break;
        default:
            lastElement = displayArray[displayArray.length - 1];
            if (lastElement === undefined || operands.includes(lastElement)) {
                displayArray.push(value);
            } else if (lastElement.includes('.')) {
                displayArray[displayArray.length - 1] += value;
            } else {
                displayArray[displayArray.length - 1] = (parseInt(lastElement) * 10 + parseInt(value)).toString();
            }
    }
    updateDisplay();
}

function initialize() {
    let buttons = ['1', '2', '3', 'C', '4', '5', '6', '+', '7', '8', '9', '-', '.', '0', '*', '/', '='];
    let buttonsDiv = document.getElementById('Buttons');
    buttons.forEach(value => {
        let button = document.createElement('button');
        button.textContent = value;
        if (value === '=') {
            button.classList.add('equals');
        } else if (value === 'C') {
            button.classList.add('clear');
        } else if (['+', '-', '*', '/', '.'].includes(value)) {
            button.classList.add('operand');
        } else {
            button.classList.add('number');
        }
        button.addEventListener('click', function() {
            buttonPressed(value);
        });
        buttonsDiv.appendChild(button);
    });

    document.addEventListener('keydown', function(event) {
        let key = event.key;
        if (key === 'Enter') {
            key = '=';
        }
        if (key === 'Backspace' || key === 'Delete' || key === 'c') {
            key = 'C';
        }
        if (buttons.includes(key)) {
            event.preventDefault();
            buttonPressed(key);
        }
    });
}

initialize();