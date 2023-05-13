// Select all the buttons
const buttons = document.querySelectorAll("button");

// Get the output element
const output = document.getElementById("output");

// Define a variable to store the current value
let currentValue = "0";

// Define a variable to store the previous value
let previousValue = "";

// Define a variable to store the operation
let operation = null;

//Define a function to update the output
function updateOutput(value) {
    output.innerText = value;
}

// Define a function to handle button clicks
function handleClick(event) {
    // Get the button that was clicked
    const button = event.target;

    // Get the value of the button
    const value = button.innerText;

    // Check if the button was a number
    if (!isNaN(value) || value === ".") {
        // If it was a number or a decimal, add it to the current value
        if (currentValue === "0" && value === ".") {
            currentValue = "0.";
        } else if (currentValue === "0") {
            currentValue = value;
        } else {
            currentValue += value;
        }
        updateOutput(currentValue);
    } else if (value === "C") {
        // If it was the clear button, reset everything
        currentValue = "0";
        previousValue = "";
        operation = null;
        updateOutput(currentValue);
    } else if (value === "x²") {
        // If it was the square button, square the current value
        currentValue = Math.pow(parseFloat(currentValue), 2).toString();
        updateOutput(currentValue);
    } else if (value === "%") {
        // If it was the modulus button, get the modulus of the current value and the previous value
        if (previousValue !== "") {
            currentValue = (parseFloat(previousValue) % parseFloat(currentValue)).toString();
            previousValue = "";
            operation = null;
        } else {
            previousValue = currentValue;
            currentValue = "0";
            operation = "%";
        }
        updateOutput(currentValue);
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
        // If it was an operation button, store the previous value and the operation
        if (previousValue !== "") {
            const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operation);
            currentValue = result.toString();
            previousValue = "";
            operation = null;
            updateOutput(currentValue);
        } else {
            previousValue = currentValue;
            currentValue = "0";
            operation = value;
        }
    } else if (value === "=") {
        // If it was the equals button, calculate the result
        if (previousValue !== "" && operation !== null) {
            const result = calculate(parseFloat(previousValue), parseFloat(currentValue), operation);
            currentValue = result.toString();
            previousValue = "";
            operation = null;
            updateOutput(currentValue);
        }
    }
}

// Define a function to calculate the result of an operation
function calculate(a, b, operation) {
    if (operation === "+") {
        return a + b;
    } else if (operation === "-") {
        return a - b;
    } else if (operation === "*") {
        return a * b;
    } else if (operation === "/") {
        return a / b;
    }
}

// Add event listeners to all the buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
}