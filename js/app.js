/*
 * Create a list that holds all of your cards
 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */


// Array with cards
let cards = ["fa-fa-diamond", "fa-fa-paper-plane-o", "fa-fa-anchor", "fa-fa-bolt",
         "fa-fa-cube", "fa-fa-anchor", "fa-fa-leaf", "fa-fa-bicycle",  "fa-fa-diamond", "fa-fa-bomb",
         "fa-fa-leaf", "fa-fa-bomb", "fa-fa-bolt", "fa-fa-bicycle", "fa-fa-paper-plane-o", "fa-fa-cube"];

const ulList = document.querySelector('.deck');
const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const span = document.getElementsByTagName('span');
const restart = document.getElementById('restart');
const timer = document.getElementById('timer');
const stars = document.getElementById('stars');
const counterBox = document.getElementById('moves');
const popup = document.getElementById('popup');

// clicks counter and timer

let clicks = 0;
let m = 0;
let s = 0;
let timeGoes = true;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the cards in array

let arrayList = [cards];

cards = shuffle(cards);


// list that holds all cards

function game(item, index, array) {
ulList.innerHTML += '<li class="card"><span class="lid"></span><i class="item"></i></li>';
document.querySelector('.item').className = item;
}

// loop of cards from array with use function 'game'

arrayList[0].forEach(game);

// Set the color of body background

if (arrayList[0] == cards) {
  document.body.style.backgroundColor = '#f8f5c6';
}

// event listener for element ul for function startGame

ulList.addEventListener('click', startGame, false);

// event listener for element with class name lid for function timerGameStart

const clickedCard = document.querySelectorAll('.lid');
for (let i = 0; i < clickedCard.length; i++) {
clickedCard[i].addEventListener('click', timerGameStart, false);
}

// Start game

function startGame(e) {

// stop propagation for click event
	e.stopPropagation();

// variable for one event target
	let clickedCard = e.target;

// variable for tag name on event target
	let cardCheck = e.target.tagName;

// check if span class name is 'lid' and if tag name is not 'UL'
	if (clickedCard.className == 'lid' && cardCheck != 'UL') {

    // if check is correct, change class of element for 'open'
		clickedCard.className = 'open';

		// call to functions: clicksCounter, cardMatchList and rating
		clicksCounter();
		cardMatchList();
		rating();

		// The  icon for restart game
		restart.innerHTML = '<span class="restart-span">↻</span>';
	}
}
// variable whith the array with cards that have class 'open'
let listOpenCards = [];

// variable which handle the array with cards that have class 'matched'
let listMatchedCards = [];

function cardMatchList() {

	// variable whith length of list of open cards
	let noOfCards = listOpenCards.length;

	// variable whith length of list of matched cards
	let noOfMatchedCards = listMatchedCards.length;

	// check if some element span in document has class with name 'open'
	if (span.className = 'open') {

		// add to array with open elements span elements with class name 'open'
		listOpenCards[noOfCards] = document.getElementsByClassName('open');

		// check if on array with open elements are 2 elements
		if (listOpenCards.length == 2) {

		  // loops on elements in array with open elements
		  for (const openCard of listOpenCards) {

			  // variables which handle these two elements from array with open span elements
			  let openCard1 = openCard[0];
			  let openCard2 = openCard[1];

			  // check if these two elements have the same class name
			  if (openCard1.nextSibling.className === openCard2.nextSibling.className) {

				  // siblings of these elements rotate
				  openCard1.nextSibling.style.transform = 'rotateY(180deg)';
				  openCard2.nextSibling.style.transform = 'rotateY(180deg)';

				  // siblings of these elements with class mame 'matched'
				  openCard1.nextSibling.className += ' matched';
				  openCard2.nextSibling.className += ' matched';

				  // remove from these elements class name 'open'
				  openCard1.classList.remove('open');
				  openCard2.classList.remove('open');

				  // add to array with matched elements these two elements
				  listMatchedCards.length = listMatchedCards.length + 2;

				  // reset number of elements in array with open elements to 0
				  listOpenCards.length = 0;

				  // check if number of elements in array with matched elements is 16
				  if (listMatchedCards.length == 16) {

					  // game over
            gameOver();
          }
        }
          else {

      // if these two elements haven't the same class change the class name of previous sibling element of these elements for 'lid' after 1000 miliseconds
      setTimeout(function() {
       openCard1.className = 'lid';
       openCard2.className = 'lid';
     }, 1000);

      // Reset number of elements in array with open elements to 0
      listOpenCards.length = 0;

        }
      }
    }
  }
}

// Number of clicks
function clicksCounter() {

	// Counting clicks on cards
	clicks = clicks + 1;
	counterBox.innerHTML = 'Moves: ' + clicks;

	// Remove event listener for function timerGameStart
	if (clicks == 1) {
		for (let i = 0; i < clickedCard.length; i++) {
			clickedCard[i].removeEventListener('click', timerGameStart, false);
		}
	}
}
// Stars
function rating() {
	if (clicks <= 20) {
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i><i class="star3">*</i>';
	}
	else if (clicks > 20 && clicks <= 35) {
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i>';
	}
	else if (clicks > 35) {
		stars.innerHTML = 'Star rating: <i class="star1">*</i>';
	}
}

// Start timer
function timerGameStart() {
	setInterval('count()', 1000);
}

// Stop timer
function timerGameStop() {
	timeGoes == false;
}

// Count game time
function count() {
	if(timeGoes == true) {
		s.value = s;
		m.value = m;

		s++;

		if (s == 60) {
			m++;
			s = 0;
		}
	}
  else {
		s = 0;
		m = 0;
	}
	timer.innerHTML = 'Time: ' + m + ' min ' + s + ' sec';
}

// New game
function newGame() {
	window.location.reload();

// Loop of cards from array with function 'game'
	cards[0].forEach(game);
}

// Event listener for 'restart' that calls to function newGame
restart.addEventListener('click', newGame, false);

// Popup when game is over

function gameOver() {

	// Variables for game time and stars
	let gameTime = m + ' min ' + s + ' sec';
	let gameRating = stars.innerHTML;

	// No display ul list with cards
	ulList.style.display = 'none';

	// Popup with scores
	popup.style.visibility = 'visible';
	header.style.visibility = 'hidden';

	popup.innerHTML = '<p><span class="popup-title">Congrats! You won!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + gameTime + '<br>' + gameRating + '<br>Moves: ' + clicks + '<br><br><button id="next-game">Play again</button></p>';

	// Stop the timer
	timeGoes = false;

	// Time on 0
	timer.innerHTML = "Time: 0 min 0 sec";

	// Variable next-game fot the button with id nextGame
	nextGame = document.getElementById('next-game');

	// Variable next-game event listener click that calls to function newGame
	nextGame.addEventListener('click', newGame, false);
}
