import words from "./words.js";

const keyboard = document.getElementById("keyboard");
const currWord = document.getElementById("current-word");
const currHint = document.getElementById("hint");
const head = document.getElementById("head");
const torso = document.getElementById("torso");
const leftArm = document.getElementById("left-arm");
const rightArm = document.getElementById("right-arm");
const leftLeg = document.getElementById("left-leg");
const rightLeg = document.getElementById("right-leg");
const game = document.getElementById("game");
const gameOver = document.getElementById("game-over");
const restartGame = document.getElementById("restart-game")
const restartBtn = document.getElementById("restart-btn");
const theEnd = document.getElementById("the-end")

restartGame.className = "invisible";

restartBtn.addEventListener("click", restart);

let indexHistory = [];
let pick;
let displayWord;
let displayWordObj = {};
let countdown = 7;

function getCurrRandomIndex() {
  let randomIndex = Math.floor(Math.random() * words.length);
  while (indexHistory.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * words.length);
  }
  indexHistory.push(randomIndex);
  return randomIndex;
}

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

    displayWordObj[i + 1] = {
      letter: pick.word[i],
      show: "no",
    };
  }
}

function removeAllChild(id) {
  while (id.hasChildNodes()) {
    id.removeChild(id.firstChild);
  }
}

function resetPlayingWord() {
  removeAllChild(currWord);
  removeAllChild(currHint);
  removeAllChild(keyboard);
  setPick();
  setHint();
  setKeyboard();
  displayWordObj = {};
  setEmptyWordState();
  countdown = 7;
  rightArm.className = "visible";
  leftArm.className = "visible";
  rightLeg.className = "visible";
  leftLeg.className = "visible";
  torso.className = "visible";
  head.className = "visible";
}

function gameIsNowOver() {
  game.className = "invisible";
  gameOver.className = "visible";
  restartBtn.className = "visible"
}

function restart() {
  indexHistory = [];
  resetPlayingWord();
  restartBtn.className = "invisible";
  gameOver.className = "invisible";
  theEnd.className = "invisible"
  game.className = "visible";
  rightArm.className = "visible";
  leftArm.className = "visible";
  rightLeg.className = "visible";
  leftLeg.className = "visible";
  torso.className = "visible";
  head.className = "visible";
}

function endGame() {
  game.className = "invisible";
  rightArm.className = "invisible";
  leftArm.className = "invisible";
  rightLeg.className = "invisible";
  leftLeg.className = "invisible";
  torso.className = "invisible";
  head.className = "invisible";
  theEnd.className = "visible"
  restartBtn.className = "visible";
}

function amputate() {
  if (countdown === 6) {
    rightLeg.className = "invisible";
  }
  else if (countdown === 5) {
    leftLeg.className = "invisible";
  } else if (countdown === 4) {
    rightArm.className = "invisible";
  }
  else if (countdown === 3) {
    leftArm.className = "invisible";
  }
  else if (countdown === 2) {
    torso.className = "invisible";
  }
  else if (countdown === 1) {
    head.className = "invisible";
    gameIsNowOver();
  }
}

function letterClicked(event) {
  const letterButton = event.target;
  letterButton.className = "foggy-blue";
  letterButton.disabled = true;
  let clickedLetter = letterButton.innerText.toLowerCase();

  if (pick.word.includes(clickedLetter)) {
    for (const letter of pick.word) {
      if (letter === clickedLetter) {
        for (const position in displayWordObj) {
          if (displayWordObj[position].letter === clickedLetter) {
            displayWordObj[position].show = "yes";
          }
        }
      }
    }

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

    for (let i = 0; i < newWord.length; i++) {
      const currWorldLetter = document.createElement("span");
      currWorldLetter.innerText = newWord[i];
      currWorldLetter.className = "letter";
      currWord.appendChild(currWorldLetter);
    }
  } else {
    countdown -= 1;
    amputate();
  }

  let guessedLetters = 0;
  for (const position in displayWordObj) {
    if (displayWordObj[position].show === "yes") {
      guessedLetters += 1;
    }
  }

  if (guessedLetters === displayWord.length) {
    if (indexHistory.length === words.length) {
      endGame();
    } else {
      setTimeout(resetPlayingWord, 1500);
    }
  }
}

resetPlayingWord()