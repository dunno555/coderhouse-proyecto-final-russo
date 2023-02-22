import { Question } from "./question.js";
import { correctIcon, incorrectIcon } from "./icons.js";
import { QuestionsAPI } from "./triviaAPI.js";
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
const inputBtns = document.querySelectorAll('input');
const endBtn = document.querySelector('#endBtn');
const playAgainBtn = document.querySelector('#playAgainBtn');
const endgame = document.querySelector('#end-game');
const finalScore = document.querySelector('#final-score');

let randomizedQuestions = [], currentIndex;

// Initializing the QuestionsAPI class, so that we can call on new questions every time the app is initialized
let questions = new QuestionsAPI;
questions.fetchQuestions();

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
        // if (answer.correct) {
        //     answerLabel.dataset.correct = answer.correct;
        // }
        answer.correct && (answerLabel.dataset.correct = answer.correct);
    });
};

function startGame(e) {
    e.preventDefault();
    let playerNameValue = document.querySelector('#player').value;
    let player = new Player(playerNameValue);
    localStorage.setItem('player', JSON.stringify(player));
    document.querySelector('#player').value = '';
    navBarText.innerHTML = `<b>Player:</b> ${JSON.parse(localStorage.getItem('player')).name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<b>Score:</b> <span id="score">${JSON.parse(localStorage.getItem('player')).score}</span>`;
    questions.questions.forEach(el => {
        const question = new Question(
            el.question,
            el.correctAnswer,
            ...el.incorrectAnswers
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
        let player = JSON.parse(localStorage.getItem('player'));
        player.score += 100;
        localStorage.setItem('player', JSON.stringify(player));
        document.querySelector('#score').innerText = JSON.parse(localStorage.getItem('player')).score;
        correctAnswerLabel.innerHTML += correctIcon;
        Toastify({
            text: "Congrats! +100 points! 😃",
            duration: 3000,
            stopOnFocus: true,
            className: "rounded-2",
            style: {
                background: "radial-gradient(circle, rgba(13,193,0,1) 13%, rgba(36,142,5,1) 93%)",
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

function leaderboardBuilder() {
    let leaderboardPlayers = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let currentPlayer = JSON.parse(localStorage.getItem('player'));
    let currentPlayerIndex;

    if (!localStorage.getItem('leaderboard')) {
        let leaderBoardPlayersNames = ['Mickey Mouth', 'The Condor', 'Alison Cat', 'Radio Knife', 'Carbon Thing'];
        let score = 100;

        // We build the leaderboard based on the names provided above
        for (let index = 0; index < leaderBoardPlayersNames.length; index++) {
            let player = new Player(leaderBoardPlayersNames[index], score);
            leaderboardPlayers.unshift(player);
            score += 100;
        };
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardPlayers));
    };

    // If the current player's score is within the scores set in the leaderboard, then they are added
    for (let index = 0; index < leaderboardPlayers.length; index++) {
        if (currentPlayer.score >= leaderboardPlayers[index].score) {
            leaderboardPlayers[index] = currentPlayer;
            currentPlayerIndex = index;
            localStorage.setItem('leaderboard', JSON.stringify(leaderboardPlayers));
            break;
        };
    };

    // We create the tr elements to be displayed on the leaderboard
    leaderboardPlayers.forEach((player, index) => {
        let playersElement = document.getElementById('players');
        let playerRow = document.createElement('tr');
        if (index == currentPlayerIndex) {
            playerRow.id = 'currentPlayer';
        };
        playerRow.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        playersElement.appendChild(playerRow);
    })
};


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
    playAgainBtn.classList.remove('hide');
    leaderboardBuilder();
    localStorage.removeItem('player');
});
playAgainBtn.addEventListener('click', () => {
    endBtn.classList.add('hide');
    endgame.classList.add('hide');
    initialState.classList.remove('hide');
    navBarText.innerHTML = '';
    randomizedQuestions = [];
    document.getElementById('players').innerHTML = '';
    questions.fetchQuestions();
});

// Things to add:
// - a restart button --> DONE
// - change final score view, so that it is a bit more elegant for the user --> DONE
// - set the Submit, Next and End Game button on a fixed position, regardless of the width of the form --> DONE (up to a point)
// - add toastr notifications, so that the messages are not displayed on screen --> DONE
// - integrate the app with The Trivia API - https://the-trivia-api.com/ so that questions are randomly
//   generated every time the app is initialized --> DONE BBUUUUUUUUUUUUT
// - we need to find how to regenerate the 'questions' variable every time we initialize the app --> DONE
// - general refactoring, so that the app is more logically organized