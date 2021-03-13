var question = document.getElementById("question");
var message = document.getElementById("message");
var wiki = document.getElementById("wiki");
var btnTrue = document.getElementById("btn-true");
var btnFalse = document.getElementById("btn-false");
var btnNext = document.getElementById("btn-next");
var btnStart = document.getElementById("btn-start");
var btnRestart = document.getElementById("btn-restart");
var scoreText = document.getElementById("score");
var questionNumberText = document.getElementById("question-number");
var timerElement = document.getElementById("timer");

var questionNumber = 0;
var score = 0;
var standarQuestions = questions.length;
var maxQuestions = questions.length;
var random = Math.floor(Math.random() * maxQuestions);
var saveQuestions = [];
var startTime = 0;
var stopTime = 0;

function startTimer() {
    startTime = Date.now();
}

function stopTimer() {
    stopTime = Date.now();
}

function startgame() {
    btnStart.hidden = true;
    btnTrue.hidden = false;
    btnFalse.hidden = false;
    startTimer();
    renderRandomQuestion();
}

function renderRandomQuestion() {
    maxQuestions = questions.length;
    random = Math.floor(Math.random() * maxQuestions);
    question.innerHTML = questions[random].question;
}

function renderQuestion() {
    question.innerHTML = questions[questionNumber].question;
}

function nextQuestion() {
    saveQuestions.push(questions[random]);
    questions.splice(random, 1);
    wiki.innerHTML = "";
    if (questionNumber < maxQuestions) {
        questionNumber++; // questionNumber = questionNumber + 1;
        renderRandomQuestion();
        question.style.backgroundColor = "white";
        message.innerHTML = "";
        btnNext.hidden = true;
        btnTrue.disabled = false;
        btnFalse.disabled = false;
        btnTrue.style.border = "none";
        btnFalse.style.border = "none";
        questionNumberText.innerHTML = questionNumber + 1;
    } else {
        gameover();
    }
}

function gameover() {
    btnNext.hidden = true;
    btnTrue.hidden = true;
    btnFalse.hidden = true;
    btnRestart.hidden = false;
    message.hidden = true;
    question.style.backgroundColor = "white";
    question.innerHTML =
        "Από τις " +
        standarQuestions +
        " ερωτήσεις απάντησες σωστά στις " +
        score;
    var finalTime = stopTime - startTime;
    var defterolepta = Math.floor(finalTime / 1000);
    var timeToShow =
        "Χρόνος που έχει περάσει " + defterolepta + " δευτερόλεπτα!";

    if (defterolepta > 59) {
        var d = Math.floor(defterolepta / 60);
        var x = defterolepta - d * 60;
        if (x == 0) {
            timeToShow = "Χρόνος που έχει περάσει " + d + " λεπτά!";
        } else {
            timeToShow =
                "Χρόνος που έχει περάσει " +
                d +
                " λεπτά και " +
                x +
                " δευτερόλεπτα!";
        }
    }
    timerElement.innerHTML = timeToShow;
}

function answerButton(answer) {
    btnNext.hidden = false;
    if (answer == questions[random].answer) {
        question.style.backgroundColor = "green";
        message.style.color = "green";
        message.innerHTML = "Η απάντησή σας είναι ΣΩΣΤΗ!";
        btnFalse.style.border = "5px solid black";
        btnTrue.disabled = true;
        btnFalse.disabled = true;
        score++;
        scoreText.innerHTML = score;
    } else {
        question.style.backgroundColor = "red";
        message.style.color = "red";
        message.innerHTML = "Η απάντησή σας είναι ΛΑΘΟΣ!";
        btnTrue.style.border = "5px solid black";
        btnTrue.disabled = true;
        btnFalse.disabled = true;
    }

    if (questions[random].wiki) {
        wiki.innerHTML = questions[random].wiki;
    }

    if (maxQuestions == 1) {
        stopTimer();
        btnNext.innerHTML = "ΤΕΛΟΣ ΠΑΙΧΝΙΔΙΟΥ!";
    }
}

function restartGame() {
    // window.location = "./index.html";
    btnRestart.hidden = true;
    btnTrue.hidden = false;
    btnFalse.hidden = false;
    btnTrue.disabled = false;
    btnFalse.disabled = false;
    btnTrue.style.border = "none";
    btnFalse.style.border = "none";
    questionNumber = 0;
    questions = saveQuestions;
    renderRandomQuestion();
    score = 0;
    scoreText.innerHTML = 0;
    questionNumberText.innerHTML = 1;
}