import words from "./words.js";

let indexHistory = [];
const keyboard = document.getElementById("keyboard");
const currWord = document.getElementById("current-word");
const currHint = document.getElementById("hint");

function getCurrRandomIndex() {
  let randomIndex = Math.floor(Math.random() * words.length);
  while (indexHistory.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * words.length);
  }
  indexHistory.push(randomIndex);
  return randomIndex;
}

let pick;
let displayWord;
let displayWordObj = {};

console.log(displayWordObj)

function setPick() {
  pick = words[getCurrRandomIndex()];
}

function setHint() {
  currHint.innerText = pick.hint;
}

function setKeyboard() {
  for (let i = 65; i <= 90; i++) {
    const letterButton = document.createElement("button");
    letterButton.innerText = String.fromCharCode(i);
    letterButton.className = "blue";
    letterButton.addEventListener("click", letterClicked);
    keyboard.appendChild(letterButton);
}
}

function setEmptyWordState() {
  for (let i = 0; i < pick.word.length; i++) {
    const currWorldLetter = document.createElement("span");
    currWorldLetter.innerText = "_";
    currWorldLetter.className = "letter";
    currWord.appendChild(currWorldLetter);
    displayWord += "_";

    displayWordObj[i+1] = {
      letter: pick.word[i],
      show: "no"
      }
  }
}

function removeAllChild(id) {
  while (id.hasChildNodes()) {
      id.removeChild(id.firstChild)
  }
}


function letterClicked(event) {
  const letterButton = event.target;
  letterButton.className = "foggy-blue";
  let clickedLetter = letterButton.innerText.toLowerCase();
  
  if (pick.word.includes(clickedLetter)) {
    for (const letter of pick.word) {
      if (letter === clickedLetter) {
       for (const position in displayWordObj) {
        if (displayWordObj[position].letter === clickedLetter) {
          displayWordObj[position].show = "yes"
        }
       }
      }
    }
    console.log(displayWordObj)
    let newWord = "";
    for (const position in displayWordObj) {
      if (displayWordObj[position].show === "yes") {
        newWord += displayWordObj[position].letter;
      } else {
        newWord += "_";
      }
    }

    displayWord = newWord;
    removeAllChild(currWord);

    for (let i=0; i < newWord.length; i++) {
        const currWorldLetter = document.createElement("span");
        currWorldLetter.innerText = newWord[i];
        currWorldLetter.className = "letter";
        currWord.appendChild(currWorldLetter);
    }
  }

  let guessedLetters = 0;
  for (const position in displayWordObj) {
    if (displayWordObj[position].show === "yes") {
      guessedLetters += 1
    }
  }

  console.log(guessedLetters, displayWord.length)
  if (guessedLetters === displayWord.length) {
    removeAllChild(currWord);
    removeAllChild(currHint);
    removeAllChild(keyboard)
    setPick();
    setHint();
    setKeyboard();
    displayWordObj = {};
    setEmptyWordState();

  }
}

setPick();
setHint();
setEmptyWordState();
setKeyboard();

console.log(pick);

