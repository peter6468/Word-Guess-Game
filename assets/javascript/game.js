//in html DOM, the  ELEMENT OBJECT represents an HTML element, like P, DIV, A, TABLE or any other HTML element
//grab reference to my dom elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');


//create variables for game(wordBank, wins, losses, picked words guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['ninja', 'stars', 'Michaelangelo', 'Leonardo', 'Raphael', 'Donatello', 'Teenage Mutant Turtles'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//newGame function to reset all stats, pick new word and create placeholders
function newGame() {
    //reset all game info
    gameRunning = true;
    guessesleft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];


//pick a new word
pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
//console.log("The picked word is now: ", pickedWord);//

//create placehoders out of new pickedWord
for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === '') {
        pickedWordPlaceholderArr.push(' ');
    } else {
        pickedWordPlaceholderArr.push('_');
    }
  }

  //write all new game info to DOM
  $guessesLeft.textContent = guessesLeft;
  $placeholders.textContent = pickedWordPlaceholderArr.join('');
  $guessedLetters.textContent = incorrectLetterBank;
 }


 //letterGuess function, takes in the letter you pressed and sees if it's the selected word
 function letterGuess(letter) {
     console.log("Pressed letter was: ", letter);

     if (gameRunning === true && guessedLetterBank.indexOf(letter)  === -1) {
         //run game logic
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
     $placeholders.textContent = pickedWordPlaceholderArr.join('');
     //pass letter into our checkIncorrect function
     checkIncorrect(letter);
     
    }
     else {
        if (!gameRunning) {
            //!gameRunning=game not running
            alert("The game is not running, click on the New Game Button to a new NINJA sessiong of Hangman.");
        } else {
            alert("You've already guessed this letter, try to find balance and try a new one!");
        }
    }
 }

 //checkInCorrect(letter0)
function checkIncorrect(letter) {
    //check to see if letter didnt make it into our pickedWordPlaceHolder(therefore, incorrect guess)
        if (
        pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 
        && 
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase())  === -1
    ) {
    //decrement guesses
    guessesLeft--;
    //add incorrect letter to incorrectLetterBank
    incorrectLetterBank.push(letter);
    //write new bank of incorrect letters guessed to DOM
    $guessedLetters.textContent = incorrectLetterBank.join(' ');
    //write new amount of guesse left to DOM
    $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

//checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

//checkwin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLocaleLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}






//add event listener for new game button
$newGameButton.addEventListener('click', newGame);

//add onekyup event to trigger letterGuess
document.onkeyup = function(event) {
    //check if is a letter
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);

    }
}
