const highScoresList = document.getElementById('highscores-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var clearScoresBtn = document.getElementById('clear-scores-btn');
var highScoresListEl = ''; 



highScoresListEl.innterHTML=""; 
for (let i = 0; i < highScores.length; i++) {
    let li = document.createElement('li');
    li.textContent = (highScores[i].name + " - " + highScores[i].score);
    highScoresList.append(li);
};

clearScoresBtn.addEventListener('click', clearScores); 

function clearScores() {
    localStorage.clear();
    highScoresListEl.innterHTML=""; 
    while (highScoresList.hasChildNodes()) {
        highScoresList.removeChild(highScoresList.firstChild);
    }
};



