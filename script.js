const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start-button');
const timer = document.querySelector('#timer');
const resetButton = document.querySelector('#reset-button');
const highScore = document.querySelector('#high-score');
const currentScore = document.querySelector('#current-score');
const previousHighScore = parseInt(localStorage.getItem('highScore'))

//Gameboard pieces are unselectable unless you press the start game button.
gameContainer.classList.add('paused');

//If there is no localStorage for previous scores. The high score is set to 0.
let bestScore = 0;

if(previousHighScore > 0){
  bestScore = previousHighScore
} 
highScore.innerHTML = `Best Score: ${bestScore}`;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('unselected')

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// arrays are created to hold the potential guesses and matched items
const guesses = [];
const matched = [];

//attempts will increment and eventually be your score
let attempts = 0;

//allows game to begin and game pieces to be selectable
startBtn.addEventListener('click',function(e){
  gameContainer.classList.remove('paused');
  startBtn.classList.add('paused')
})

//clears out any array passed into it.
function clearArr(arr){
  for(let i = 0; arr.length > 0; i++)
  console.log(arr.pop())
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  //toggles chosen game pieces a class of selected, to be compared, and unpauses the game board so further selections can be made
  function selectionPause(){
    setTimeout(function(){
      firstGuess.classList.toggle('selected')
      secondGuess.classList.toggle('selected')    
      gameContainer.classList.remove('paused')   
       resetButton.classList.remove('paused')

    },1000)
  }

  let clickedItem = event.target
  clickedItem.classList.toggle('unselected');
  clickedItem.classList.toggle('selected');
  
  if(clickedItem.classList.contains('selected')){
    guesses.push(clickedItem)
  }
  
  let firstGuess = guesses[0];
  let secondGuess = guesses[1];

  //if two clicks are made. The gameboard is paused. The are pushed to guesses array as firstGuess and secondGuess. Your attempts increments by 1.
  if(guesses.length === 2){
    attempts++
    currentScore.innerText = (`Current Score: ${attempts}`)
    gameContainer.classList.add('paused')
    resetButton.classList.add('paused')

    // firstGuess and secondGuess classNames are compared. If there's a match, the guesses classes remove selected, receive matched, and get pushed to matched array. 
    if(firstGuess.className === secondGuess.className){
      matched.push(firstGuess)
      matched.push(secondGuess)

      //if the matched array length equal 10. All matches have been made and the game is complete. Your score is set to the number of attemps you made. The reset button text changes to "Play Again?". Your score is compared again the best score. If it is lower, score is saved to localStorage
      if(matched.length === 10){
        firstGuess.classList.toggle('selected')
        secondGuess.classList.toggle('selected')   
        let score = attempts
        gameContainer.classList.add('paused')
        resetButton.innerText = 'Play Again?'
        resetButton.classList.remove('paused')
        console.log(`You're Score: ${score}`)
        if(bestScore === 0 || bestScore > score){
          bestScore = attempts;
          highScore.textContent = (`High Score: ${bestScore}`)
          localStorage.setItem('highScore', bestScore)
        }
      }
        else{
          clearArr(guesses)
          selectionPause()
        }

    }     else{
      clearArr(guesses)
      setTimeout(() => {
        firstGuess.classList.toggle('unselected');       
        secondGuess.classList.toggle('unselected');
        
      }, 1000);
        selectionPause()
    }

      
    }
  }

// when the DOM loads
createDivsForColors(shuffledColors);
const body = document.querySelector('body');


//Resets game to default starting conditions
resetButton.addEventListener('click',function(event){
  location.reload(true)
})