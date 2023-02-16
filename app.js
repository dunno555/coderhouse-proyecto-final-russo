import { Question, questions } from "./question.js";
import { correctIcon, incorrectIcon } from "./icons.js";
class Player {
    constructor(name, score = 0) {
        this.name = name;
        this.score = score;
    }
}

const form = document.querySelector('form');
const initialState = document.querySelector('#initial-state');
const sectionContainer = document.querySelector('#section-container');
const formElements = document.querySelectorAll('.form-check');
const navBarText = document.querySelector('.navbar-text');
const submitBtn = document.querySelector('#submitBtn');
const nextBtn = document.querySelector('#nextBtn');
const submitMessage = document.querySelector('#submitMessage');
const inputBtns = document.querySelectorAll('input');
const endBtn = document.querySelector('#endBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const endgame = document.querySelector('#end-game');
const finalScore = document.querySelector('#final-score');

let randomizedQuestions = [], currentIndex;

function loading() {
    let loader = document.querySelector('#loader');
    initialState.classList.add('hide');
    loader.classList.remove('hide');
    setTimeout(() => {
        loader.classList.add('hide');
        sectionContainer.classList.replace('hide', 'container');
    }, 3000);
};

function setQuestion() {
    nextBtn.classList.add('hide');
    submitMessage.classList.add('hide');
    inputBtns.forEach((el) => {
        el.checked = false;
    });
    showQuestion(randomizedQuestions[currentIndex]);
};

function showQuestion(question) {
    document.querySelector('#question-container > h3').innerText = `Question ${currentIndex + 1}`;
    document.querySelector('#question-container > h4').innerText = question.question;
    // clearing data attribute so that incorrect answers are not marked as correct
    document.querySelectorAll('[data-correct]').forEach((el) => {
        el.removeAttribute('data-correct');
    })

    question.answers.forEach((answer, index) => {
        let answerLabel = document.getElementById(`option-${index + 1}-label`);
        answerLabel.innerText = answer.text;
        if (answer.correct) {
            answerLabel.dataset.correct = answer.correct;
        }
    });
};

function startGame(e) {
    e.preventDefault();
    let playerNameValue = document.querySelector('#player').value;
    let player = new Player(playerNameValue);
    localStorage.setItem('player', JSON.stringify(player));
    document.querySelector('#player').value = '';
    navBarText.innerHTML = `<b>Player:</b> ${JSON.parse(localStorage.getItem('player')).name} | <b>Score:</b> <span id="score">${JSON.parse(localStorage.getItem('player')).score}</span>`;
    questions.forEach(el => {
        const question = new Question(
            el.question,
            el.correctAnswer,
            el.incorrectAnswers[0],
            el.incorrectAnswers[1],
            el.incorrectAnswers[2]
        )
        question.answersRandomSort();
        randomizedQuestions.push(question);
    });
    randomizedQuestions.sort(() => 0.5 - Math.random());
    currentIndex = 0;

    loading();
    setQuestion();
};

function submitAnswer() {
    const correctAnswerLabel = document.querySelector('label[data-correct="true"]');
    const selectedAnswerLabel = document.querySelector('input:checked + label');

    if (selectedAnswerLabel.dataset.correct) {
        // if the selected answer is correct
        let questionScore = 100;
        let player = JSON.parse(localStorage.getItem('player'));
        player.score += questionScore;
        localStorage.setItem('player', JSON.stringify(player));
        document.querySelector('#score').innerText = JSON.parse(localStorage.getItem('player')).score;
        correctAnswerLabel.innerHTML += correctIcon;
        submitMessage.innerText = 'Congrats! +100 points!';
        submitMessage.className = 'text-success';
    } else {
        // if the selected answer is incorrect
        selectedAnswerLabel.innerHTML += incorrectIcon;
        correctAnswerLabel.innerHTML += correctIcon;
        submitMessage.innerText = 'Nice try! Better luck next time!';
        submitMessage.className = 'text-info';
    };

    if (randomizedQuestions.length > currentIndex + 1) {
        // if there are still more questions to answer
        submitBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    } else {
        // if the question that was just answered is the last question
        submitBtn.classList.add('hide');
        nextBtn.classList.add('hide');
        endBtn.classList.remove('hide');
    };
}
// function changeLabelStyle() {
//     let radioBtns = Array.from(document.querySelectorAll('input[id^="option"]'));
//     radioBtns.forEach(btn => {
//         let label = btn.nextElementSibling;
//         if (btn.checked == true) {
//             label.classList.remove('unchecked-label');
//             label.classList.add('checked-label');
//             btn.parentElement.style.backgroundColor = '#8B9A46';
//         } else {
//             label.classList.remove('checked-label');
//             label.classList.add('unchecked-label');
//             btn.parentElement.style.backgroundColor = '';
//         };
//     });
// };

form.addEventListener('submit', startGame);
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
    currentIndex++;
    setQuestion();
});
// we end the game and display final score when the End Game button is clicked
endBtn.addEventListener('click', () => {
    sectionContainer.classList.replace('container', 'hide');
    endgame.classList.remove('hide');
    finalScore.innerText = `Final Score: ${JSON.parse(localStorage.getItem('player')).score}`;
    localStorage.removeItem('player');
    playAgainBtn.classList.remove('hide');
    // Add a restart button
});
playAgainBtn.addEventListener('click', () => {
    endBtn.classList.add('hide');
    endgame.classList.add('hide');
    initialState.classList.remove('hide');
    navBarText.innerHTML = '';
    randomizedQuestions = [];
});
// form.addEventListener('change', changeLabelStyle);

// Things to add:
// - a restart button --> DONE
// - change final score view, so that it is a bit more elegant for the user
// - set the Submit, Next and End Game button on a fixed position, regardless of the width of the form
// - add toastr notifications, so that the messages are not displayed on screen
// - integrate the app with The Trivia API - https://the-trivia-api.com/ so that questions are randomly
//   generated every time the app is initialized
// - general refactoring, so that the app is more logically organized