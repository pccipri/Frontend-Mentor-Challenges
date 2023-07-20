// select all the butons and the input for the tip custom percentage
const tipContainer = document.querySelectorAll(
  ".percentage__button, .custom__percentage"
);
// select the tip per person amount text
const tipPerPerson = document.querySelector("#tipPerPerson");
// select the total tip text element
const totalTip = document.querySelector("#totalTip");
// select the bill amount input
const billInput = document.querySelector("#billInput");
// select the number of people input
const numberOfPeopleInput = document.querySelector("#numberOfPeople");
// select numberOfPeopleInput error text
const numberOfPeopleInputError = document.querySelector("#inputError");
// select the reset Button
const resetButton = document.querySelector("#resetButton");
// select the input
const inputTip = document.querySelector("#customTip");

let billValue = 0;
let tipPercentage = 0;
let numberOfPeople = 0;
let tipPerPersonValue = 0;
let totalPerPersonValue = 0;

/**
 *
 * @param {number} theNumber value from which the percentage need to be calculated
 * @param {number} thePercentage the percentage needed from the number
 * @returns a value that represents the needed percentage value calculated from the given number
 *
 */
function percentageCalculator(theNumber, thePercentage) {
  return (theNumber * thePercentage) / 100;
}

/**
 * This function resets the value fo all tips then recalculates the tip
 * After that it resets the html inputs values
 */
function resetValues() {
  billValue =
    tipPercentage =
    numberOfPeople =
    tipPerPersonValue =
    totalPerPersonValue =
      0;
  billInput.value = "";
  numberOfPeopleInput.value = "";
  calculateNewTip();
  tipPerPerson.innerText = "$" + tipPerPersonValue.toFixed(2);
  totalTip.innerText = "$" + totalPerPersonValue.toFixed(2);
  tipContainer.forEach((element) => {
    element.classList.remove("active");
  });
  inputTip.value = "";
}

/**
 * This function updates the bill value depending on the introduced value
 * @param {*} evt - an input event type that triggers when the bill value changes
 */
function updateBill(evt) {
  if (evt.target.value === "") billValue = 0;
  else if (Number.isNaN(Number(evt.target.value))) return;
  else billValue = Number.parseFloat(evt.target.value);
}
/**
 * This function adds the active css class to a clicked button and saves
 * the button value in the tipPercentage variable
 *  or removes it if the button
 * already has it
 * @param {*} evt - an mouse event type that triggers when one of
 * the percentage buttons is clicked
 */
function toggleButtons(evt) {
  if (
    evt.target.classList.contains("active") &&
    evt.target.classList.contains("btn")
  ) {
    evt.target.classList.remove("active");
  } else if (evt.target.classList.contains("percentage__button")) {
    tipContainer.forEach((element) => {
      element.classList.remove("active");
    });
    tipPercentage = Number.parseFloat(
      evt.target.innerText.slice(0, evt.target.innerText.length - 1)
    );
    evt.target.classList.add("active");
  } else {
    tipContainer.forEach((element) => {
      element.classList.remove("active");
    });
    tipPercentage = Number(inputTip.value);
    calculateNewTip();
    
  }
}
/**
 * This function modifies the numberOfPeopleInput's style based on the
 * value of the input
 * @param {*} evt an input event type that triggers when the numberOfPeopleInput's value changes
 */
function updateNumberOfPeople(evt) {
  if (evt.target.value === "") {
    numberOfPeopleInput.style.outlineColor = "hsl(172, 67%, 45%)";
    numberOfPeopleInputError.classList.remove("active");
    numberOfPeople = 0;
  } else if (evt.target.value === "0") {
    numberOfPeopleInput.style.outlineColor = "red";
    numberOfPeopleInputError.classList.add("active");
  } else {
    numberOfPeopleInput.style.outlineColor = "hsl(172, 67%, 45%)";
    numberOfPeopleInputError.classList.remove("active");
    numberOfPeople = Number.parseFloat(evt.target.value);
  }
}

/**
 * This function updates the tip percentage input's value
 * @param {*} evt an input event type that triggers when the customTip input's value changes
 */
function updateTipPercentage(evt) {
  if (evt.target.value === "") tipPercentage = 0;
  else tipPercentage = Number.parseFloat(evt.target.value);
}

function verifyValuesToCalculateTip() {
  if (tipPercentage <= 0 || numberOfPeople <= 0 || billValue <= 0) {
    return false;
  } else if (Number.isNaN(tipPercentage)) {
    return false;
  } else if (Number.isNaN(numberOfPeople)) {
    return false;
  } else if (Number.isNaN(billValue)) {
    return false;
  }
  return true;
}

/**
 * This function calculates the tip per person and the total per person
 * if the needed values are valid
 */
function calculateNewTip() {
  if (verifyValuesToCalculateTip()) {
    // Calculate the tip amount
    const tipAmount = (billValue * tipPercentage) / 100;

    // Calculate the amount each person needs to pay
    const amountPerPerson = tipAmount / numberOfPeople;

    // Calculate the tip each person has to pay
    tipPerPersonValue = amountPerPerson.toFixed(2);

    // Calculate the whole bill with the tip included
    totalPerPersonValue = (
      (percentageCalculator(billValue, tipPercentage) + billValue) /
      numberOfPeople
    ).toFixed(2);

    // Then update the inner text of the html elements
    tipPerPerson.innerText = "$" + tipPerPersonValue;
    totalTip.innerText = "$" + totalPerPersonValue;
  }
}

billInput.addEventListener("input", function (evt) {
  updateBill(evt);
  calculateNewTip();
});

tipContainer.forEach((button) => {
  button.addEventListener("click", function (evt) {
    toggleButtons(evt);
    calculateNewTip();
  });
});

tipContainer[tipContainer.length - 1].addEventListener("input", function (evt) {
  updateTipPercentage(evt);
  calculateNewTip();
});

numberOfPeopleInput.addEventListener("input", function (evt) {
  updateNumberOfPeople(evt);
  calculateNewTip();
});

resetButton.addEventListener("click", function (evt) {
  resetValues();
});
