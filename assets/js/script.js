//defining selectors
var countdownTimeText = document.querySelector(".timer-text");
var startButton = document.querySelector(".start-button");
var questionEl = document.getElementById("question");
var choiceA = document.getElementById("choice-a");
var choiceB = document.getElementById("choice-b");
var choiceC = document.getElementById("choice-c");
var choiceD = document.getElementById("choice-d");
var choiceContainers = document.querySelector(".choice-container");
var answerCard = document.getElementById("game");
var gameEl = document.querySelector(".container");
var scoreEl = document.getElementById("score");
var questionCounterEl = document.getElementById("question-counter");
var gameHud = document.querySelector(".game-info");
var endGameScore = document.querySelector(".exit-page");
var finalScoreEl = document.getElementById("final-score");
var saveScoreBtn = document.getElementById('save-score-btn');
const username = document.getElementById('username');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//defining some empty variables
var currentQuestion = {};
var availableQuestions = [];
var score = 0;
var questionCounter = 0;
var timer;
var timeLeft;
var question;
var possibleAnswers;
var finalScore;

//questions to render
var questions = [
    {
        question: "how do we define a variable?",
        answers: ["a. let", "b. a man walks into a var", "c. my variable is", "d. variable ="],
        correctAnswer: 0
    },
    {     
        question: "what is the correct syntax to log something to our console?",
        answers: ["a. please print this", "b. console.log()", "c. consolelog[]", "d. logmyconsole.[}"],
        correctAnswer: 1
    },
    {     
        question: "how can we change the style of an element on our html page",
        answers: ["a. js-color-changer", "b. colour-to", "c. css.change", "d. element.style = '';"],
        correctAnswer: 3
    },
    {     
        question: "how can we select an element by it's id?",
        answers: ["a. querySelect-MyId", "b. hey-boy-get-my-id.js", "c. document. getElementById('');", "d. fetchMy-Element"],
        correctAnswer: 2
    },
    {     
        question: "what method do you have to use to store things in localStorage?",
        answers: ["a. JSON.stringify", "b. JSON.parse", "c. js-score-setter", "d. save-my-score-papi"],
        correctAnswer: 0
    },
    {     
        question: "what is the correct for loop syntax?",
        answers: ["a. for (let i = 0; i < element.length; i++) {}", "b. for i = 0: i < 0: i+=", "c. for-ray-me-do-la", "d. for (i = 0; i < var: i = 0"],
        correctAnswer: 0
    },
    {     
        question: "what is the correct getItem from storage syntax?",
        answers: ["a. getItem (JSON.parse)", "b. JSON.parse (localStorage. getItem('')", "c. goGetIt", "d. pleaseGoGetIt"],
        correctAnswer: 1
    },
    {     
        question: "what method can we use to remove a string from an array?",
        answers: ["a. splice", "b. ploop", "c. push", "d. pinch"],
        correctAnswer: 0
    },
    {     
        question: "what is the correct syntax to compare both value and type",
        answers: ["a. equals", "b. ====!", "c. ===", "d. +=="],
        correctAnswer: 2
    },
    {     
        question: "is java and javaScript the same thing",
        answers: ["a. yeah, as well as java juice", "b. yes", "c. defintely yes", "d. no"],
        correctAnswer: 3
    },
];  

//defining constants to be referenced throughout
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const TIME_PENALTY = 5;
const DELAY = 750;
const MAX_HIGHSCORES = 3;

function init() {
}

//start game function which will display game elements and hide the start button. also will start countdown timer
function startGame() {
    answerCard.style = "display:inline";
    gameHud.style = "display:flex";
    timeLeft = 120;
    questionCounter = 0;
    score = 0; //setting score to 0
    availableQuestions = [...questions] 
    startTimer(); //start time interval
    loadQuestion(); //will load a question
    startButton.style = "display:none";
}

//timer function, counting down from 120
function startTimer() {
    timer = setInterval(function() {
        timeLeft --;
        renderScores();
        if (timeLeft >=0 ) {
            if (questionCounter > questions.length  && timeLeft > 0) { //setting rules to check if the game is over
                clearInterval(timer);
                gameOver();
            }
        }
        if (timeLeft === 0) { //end the game when timer hits 0
            clearInterval(timer); //clear timer interval
            gameOver(); //run game over function if the above is met     
        }
    }, 1000); //1second
}

