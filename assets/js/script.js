

//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
    title: "The condtion in an if / else statement is enclosed with _____.",
    choices: ["Quotes", "Cruly Brackets", "Parenthesis", "Square Brackets"],
    answer: "Parenthesis"
},
{
    title: "Commonly used data types DO not include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
},
{
    title: "Arrays in JavaScript can be used to store _____.",
    choices: ["Numbers and Strings", "Other Arrays", "booleans", "All of the above"],
    answer: "All of the above"
},
{
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal/Bash", "For Loops", "Console Log"],
    answer: "Javascript"
},
{
    title: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "Quotes"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}


    // This function will check the correct answer against the user choice
    // It will also load the next question, or if it is the last question, will show gameOver()
    function checkAnswer(event) {
        event.preventDefault();
        var wrongAnswer = 10;
        var q = questionList[currentQuestionIndex];
        var userInput = this.children[0].getAttribute("data-answer");
        if (userInput === q.correctAnswer) {
            score++;
            displayCorrect();
        } else {
            countDown = countDown - wrongAnswer;
            countDown.textContent = countDown;
            displayWrong();
        };
        if (currentQuestionIndex < lastQuestionIndex) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            gameOver();
        };
    };

    // This displays the word "Correct!"
    function displayCorrect() {
        var correct = createElement("h3", "id", "correct", "Correct!");
        appendChild(document.body, correct);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("correct");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    // This displays the word "Wrong!"
    function displayWrong() {
        var wrong = createElement("h3", "id", "wrong", "Wrong!")
        appendChild(document.body, wrong);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("wrong");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}