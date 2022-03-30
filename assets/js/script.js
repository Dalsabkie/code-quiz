var startTime =30
var timerEl = document.getElementById("timer")
var timeEl = document.querySelector(".time")
var finalScoreEl = document.querySelector(".final-score")
var quizQuestionsEl = document.querySelector(".quiz-questions")
var startBtnEl = document.getElementById("start-btn")
var instructionsEl = document.querySelector(".instructions")
var questionEl = document.querySelector(".question")
var answer1El = document.getElementById("answer1")
var answer2El = document.getElementById("answer2")
var answer3El = document.getElementById("answer3")
var answer4El = document.getElementById("answer4")
answer1El.addEventListener("click", validateAnswer)
answer2El.addEventListener("click", validateAnswer)
answer3El.addEventListener("click", validateAnswer)
answer4El.addEventListener("click", validateAnswer)
var choiceEl = document.getElementById("choice")
var userScoreEl = document.querySelector(".userScore")
var saveScoreEl = document.getElementById("save-score")
// var highScoreListEl = document.querySelector(".highScoreList")
var initialsEl = document.getElementById("user")

finalScoreEl.style.display = "none"
quizQuestionsEl.style.display = "none"

var questionNum = 0
var score = 0
var timerObject

var questionsList = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ____",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parentheses",
        choice4: "square brackets",
        answer: "curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store ____",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parentheses",
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: "console.log"
    },
]

startBtnEl.addEventListener("click", function () {
    quizQuestionsEl.style.display = "block"
    instructionsEl.style.display = "none"
    showQuestion()
    timerObject = setInterval(function () {
        timerEl.textContent = startTime
        if (startTime >= 1) {
            startTime--;
        } else {
            clearInterval(timerObject)
            timerEl.textContent = "Time is up!"
            quizQuestionsEl.style.display = "none"
            finalScoreEl.style.display = "block"
            userScoreEl.textContent = "Your Final Score is: " + score 
        }
    }, 1000)
})

function showQuestion() {
    questionEl.textContent = questionsList[questionNum].question
    answer1El.textContent = questionsList[questionNum].choice1
    answer2El.textContent = questionsList[questionNum].choice2
    answer3El.textContent = questionsList[questionNum].choice3
    answer4El.textContent = questionsList[questionNum].choice4
}

function validateAnswer() {
    var userChoice = this.textContent
    if (userChoice === questionsList[questionNum].answer) {
        score += 5
        choiceEl.textContent = "Correct!"
    } else {
        startTime -= 5
        choiceEl.textContent = "Incorrect!"
    }
    if (questionNum < questionsList.length - 1) {
        questionNum++
        showQuestion()
    } else {
        finalScoreEl.style.display = "block"
        quizQuestionsEl.style.display = "none"
        clearInterval(timerObject)
        userScoreEl.textContent = "Your Final Score is: " + score 
        timeEl.textContent = "Remaining Time: "
        timerEl.textContent = `${startTime}`
    }
}

saveScoreEl.addEventListener("click", function(event) {
    // event.preventDefault()
    var highScoreArr = localStorage.getItem("highScore")
    highScoreArr = JSON.parse(highScoreArr) || []
    var initials = initialsEl.value
    var data = { initials: initials, score: score }
    highScoreArr.push(data)
    localStorage.setItem("highScore", JSON.stringify(highScoreArr))
    console.log(data)
})