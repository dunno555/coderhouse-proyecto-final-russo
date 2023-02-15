// Quiz App:

// sections:
// question logic -> this will handle retrieving the question from the API, organizing them in Question objects, and verifying if a question is correct or incorrect.

// UI -> this will handle the UI portion of the app, that is, the display of the loader, the player name, the questions, and the navigation (when the user clicks on the forward button, this will take care of changing the questions on the screen). it will also handle the behavior of back and forward buttons (if we are in question 1, then the back button will be disabled. if we are in question 5, then the forward button will be disabled, and the Submit button will become visible). this means that this section will need access to the Question object, so that it can keep track of the question id

// check this video: https://www.youtube.com/watch?v=riDzcEQbX6k

import { questions } from "./questions.js";
class Question {
    constructor(question, answer1, answer2, answer3, answer4) {
        this.question = question,
        this.answers = [
            {
                text: answer1,
                correct: true
            },
            {
                text: answer2,
                correct: false
            },
            {
                text: answer3,
                correct: false
            },
            {
                text: answer4,
                correct: false
            }
        ];
    }

    answersRandomSort() {
        this.answers.sort(() => 0.5 - Math.random());
    }
}

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
const submitBtn = document.querySelector('#submitBtn');
const nextBtn = document.querySelector('#nextBtn');
const submitMessage = document.querySelector('#submitMessage');
const inputBtns = document.querySelectorAll('input');
const endBtn = document.querySelector('#endBtn');

let randomizedQuestions = [], currentIndex;

function loading() {
    let loader = document.querySelector('#loader');
    initialState.classList.add('hide');
    loader.classList.remove('hide');
    setTimeout(() => {
        loader.classList.add('hide');
        sectionContainer.classList.replace('hide', 'container');
    }, 3000);
}

function showQuestion(question) {
    document.querySelector('#question-container > h3').innerText = `Question ${currentIndex + 1}`;
    document.querySelector('#question-container > h4').innerText = question.question;
    
    question.answers.forEach((answer, index) => {
        let answerLabel = document.querySelector(`label[for="option-${index + 1}"]`); 
        answerLabel.innerText = answer.text;
        if (answer.correct) {
            answerLabel.dataset.correct = answer.correct;
        }
    });
}

function startGame(e) {
    e.preventDefault();
    let playerNameValue = document.querySelector('#player').value;
    let player = new Player(playerNameValue);
    localStorage.setItem('player', JSON.stringify(player));
    document.querySelector('#player').value = '';
    document.querySelector('.navbar-text').innerHTML = `<b>Player:</b> ${JSON.parse(localStorage.getItem('player')).name} | <b>Score:</b> <span id="score">${JSON.parse(localStorage.getItem('player')).score}</span>`;
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

function setQuestion() {
    nextBtn.classList.add('hide');
    submitMessage.classList.add('hide');
    inputBtns.forEach((el) => {
        el.checked = false;
    });
    showQuestion(randomizedQuestions[currentIndex]);
}

function submitAnswer() {
    const correctIcon = `  
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-circle" viewBox="0 -0.5 16 19">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
    </svg>`
    const incorrectIcon = `  
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 -0.5 16 19">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>`
    const correctAnswerLabel = document.querySelector('label[data-correct=true]');
    const selectedAnswerLabel = document.querySelector('input:checked + label');
    correctAnswerLabel.innerHTML += correctIcon;

    if (!selectedAnswerLabel.dataset.correct) {
        selectedAnswerLabel.innerHTML += incorrectIcon;
        submitMessage.innerText = 'Nice try! Better luck next time!';
        submitMessage.className = 'text-info';
    };

    if (selectedAnswerLabel.dataset.correct) {
        let questionScore = 100;
        let player = JSON.parse(localStorage.getItem('player'));
        player.score += questionScore;
        localStorage.setItem('player', JSON.stringify(player));
        document.querySelector('#score').innerText = JSON.parse(localStorage.getItem('player')).score;
        submitMessage.innerText = 'Congrats! +100 points!';
        submitMessage.className = 'text-success';
    };

    if (randomizedQuestions.length > currentIndex + 1) {
        submitBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    } else {
        submitBtn.classList.add('hide');
        endBtn.classList.remove('hide');
        nextBtn.classList.add('hide');
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
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', () => {
    currentIndex++;
    setQuestion();
});
endBtn.addEventListener('click', () => {
    sectionContainer.innerHTML = `<h3> Final Score: ${JSON.parse(localStorage.getItem('player')).score}</h3>`
    localStorage.removeItem('player');
    // Add a restart button
})
// form.addEventListener('change', changeLabelStyle);

// check why, in some questions, when an incorrect answer is selected, points are still given, but the correct
// answer is marked with the icon. also, in some other cases, two answers are labelled as correct