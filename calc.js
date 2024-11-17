var operator = "";
var x = "";
var y = "";
var result = "";

const audio = document.getElementById('clickSound');
const btn = document.querySelector(".buttons");
btn.addEventListener('click', (event) => {
    audio.currentTime = 0;
    audio.play();
    let pressedButton = event.target.id;
    
    switch(pressedButton) {
        case ".":
            if (!(operator === "") && !(y.includes("."))) {
                y = y.concat(".");
                result = result.concat(".");
                display(result);
            }
            else if (!(x.includes("."))) {
                x = x.concat(".");
                result = result.concat(".");
                display(result);
            }
            break;
        case "del":
            x = "";
            y = "";
            result = "";
            display("")
            break;
        case "=":
            result = operate(x, y, operator);
            display(result);
            operator = "";
            x = "";
            y = "";
            break;
        case "+": handleOperation("+");
            break;  
        case "-": handleOperation("-");
            break;
        case "*": handleOperation("*");
            break;
        case "/": handleOperation("/");
            break;
        default:
            handleDigit(pressedButton);
    }
} )

function handleOperation(sign) {
    /*handleDigit assures that y won't be updated till there is
     already an operator */
    if (y === "") {
        operator = sign;
        result = result.concat(sign);
        display(result);
    }
    /* case the operation beign called for the first time */
    else {
        result = operate(x, y, operator);
        x = result;
        result = result.concat(sign);
        y = "";
        operator = sign;
        display(result);
    } 
}

function handleDigit(dig) {
    if (operator === "") {
        x = x.concat(dig);
        result = x;
        display(result);
    }
    else {
        y = y.concat(dig);
        result = result.concat(dig);
        display(result);
    }
}


function operate(x, y, operator) {
    if (x === "" && !(y === "")) {
        x = result.slice(0, result.indexOf(operator));
    }
    let xNum = parseFloat(x);
    let yNum = parseFloat(y);
    
    switch(operator) {
        case "+":
            return (Math.round((xNum + yNum) * 10) / 10).toString();
            break;
        case "-":
            return (Math.round((xNum - yNum) * 10) / 10).toString();
            display(result);
            break;
        case "/":
            return (Math.round((xNum / yNum) * 10) / 10).toString();
            break;
        case "*":
            return (Math.round((xNum * yNum) * 10) / 10).toString();
    }
}

function display(result) {
    const screen = document.querySelector("#display");
    screen.innerText = result;
}
