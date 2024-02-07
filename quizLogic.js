//check for answer by checking if the answer includes the user's chosen answer (for example: "abcd" includes a)
let questions = [
    {
        prompt: "What is the current highest V grade of outdoor boulders?",
        options: ["V10", "V17", "V29", "V40"],
        answer: "b",
        chosenAnswer: ""
    },
    {
        prompt: "If you randomly select an answer for this question, what is the chance of that answer being correct?",
        options: ["25%", "25%", "50%", "75%"],
        answer: "abcd",
        chosenAnswer: ""
    },
    {
        prompt: "What is the best skytrain station in Surrey?",
        options: ["Scott Road Station", "Gateway Station", "Surrey Central Station", "King George Station"],
        answer: "c",
        chosenAnswer: ""
    },
    {
        prompt: "Why was the JavaScript developer sad?",
        options: ["Because he used up all their cache!", "Feelings just wasn't their type.", "Because they didn't know how to null their feelings.", "Because they had too many dependencies."],
        answer: "c",
        chosenAnswer: ""
    },
    {
        prompt: "What's a Squid Game player's favorite bedtime story?",
        options: ["The one where they dream of a better life between rounds.", "The one where they wake up from this nightmare.", "The one about the loved ones they left behind.", "\"Our suffering is your entertainment.\""],
        answer: "b",
        chosenAnswer: ""
    },
    {
        prompt: "Where did the 2 previous questions and their answers come from?",
        options: ["A punny book of puns", "Instagram Influencer post captions", "The decorations on a sushi menu", "Asking ChatGPT to tell me puns then slightly editing them myself to fit the questions."],
        answer: "d",
        chosenAnswer: ""
    }
];

const MIN_INDEX = 0;
const MAX_INDEX = questions.length - 1; //max question index, update when adding new questions
const questionNum = document.getElementById("question-number");
const questionPrompt = document.getElementById("question-prompt");
const submitButton = document.getElementById("submit--button");
const lastButton = document.getElementById("last--button");
const nextButton = document.getElementById("next--button");

const labels = [document.getElementById("label-a"),
document.getElementById("label-b"),
document.getElementById("label-c"),
document.getElementById("label-d")];

let currentQuestionIndex = 0;
let score = 0;
let answerChoice = "";
let quizDone = false;

//function for showing the question, if there is a chosen answer (not empty string), put a tick at the end for correct answer and a red x if incorrect
//change the question number (1 of 10), change the question prompt and each choice.
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    //Need to uncheck the radio button everytime showAnswer

    questionNum.textContent = "Question " + (currentQuestionIndex + 1) + " of " + (MAX_INDEX + 1);

    questionPrompt.textContent = currentQuestion.prompt;

    //Change text of answer choices
    for (let i = 0; i < 4; i++) {
        labels[i].textContent = currentQuestion.options[i];
        if (quizDone && (currentQuestion.answer == "abcd" || (currentQuestion.answer.charCodeAt(0) - 97) == i)) {
            labels[i].textContent += "✔️";
        } else if (quizDone && (!currentQuestion.answer.includes(currentQuestion.chosenAnswer))
            && (currentQuestion.chosenAnswer.charCodeAt(0) - 97) == i) {
            labels[i].textContent += "❌";
        }
    }

    //After result is out, tick the end if answer is correct
    //Maybe create a global boolean variable "done" to track if the quiz is done or not
    if (currentQuestion.chosenAnswer.localeCompare("") != 0) {
        const lastChosenButton = document.getElementById(currentQuestion.chosenAnswer);
        lastChosenButton.checked = true;
        //add an X at the end if incorrect

    } else {
        unCheck();
    }

    //disable submit button until a radio button is checked
    //disable next button if this is the current furthest question
}


//function for submitting, includes checking for correct answer and changing the chosenAnswer
function saveAnswer() {
    let answerChoice = document.querySelector('input[name="answer"]:checked');
    if (answerChoice != null) {
        questions[currentQuestionIndex].chosenAnswer = answerChoice.id;
    }
}

function unCheck() {
    let answerChoice = document.querySelector('input[name="answer"]:checked');
    if (answerChoice != null) {
        answerChoice.checked = false;
    }
}

//function for going to previous question, doesn't allow if at question 0
function lastQuestion() {
    if (currentQuestionIndex > MIN_INDEX) {
        if (!quizDone) saveAnswer();
        currentQuestionIndex--;
        showQuestion();
    }
}

//function for going to next question, doesn't allow if at question MAX
function nextQuestion() {
    if (currentQuestionIndex <= MAX_INDEX) {
        if (!quizDone) saveAnswer();
        //non-last question
        if (currentQuestionIndex < MAX_INDEX) {
            //check if an answer is chosen, only go to next question if there is an answer chosen
            chosenAnswer = document.querySelector('input[name="answer"]:checked');
            if (chosenAnswer != null) {
                currentQuestionIndex++;
                showQuestion();
            }
        }
        //last question 
        else {
            showResult();
            showQuestion();
        }
    }
}

function showResult() {
    let point = getPoint();

    quizDone = true;

    document.getElementById("points").textContent = "Your Points: " + point + "/" + (MAX_INDEX + 1);
    document.getElementById("score").textContent = "Your Score: " + (point / (MAX_INDEX + 1) * 100).toFixed(2) + "%";

    document.getElementById("results").style.visibility = "visible";
}

function getPoint() {
    let point = 0;
    for (let i = 0; i <= MAX_INDEX; i++) {
        let solution = questions[i].answer;
        let chosen = questions[i].chosenAnswer;
        if (solution.includes(chosen)) {
            point++;
        }
    }
    return point;
}
//result section, maybe make it disabled until the final question is submitted. Once reaches here, disable submit button.

showQuestion();

nextButton.addEventListener("click", nextQuestion);
lastButton.addEventListener("click", lastQuestion);
