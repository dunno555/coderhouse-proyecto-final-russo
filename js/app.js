// Question is the class for the Question objects, which includes the question text and each of the answers
// for the question
import { Question } from "./question.js";
// SVG for the correct and incorrect icons that are shown when an answer is submitted
import { correctIcon, incorrectIcon } from "./icons.js";
// Player is the class for the Player object, which includes name and score for the player
import { Player } from "./player.js";
// QuestionsAPI handles the retrieving of the questions and answers from the Trivia API
import { QuestionsAPI } from "./triviaAPI.js";
// this file handles the building of the leaderboard shown at the end of the game
import { leaderboardBuilder } from "./leaderboard.js";

// variables used in the application
const form = document.querySelector('form');
const initialState = document.querySelector('#initial-state');
const sectionContainer = document.querySelector('#section-container');
const formElements = document.querySelectorAll('.form-check');
const navBarText = document.querySelector('.navbar-text');
const submitBtn = document.querySelector('#submitBtn');
const nextBtn = document.querySelector('#nextBtn');
const inputBtns = document.querySelectorAll('input');
const endBtn = document.querySelector('#endBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const endgame = document.querySelector('#end-game');
const finalScore = document.querySelector('#final-score');
const difficultyText = document.querySelector('#difficulty');

// the first variable is the array that holds the questions when the game is being played, and the second variable
// is used to manage the beginning and ending of the application. The last variable is used to set the difficulty
// of the game, as well as displaying the leaderboard based on the difficulty
let randomizedQuestions = [], currentIndex, difficulty;

// Initializing the QuestionsAPI class, so that we can call on new questions every time the app is initialized
let questions = new QuestionsAPI;

// handles the showing of the loader at the beginning of the game
function loading() {
    let loader = document.querySelector('#loader');
    initialState.classList.add('hide');
    loader.classList.remove('hide');
    setTimeout(() => {
        loader.classList.add('hide');
        sectionContainer.classList.replace('hide', 'container');
    }, 3000);
};

// handles the setting of the animation when moving to the next question and then calls another function to show it
function setQuestion() {
    sectionContainer.classList.contains('slide-out-left') && sectionContainer.classList.remove('slide-out-left');
    inputBtns.forEach((el) => {
        el.checked = false;
    });
    showQuestion(randomizedQuestions[currentIndex]);
};

// handles the displaying of the question on the screen, as well as setting the data-correct data attribute on the
// correct answer
function showQuestion(question) {
    document.querySelector('#question-container > h3').innerText = `Question ${currentIndex + 1}/5`;
    document.querySelector('#question-container > h4').innerText = question.question;
    // clearing data attribute so that incorrect answers are not marked as correct
    document.querySelectorAll('[data-correct]').forEach((el) => {
        el.removeAttribute('data-correct');
    })

    question.answers.forEach((answer, index) => {
        let answerLabel = document.getElementById(`option-${index + 1}-label`);
        answerLabel.innerText = answer.text;
        // if answer.correct is true, then we create a data-correct data attribute with the value "true"
        answer.correct && (answerLabel.dataset.correct = answer.correct);
    });
};

// handles the starting of the game, which entails the creation of the Player object, setting the player info on the
// navbar, generating the Question objects based on the questions retrieved form the Trivia API, randomizing them,
// and calling on the loading and setQuestion functions so that everything can be displayed on the screen
function startGame() {
    let playerNameValue = document.querySelector('#player').value;
    let player = new Player(playerNameValue);

    document.querySelector('#player').value = '';
    navBarText.innerHTML = `<b>Player:</b> ${player.name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<b>Score:</b> <span id="score">${player.score}</span>`;
    localStorage.setItem('player', JSON.stringify(player));
    questions.questions.forEach(el => {
        const question = new Question(
            el.question,
            // completely unnecessary piece of data for the app's normal operation but useful for debugging
            el.difficulty,
            el.correctAnswer,
            ...el.incorrectAnswers
        )
        question.answersRandomSort();
        randomizedQuestions.push(question);
    });
    randomizedQuestions.sort(() => 0.5 - Math.random());
    currentIndex = 0;

    setQuestion();
};

// handles the submitting of the answer after an answer has been selected, what to show based on whether the answer
// is correct or incorrect, and what to do if the game is in progress or about to end
function submitAnswer() {
    const correctAnswerLabel = document.querySelector('label[data-correct="true"]');
    const selectedAnswerLabel = document.querySelector('input:checked + label');

    if (selectedAnswerLabel.dataset.correct) {
        // if the selected answer is correct
        let player = JSON.parse(localStorage.getItem('player'));
        let playerScore = document.querySelector('#score');
        player.score += 100;
        playerScore.innerText = player.score;
        localStorage.setItem('player', JSON.stringify(player));
        playerScore.classList.add('score-blink');
        setTimeout(() => {
            playerScore.classList.remove('score-blink');
        }, 1000);
        correctAnswerLabel.innerHTML += correctIcon;
        Toastify({
            text: "Congrats! +100 points! 😃",
            duration: 3000,
            stopOnFocus: true,
            className: "rounded-2",
            style: {
                background: "radial-gradient(circle, rgba(13,193,0,1) 13%, rgba(36,142,5,1) 93%)",
            },
            offset: {
                y: 40
            }
        }).showToast();
    } else {
        // if the selected answer is incorrect
        selectedAnswerLabel.innerHTML += incorrectIcon;
        correctAnswerLabel.innerHTML += correctIcon;
        Toastify({
            text: "Nice try! Better luck next time! 😓",
            duration: 3000,
            stopOnFocus: true,
            className: "rounded-2",
            style: {
                background: "radial-gradient(circle, rgba(157,36,0,1) 55%, rgba(126,3,76,1) 93%)",
            },
            offset: {
                y: 40
            }
        }).showToast();
    };

    if (randomizedQuestions.length > currentIndex + 1) {
        // if there are still more questions to answer
        submitBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    } else {
        // if the question that was just answered was the last question
        submitBtn.classList.add('hide');
        nextBtn.classList.add('hide');
        endBtn.classList.remove('hide');
    };
};

function clearState() {
    navBarText.innerHTML = '';
    randomizedQuestions = [];
    document.getElementById('players').innerHTML = '';
    difficulty = '';
    questions.clearQuestions();
};

// Event Listeners
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    difficulty = e.submitter.textContent.toLowerCase();
    loading();
    await questions.fetchQuestions(difficulty);
    // I truly believe I have finally began to understand async code with this very simple fetching function
    startGame();
});
// The Submit button is shown if any of the options are clicked
formElements.forEach((el) => {
    el.addEventListener('click', () => {
        submitBtn.classList.remove('hide');
    })
});
// we submit an answer when the Submit button is clicked
submitBtn.addEventListener('click', submitAnswer);
// we set the new question when the Next button is clicked
nextBtn.addEventListener('click', () => {
    sectionContainer.classList.add('slide-out-left');
    nextBtn.classList.add('hide')
    setTimeout(() => {
        currentIndex++;
        setQuestion();
    }, 1000);
    
});
// we end the game and display final score and leaderboard when the End Game button is clicked
endBtn.addEventListener('click', () => {
    sectionContainer.classList.replace('container', 'hide');
    endgame.classList.replace('hide', 'flicker-in-2');
    finalScore.innerText = `Final Score: ${JSON.parse(localStorage.getItem('player')).score}`;
    difficultyText.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    switch (difficulty) {
        case 'easy':
            difficultyText.className = 'text-success';
            break;
        case 'medium':
            difficultyText.className = 'text-warning';
            break;
        case 'hard':
            difficultyText.className = 'text-danger';
            break;
    };
    playAgainBtn.classList.remove('hide');
    leaderboardBuilder(difficulty);
    localStorage.removeItem('player');
});
// we restart the application when the Play again? button is clicked
playAgainBtn.addEventListener('click', () => {
    endBtn.classList.add('hide');
    endgame.classList.replace('flicker-in-2', 'flicker-out-2');
    setTimeout(() => {
        endgame.classList.replace('flicker-out-2', 'hide');
        initialState.classList.remove('hide');
        clearState();
    }, 1500);
});

export { difficulty };

// Things to add:
// - set the Submit, Next and End Game button on a fixed position, regardless of the width of the form --> DONE (up to a point)
// - general refactoring, so that the app is more logically organized
// - add a current-state ls object, that will contain the randomized questions and the current index, so that, if the
//   refreshes the page, then the last question that was on screen will get displayed. we will remove all keys in 
//   this object and add another one when we get to the leaderboard, so that, if the user refreshes the page on the
//   leaderboard, then the leaderboard will get displayed again