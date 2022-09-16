let words = [
    "float",
    "acute",
    "section",
    "bell",
    "posture",
    "discuss",
    "closed",
    "pavement",
    "dairy",
    "missile",
    "pool",
    "strict",
    "abolish",
    "tone",
    "bubble",
    "cable",
    "rotation",
    "choose",
    "volunteer",
    "sentiment",
    "harsh",
    "jealous",
    "wolf",
    "software",
    "exchange",
    "sandwich",
    "gutter",
    "rub",
    "sugar",
    "election",
    "dimension",
    "combine",
    "pair",
    "rise",
    "spread",
    "fence",
    "defend",
    "apple",
    "soprano",
    "carry",
    "inside",
    "take",
    "seal",
    "tie",
    "standard",
    "grudge",
    "center",
    "corpse",
    "scale",
    "hurt"
];

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newGameButton = document.querySelector('#newGame');                 //new game button
let space = document.querySelector('.blank');                           //space is a blank space
let board = document.querySelector('.word');                            //word is the container div for the word
let wordBank = document.querySelector('.word-bank');                    //word bank selector
let playArea = document.body;                                           //the whole page is the play area
var count = 0;                                                          //the count for guesses, if it's 6 then game over
var random = words[Math.floor(Math.random() * words.length - 1)];       //pick a random word from the list
var gameOverWord = ['g', 'a', 'm', 'e', ' ', 'o', 'v', 'e', 'r'];
var correctGuess = 0;                                                   //correct guess counter
var length = random.length;


//clear the board and reset the game
function clear(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    //random = null;
    wordBank.innerText = '';
    count = 0;
    for (let i = 1; i < 7; i++) {
        document.querySelector('.part' + [i]).setAttribute("style", "visibility:hidden");
    };
    correctGuess = 0;
    length = 0;
}


//create the blank spaces
function setUp(spaces) {
    for (let i = 0; i < spaces.length; i++) {                   //loop through the word
        let newSpace = document.createElement('div');           //create a div
        newSpace.className = "blank space" + [i];               //with the class blank AND a number (starting at 0)
        board.appendChild(newSpace);                            //append a new div.blank child to board
    }
}


//game over
function gameOver(){
    clear(board);
    wordBank.innerText = 'Loser';
    for (let i = 0; i < gameOverWord.length; i++) {             //loop through the word
        random = "loser";                                       //did this so winner sequence wouldn't freak out
        let newSpace = document.createElement('div');           //create a div
        newSpace.className = "blank space" + [i];               //with the class blank AND a number (starting at 0)
        board.appendChild(newSpace);                            //append a new div.blank child to board
        newSpace.innerText = gameOverWord[i];
        var audioLose = document.getElementById('loser');
            audioLose.play();
    }
}


//keystroke listener
function keystroke(key) {
    var char = String.fromCharCode(key.which);
    var inputKey = char.toLowerCase();

    if (alphabet.includes(inputKey)) {                                      //if input is an alphabetical letter
        if (!random.includes(inputKey)){                                    //add a body part for each wrong guess
            count++;
            let part = document.querySelector('.part' + count);
            part.setAttribute("style", "visibility:visible");               //uncover a body part each incorrect guess
            if (count === 6) {                                              //at the count of 6, game over
                playArea.removeEventListener('keydown', keystroke);         //turn off keystroke logger
                gameOver();
            }
        } else {
            for (let i = 0; i < random.length; i++) {
                if (inputKey == random[i] && !wordBank.innerText.includes(inputKey)) {  //if guess is equal to a character in random and isn't already guessed
                    targetDiv = document.querySelector('.space' + [i]);                     //select the class "space[i]"
                    targetDiv.innerText = inputKey;                                         //put the letter in the div
                    correctGuess += 1;                                                      //add a point to correctGuess for each correct letter
                }
            }
        }

        if (!wordBank.innerText.includes(inputKey)) {
            wordBank.innerText += inputKey;                                     //add the guessed letter to the word bank
            }

        if (correctGuess == random.length) {                                //winner sequence
            var audio = document.getElementById('winner');
            audio.play();
        }
    }
}


//new game selects a word from a text file
newGameButton.addEventListener('click', () => {

    random = null;

    clear(board);                                                           //remove the old spaces

    random = words[Math.floor(Math.random() * words.length - 1)];           //come up with a new word

    setUp(random);                                                          //set up the blank word

    playArea.addEventListener('keydown', keystroke);

});