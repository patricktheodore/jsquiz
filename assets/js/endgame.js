const highScoresList = document.getElementById('highscores-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var clearScoresBtn = document.getElementById('clear-scores-btn');
var highScoresListEl = ''; 



highScoresListEl.innterHTML="";  
for (let i = 0; i < highScores.length; i++) { //run for loop to display li items with highscores 
    let li = document.createElement('li');
    li.textContent = (highScores[i].name + " - " + highScores[i].score);
    highScoresList.append(li); //append them to the page
};

clearScoresBtn.addEventListener('click', clearScores); 

function clearScores() { //allow user to clear highscore page, by clearing local storage
    localStorage.clear();
    highScoresListEl.innterHTML=""; 
    while (highScoresList.hasChildNodes()) {
        highScoresList.removeChild(highScoresList.firstChild); //removes our highscores list first child, whilst it has child Nodes. this removing them all eventually
    }
};



