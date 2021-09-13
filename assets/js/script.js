//defining variables 
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


var currentQuestion = {};
var availableQuestions = [];
var score = 0;
var questionCounter = 0;
var acceptingAnswers = false; //i want sommeone only to be able to click when there is an option available (create delay in between clicks)

var questions = [
    {
        question: "what is my first name?",
        answers: ["a. patrick", "b.sturat", "c. alec", "d. gabriela"],
        correctAnswer: 0
    },
    {     
        question: "what is my last name?",
        answers: ["a. patrick", "b.sara", "c. alec", "d. gabriela"],
        correctAnswer: 1
    },
    {     
        question: "what is my middle name?",
        answers: ["a. patrick", "b.sturat", "c. alec", "d. theodore"],
        correctAnswer: 3
    }
];  

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
const TIME_PENALTY = 5;  // 5 sec
const DELAY = 1000;


var timer;
var timeLeft;
var question;
var possibleAnswers;

//javascript code quiz

//on page load, fetch scores stored in local storage. init will run on page load
function init() {
}

//start game function that begins timer
function startGame() {
    answerCard.style = "display:inline";
    timeLeft = 120;
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    startTimer();
    loadQuestion();
    startButton.style = "display:none";
}

//start button function - starts a countdown timer from 60 using event listener on start button
//also calls function game over if time hits =< 0
function startTimer() {
    timer = setInterval(function() {
        timeLeft --;
        renderScores();
        if (timeLeft >=0 ) {
            if (questionCounter > questions.length  && timeLeft > 0) {
                clearInterval(timer);
                gameOver();
            }
        }
        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver();            
        }
    }, 1000);
}

function renderScores() {
    scoreEl.textContent = score
    countdownTimeText.textContent = timeLeft;
}

function saveHighscore() {
    //show or create a highscore form. score === timeleft, option to enter a name and save

}

function gameOver () {
    gameEl.style = "display:none";

}


    //load highscore form | run highscore load function
    //option to play again
    //clears the rest of the game functions/renders

function loadQuestion () {
    questionCounter++;
    questionCounterEl.textContent = questionCounter + '/10';


    //generate random number. then load the question with random number index
   if (questionCounter > questions.length && questionCounter >= MAX_QUESTIONS) {
        return gameOver();
   }
    
    var i = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[i];
    questionEl.textContent = currentQuestion.question;

    choiceA.textContent = availableQuestions[i].answers[0];
    choiceB.textContent = availableQuestions[i].answers[1];
    choiceC.textContent = availableQuestions[i].answers[2];
    choiceD.textContent = availableQuestions[i].answers[3];

    availableQuestions.splice(i, 1);

}

//choice event listener
game.addEventListener('click', checkAnswer);

function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    
    if ( String(selectedAnswer) === String(currentQuestion.correctAnswer)) {
        correct();
        setBackgroundGreen(event.target);
    } else {
        incorrect();
        setBackgroundRed(event.target);
    }
    setTimeout(() => {
        loadQuestion();
    }, DELAY)
    renderScores();
}




function setBackgroundGreen(element) {
    element.classList.add('background-green');
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

//correct answer function - add points to score
function correct() {
    score += CORRECT_BONUS;
}

//incorrect function - deducts time from the clock
function incorrect(params) {
    timeLeft -= TIME_PENALTY;
}

startButton.addEventListener("click", startGame); 

init();
