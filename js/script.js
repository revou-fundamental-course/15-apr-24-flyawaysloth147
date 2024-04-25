let inputTextarea = document.getElementById("Input-Textarea");
let outputTextarea = document.getElementById("Output-Textarea");
let formulaTextarea = document.getElementById("Formula-Textarea");

let inputUnitSelection = document.getElementById("Input-Temperature-Selection");
let outputUnitSelection = document.getElementById("Output-Temperature-Selection");

const TemperatureUnit = Object.freeze({
    NONE: 0,
    CELCIUS: 1,
    FAHRENHEIT: 2
});

function convertTemp(temperature, inputUnit, outputUnit) {
    let result = 0;

    if(inputUnit === TemperatureUnit.CELCIUS) {
        if(outputUnit === TemperatureUnit.CELCIUS) {
            result = temperature;
        } else if (outputUnit === TemperatureUnit.FAHRENHEIT) {
            result = (temperature * 9/5) + 32;
        }
    } else if (inputUnit === TemperatureUnit.FAHRENHEIT) {
        if(outputUnit === TemperatureUnit.CELCIUS) {
            result = (temperature - 32) * 5/9;
        } else if (outputUnit === TemperatureUnit.FAHRENHEIT) {
            result = temperature;
        }
    }

    return result
}

function onButtonPress() {
    let val = parseInt(this.value);
    switch(val) {
        case 1:
            resetButtonPress();
            break;
        case 2:
            calculateButtonPress();
            break;
        case 3:
            swapButtonPress();
            break;
        case 4:
            aboutButtonPress();
            break;
        case 5:
            tutorialButtonPress();
            break;
    }
}

function aboutButtonPress() {
    let text = "A temperature calculator made by gafin";
    alert("" + text);
}

function tutorialButtonPress() {
    let text = "Input the desired value into the input area of the calculator, make sure it's a valid number";
    alert("" + text);
}

function resetButtonPress() {
    inputTextarea.value = "";
    outputTextarea.innerHTML = "";
    formulaTextarea.innerHTML = "";

    inputUnitSelection.options[0].selected = "selected";
    outputUnitSelection.options[1].selected = "selected";
}

function swapButtonPress() {
    let temp = outputUnitSelection.value;
    outputUnitSelection.value = inputUnitSelection.value;
    inputUnitSelection.value = temp;

    calculateButtonPress();
}

function calculateButtonPress() {
    console.log("button pressed");

    let inputTemp = inputTextarea.value;
    let inputUnit = parseInt(inputUnitSelection.value);
    let outputUnit = parseInt(outputUnitSelection.value);
    
    if(isNaN(inputTemp)) {
        alert("the input must be a valid number");
        return;
    }

    let result = convertTemp(inputTemp, inputUnit, outputUnit);

    console.log("output unit: " + outputUnit);
    console.log("result: " + result);

    switch(outputUnit) {
        case 1: // Celcius
            outputTextarea.innerHTML = result + " &deg;C";
            break;
        case 2: // Fahrenheit
            outputTextarea.innerHTML = result + " &deg;F";
            break;
        default:
            outputTextarea.innerHTML = "Invalid";
            break;
    }

    if(inputUnit === TemperatureUnit.CELCIUS) {
        if(outputUnit === TemperatureUnit.CELCIUS) {
            formulaTextarea.innerHTML = inputTemp + "&deg;C = " + result + "&deg;C";
        } else if (outputUnit === TemperatureUnit.FAHRENHEIT) {
            formulaTextarea.innerHTML = "(" + inputTemp + "&deg;C x 9/5) - 32 = " + result + "&deg;F";
        }
    } else if (inputUnit === TemperatureUnit.FAHRENHEIT) {
        if(outputUnit === TemperatureUnit.CELCIUS) {
            formulaTextarea.innerHTML = "(" + inputTemp + "&deg;F - 32) x 5/9 = " + result + "&deg;C";
        } else if (outputUnit === TemperatureUnit.FAHRENHEIT) {
            formulaTextarea.innerHTML = inputTemp + "&deg;F = " + result + "&deg;F";
        }
    }
}

let globalButtons = document.querySelectorAll('button');

globalButtons.forEach(function(button) {
    button.addEventListener('click', onButtonPress)
});