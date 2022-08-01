'use strict';

// Selecting Element
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const btnRoll = document.querySelector(`.btn--roll`);
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);

// Any Function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`); //remove and add class, if there remove, if not add
  player1El.classList.toggle(`player--active`);
};

// Initial Condition

let score, currentScore, activePlayer, playing;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();
// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${randomDice}.png`;
    // 3. Check for rolled 1
    if (randomDice !== 1) {
      // Add dice to current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Button Hold
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add currentScore to active player's score
    score[activePlayer] += currentScore;
    console.log(score[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. Check if player's score is >= 100
    // Finish the game
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      diceEl.classList.add(`hidden`);
      console.log(activePlayer);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
