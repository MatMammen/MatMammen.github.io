let gridContainer = document.querySelector('.grid-container'); 
let numArray = [];
let num1 = '';
let num2 = '';
let display = document.querySelector('#display')
let displayEquations = document.querySelector('#displayEquations')
let displaySolutions = document.querySelector('#displaySolution')
createNumButtons();
createOtherButtons();

function createNumButtons() {
    for (let i = 1; i < 10; i++) {
        let button = document.createElement('button')
        button.textContent = i;
        button.style.backgroundColor = 'green';
        gridContainer.appendChild(button)
        button.addEventListener("click", function() {
            if (numArray.length == 0) {
                num1 = num1 + i;
                displayEquations.textContent = num1;
            }
            else if (numArray.length == 2) {
                num2 = num2 + i;
                displayEquations.textContent = displayEquations.textContent + i
            }
        })
    }
}

function createOtherButtons() {
    let zero = document.createElement('button')
    zero.textContent = 0;
    zero.style.backgroundColor = 'green';
    zero.addEventListener("click", function() {
        if (numArray.length == 0) {
            num1 = num1 + 0;
            displayEquations.textContent = num1;
        }
        else if (numArray.length == 2) {
            num2 = num2 + 0;
            displayEquations.textContent = displayEquations.textContent + 0
        }
    })
    gridContainer.appendChild(zero)

    let decimal = document.createElement('button')
    decimal.textContent = '.';
    decimal.addEventListener("click", function() {
        if (numArray.length == 0 && num1.includes(".") == false) {
            num1 = num1 + '.';
            displayEquations.textContent = num1;
        }
        else if (numArray.length == 2 && num2.includes(".") == false) {
            num2 = num2 + '.';
            displayEquations.textContent = displayEquations.textContent + '.'
        }
    })
    gridContainer.appendChild(decimal)

    let plus = document.createElement('button')
    plus.textContent = '+';
    plus.addEventListener("click", function() {
        if (numArray.length == 0 && num1 != '') {
            numArray.push(num1);
            numArray.push('plus')
            displayEquations.textContent = displayEquations.textContent + '+';
        }
        else if (numArray.length == 3) {
            numArray = [displaySolutions.textContent, 'plus']
            displayEquations.textContent = displayEquations.textContent + '+';
            num2 = '';
        }
    })
    gridContainer.appendChild(plus)

    let minus = document.createElement('button')
    minus.textContent = '-';
    minus.addEventListener("click", function() {
        if (numArray.length == 0 && num1 != '') {
            numArray.push(num1);
            numArray.push('minus')
            displayEquations.textContent = displayEquations.textContent + '-';
        }
        else if (numArray.length == 3) {
            numArray = [displaySolutions.textContent, 'minus']
            displayEquations.textContent = displayEquations.textContent + '-';
            num2 = '';
        }
    })
    gridContainer.appendChild(minus)

    let mult = document.createElement('button')
    mult.textContent = '*';
    mult.addEventListener("click", function() {
        if (numArray.length == 0 && num1 != '') {
            numArray.push(num1);
            numArray.push('mult')
            displayEquations.textContent = displayEquations.textContent + '*';
        }
        else if (numArray.length == 3) {
            numArray = [displaySolutions.textContent, 'mult']
            displayEquations.textContent = displayEquations.textContent + '*';
            num2 = '';
        }
    })
    gridContainer.appendChild(mult)

    let division = document.createElement('button')
    division.textContent = '/';
    division.addEventListener("click", function() {
        if (numArray.length == 0 && num1 != '') {
            numArray.push(num1);
            numArray.push('divide')
            displayEquations.textContent = displayEquations.textContent + '/';
        }
        else if (numArray.length == 3) {
            numArray = [displaySolutions.textContent, 'divide']
            displayEquations.textContent = displayEquations.textContent + '/';
            num2 = '';
        }
    })
    gridContainer.appendChild(division)

    let equals = document.createElement('button')
    equals.textContent = '=';
    gridContainer.appendChild(equals);
    equals.addEventListener('click', function() {
        if (numArray.length == 2 && num2 != '') {
            numArray.push(num2);
            let solution = operate(numArray[0], numArray[1], numArray[2])
            displaySolutions.textContent = solution % 1 != 0 ? solution.toFixed(2): solution;
        }
    })

    let deleteLast = document.createElement('button')
    deleteLast.textContent = 'delete';
    gridContainer.appendChild(deleteLast);
    deleteLast.addEventListener('click', function() {
        if (numArray.length == 0 && num1 != '') {
            num1 = removeLast(num1)
            displayEquations.textContent = removeLast(displayEquations.textContent)
        }
        else if (numArray.length == 2 && num2 !='') {
            num2 = removeLast(num2)
            displayEquations.textContent = removeLast(displayEquations.textContent)
        }
        
    })

    let clear = document.createElement('button')
    clear.textContent = 'clear';
    gridContainer.appendChild(clear);
    clear.addEventListener('click', function() {
        window.location.reload();
    })
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1-num2
}

function multiply(num1, num2) {
    return num1 * num2
}
function divide(num1, num2) {
    if (num2 == 0) {
        alert('Cannot divide by 0!')
        return num1
    }
    else {
        return num1 / num2
    }
}

function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return (operator == 'plus'? add(num1, num2): operator == 'minus' ? subtract(num1, num2):operator == 'mult' ? multiply(num1, num2) : divide(num1, num2))
}

function removeLast(string) {
    return string.slice(0, -1);
}