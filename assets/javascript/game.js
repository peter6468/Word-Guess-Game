//grab reference to my dom elemesnts
//create variables for game(woordbank, iwns, loses, picked word, guesses left, gmae running, picked word placeholder, guessed letter band, incorrect letter bank)
// new game function to reset all stats, pick mew word and create placeholders
// letterGuess functio, takes in the letter you presssed and sees it itin ont eh selected word
//check for incorrect(letter)
//checkLose
//checkWin
//add event listener for new game button
// add onkeyup event to trigger letterGuess


var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

var wordBank = ['Cobra Kai', 'Daniel Larusso', 'Johnny Lawrence', 'Amanda', 'Miguel', 'Robby', 'Sam'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

function newGame() {
    gameRunning = true;
    guessesleft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];


//pick a new word
pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log("The picked word is now: ", pickedWord);

for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === '') {
        pickedWordPlaceholderArr.push(' ');
    } else {
        pickedWordPlaceholderArr.push('_');
    }
  }
  $guessesLeft.textContent = guessesLeft;
  $placeholders.textContent = pickedWordPlaceholderArr.join('');
  $guessedLetters.textContent = incorrectLetterBank;
 }


 //letterGuess function, takes in the letter you pressed and sees if it's the selected word
 function letterGuess(letter) {
     console.log("Pressed letter was: ", letter);

     if (gameRunning === true && guessedLetterBank.indexOf(letter)  === -1) {
         //run game liogic
         guessedLetterBank.push(letter);

         //check if guessed letter is in my picked word
         for (var i =0; i < pickedWord.length; i++) {
             //convert both values to lowercase so I can compare them correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                //if a match, swap out that character in the placeholder with the actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
     }

     console.log("pickedWordPlaceholderArry: ", pickedWordPlaceholderArr)
     $placeholders.textContent == pickedWordPlaceholderArr.join('');
     
    }
     else {
        if (!gameRunning) {
            //!gameRunning=game not running
            alert("The game is not running, click on the New Game Button to a new Cobra Kai sessiong of Hangman.");
        } else {
            alert("You've already guessed this letter, try to find balance and try a new one!");
        }
    }
 }
function checkIncorrect(letter) {
        if (
        pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 
        && 
        (pickedWordPlaceholderArr.indexOf(letter.toUpperCase))  === -1
){
    guessesLeft--;
    incorrectLetterBank.push(letter);
    $guessedLetters.textContent.join(' ');
    $guessesLeft.textContent = guessesLeft;
 }
}




//add event listener for new game button
$newGameButton.addEventListener('click', newGame);

//add onekyup event to trigger letterGuess
document.onkeyup = function(event) {
    //check if is a letter
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);

    }
}