//change game HUD
function renderScores() {
    scoreEl.textContent = score
    countdownTimeText.textContent = timeLeft;
}

//save highscore 
function saveHighscore(event) {
    event.preventDefault(); //prevent page refresh

    const scoreToStore = { //creating an object to set localStorage
        score: finalScore,
        name: username.value
    };

    highScores.push(scoreToStore); //sort the highscores from highest to lowest
    highScores.sort((a,b) => {
        return b.score - a.score;
    } )

    highScores.splice(3); //keep only the top 3 scores

    localStorage.setItem("highScores", JSON.stringify(highScores)); //convert with JSON string
    clearHighscoreHud(); //run clearhighscoresHUD function
}

//improve user experience, also only allows one score to be saved each game. 
function clearHighscoreHud() { 
    username.style = "display:none"; 
    saveScoreBtn.style = "display:none";
    finalScoreEl.textContent = 'saved.';
}

username.addEventListener('keyup', function() { //cant save highscore without a name input, by disabled the button
    saveScoreBtn.disabled = !username.value;
});

saveScoreBtn.addEventListener('click', saveHighscore);

function gameOver () {
    gameEl.style = "display:none"; //hide components no longer needed
    getFinalScore();
    gameHud.style = "display:none";
    endGameScore.style = "display:flex";
    finalScoreEl.textContent = finalScore; //set final score
}

function getFinalScore () {
    var scoreAdd = score * (timeLeft + 1); //running a calculating to get a more dynamic score
    finalScore = scoreAdd;
}

function loadQuestion () { //load question function
    questionCounter++;
    questionCounterEl.textContent = questionCounter + '/10'; //giving user a questions counter display

   if (questionCounter > questions.length && questionCounter >= MAX_QUESTIONS) { //if our counter is bigger than our max questions constant, we have no more questions to ask and run game over function
        return gameOver();
   }
    
    var i = Math.floor(Math.random() * availableQuestions.length); //selecting a random question from array
    currentQuestion = availableQuestions[i];
    questionEl.textContent = currentQuestion.question;

    choiceA.textContent = availableQuestions[i].answers[0]; //displaying options from the same object referenced by i
    choiceB.textContent = availableQuestions[i].answers[1];
    choiceC.textContent = availableQuestions[i].answers[2];
    choiceD.textContent = availableQuestions[i].answers[3];

    availableQuestions.splice(i, 1); //remove the question we have just asked from available questions var so it cannot be selected again
};

answerCard.addEventListener('click', checkAnswer);

function checkAnswer(event) {
    const selectedChoice = event.target; //check if a button was clicked
    const selectedAnswer = selectedChoice.dataset["number"]; //if it was check to see if its data-attribute matches the correct answer
    
    if (!event.target.classList.contains('choice-text')) return //stop the div containing choices from returning an incorrect answer. 

    if ( String(selectedAnswer) === String(currentQuestion.correctAnswer)) { //converting to the same type and checking if the value is the same 
        correct();
        setBackgroundGreen(event.target); //changing the container to green to show correct answer
    } else {
        incorrect();
        setBackgroundRed(event.target); //change the container to red to show incorrect answer
    }
    setTimeout(() => {
        loadQuestion();
    }, DELAY) //runs a delay so for better user experience 
    renderScores();
}

function setBackgroundGreen(element) {
    element.classList.add('background-green'); //add a html class, that references a css selector to change the background color
    setTimeout(() => {
        element.classList.remove('background-green');
    }, DELAY)
}

function setBackgroundRed(element) {
    element.classList.add('background-red');
    setTimeout(() => {
        element.classList.remove('background-red');
    }, DELAY)
}

function correct() {
    score += CORRECT_BONUS; 
    scoreEl.classList.add('background-green'); //change the score display to background green for the same amount of time as the choice container
    setTimeout(() => {
        scoreEl.classList.remove('background-green');
    }, DELAY)
}

function incorrect() {
    timeLeft -= TIME_PENALTY; //change the time to flash red indicating a loss of time referenced by time penalty const
    countdownTimeText.classList.add('background-red');
    setTimeout(() => {
        countdownTimeText.classList.remove('background-red');
    }, DELAY)
}

startButton.addEventListener("click", startGame); //start game button :) 

init();
