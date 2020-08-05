//Variables
const numButtons = document.querySelectorAll(".numbers");
const mainSelect = document.querySelector("#textEntry");
const secSelect = document.querySelector("#secondEntry");
const operators = document.querySelectorAll(".operators");

// On Load
setCaretPosition(mainSelect, mainSelect.value.length);

// Object Litreral
const operatorDef = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  mulitiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return a / b;
  },
};

//Event Handlers
operators[0].onclick = opClick;
operators[1].onclick = opClick;
operators[2].onclick = opClick;
operators[3].onclick = opClick;
document.querySelector("#percent").onclick = opClick;
document.querySelector("#negate").onclick = negate;
document.querySelector("#decimal").onclick = decimal;
document.querySelector("#equals").onclick = solve;
// for loop
for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].onclick = numberOp;
}

// forEach
// numButtons.forEach(function (numButton) {
//   numButton.onclick = numberOp;
// });

// while loop
// let i = 0;
// while (i < numButtons.length) {
//   numButtons[i].onclick = numberOp;
//   i++;
// }

//Functions
function numberOp() {
  setCaretPosition(mainSelect, mainSelect.value.length);

  if (mainSelect.value === "0" || problemSolved === true) {
    mainSelect.value = this.value;
    problemSolved = false;
    console.log("solved has been cleared");
  } else if (mainSelect.value === "Error") {
    return;
  } else {
    mainSelect.value += this.value;
  }
  console.log("numberOp function fired");
}

function opClick() {
  setCaretPosition(mainSelect, mainSelect.value.length);

  if (mainSelect.value === "Error") {
    return;
  } else {
    window.opStore = this.value;
    console.log(this.value);
    console.log(mainSelect.value);
    document.getElementById("secondEntry").value = mainSelect.value;
    mainSelect.value = "0";
    console.log("opClick function fired");
  }
}

function negate() {
  setCaretPosition(mainSelect, mainSelect.value.length);

  if (mainSelect.value > 0 || mainSelect.value === "0") {
    mainSelect.value = "-" + mainSelect.value;
  } else if (mainSelect.value < 0 || mainSelect.value === "-0") {
    mainSelect.value = mainSelect.value * -1;
  }
}

function decimal(e) {
  setCaretPosition(mainSelect, mainSelect.value.length);

  if (mainSelect.value.includes(".")) {
    return;
  } else if (problemSolved === true) {
    mainSelect.value = "0.";
    problemSolved = false;
    console.log("problem cleared");
  } else {
    mainSelect.value = mainSelect.value + e.target.value;
    problemSolved = false;
    console.log("problem cleared");
  }
}

function solve() {
  setCaretPosition(mainSelect, mainSelect.value.length);

  switch (opStore) {
    case "+":
      mainSelect.value = operatorDef["add"](
        Number(secSelect.value),
        Number(mainSelect.value)
      );
      break;
    case "-":
      mainSelect.value = operatorDef["subtract"](
        secSelect.value,
        mainSelect.value
      );
      break;
    case "*":
      mainSelect.value = operatorDef["mulitiply"](
        secSelect.value,
        mainSelect.value
      );
      break;
    case "/":
      mainSelect.value = operatorDef["divide"](
        secSelect.value,
        mainSelect.value
      );
      break;
    case "%":
      mainSelect.value = (100 * secSelect.value) / mainSelect.value;
  }
  secSelect.value = "";
  opStore = "";
  window.problemSolved = true;
  console.log("solved");

  if (mainSelect.value === "NaN" || mainSelect.value === "Infinity") {
    mainSelect.value = "Error";
  }
}

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);

    // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}
