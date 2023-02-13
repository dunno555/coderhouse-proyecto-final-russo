// Quiz App:

// sections:
// question logic -> this will handle retrieving the question from the API, organizing them in Question objects, and verifying if a question is correct or incorrect.

// UI -> this will handle the UI portion of the app, that is, the display of the loader, the player name, the questions, and the navigation (when the user clicks on the forward button, this will take care of changing the questions on the screen). it will also handle the behavior of back and forward buttons (if we are in question 1, then the back button will be disabled. if we are in question 5, then the forward button will be disabled, and the Submit button will become visible). this means that this section will need access to the Question object, so that it can keep track of the question id

// check this video: https://www.youtube.com/watch?v=riDzcEQbX6k

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

    randomSort() {
        this.answers.sort(() => 0.5 - Math.random());
    }
}

const form = document.querySelector('form');
const initialState = document.querySelector('#initial-state');
const sectionContainer = document.querySelector('#section-container');

let randomizedQuestions, currentIndex;

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
    document.querySelector('h4').innerText = question.question;
    console.log(question.answers)
    
    question.answers.forEach((answer, index) => {
        document.querySelector(`label[for="option-${index + 1}"]`).innerText = answer.text
    });
}

function startGame(e) {
    e.preventDefault();
    let playerNameValue = document.querySelector('#player').value;
    let prelimQuestions = [];
    localStorage.setItem('playerName', playerNameValue);
    document.querySelector('#player').value = '';
    document.querySelector('.navbar-text').textContent = `Player: ${localStorage.getItem('playerName')}`;
    questions.forEach(el => {
        const question = new Question(
            el.question,
            el.correctAnswer,
            el.incorrectAnswers[0],
            el.incorrectAnswers[1],
            el.incorrectAnswers[2]
        )
        question.randomSort();
        prelimQuestions.push(question);
    });
    prelimQuestions.sort(() => 0.5 - Math.random());

    loading();
    showQuestion(prelimQuestions[0]);
};

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
// form.addEventListener('change', changeLabelStyle);

const questions = [
    {
        "category": "Film & TV",
        "id": "639ae873929b90846f2fc8df",
        "correctAnswer": "Red",
        "incorrectAnswers":
            [
                "Blue",
                "Green",
                "Purple"
            ],
        "question": "In Star Wars, what color is Darth Vader's lightsaber?",
    },
    {
        "category": "Film & TV",
        "id": "622a1c367cc59eab6f9501fe",
        "correctAnswer": "Quentin Tarantino",
        "incorrectAnswers":
            [
                "Steven Spielberg",
                "Woody Allen",
                "Martin Scorsese"
            ],
        "question": "Which director directed Pulp Fiction?",
    },
    {
        "category": "Film & TV",
        "id": "625741333d2f5c16bfb88345",
        "correctAnswer": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine.",
        "incorrectAnswers":
            [
                "A Marine observes the effects of war on his fellow recruits from their boot camp training to fighting in a war.",
                "The lives of mob hitmen, a boxer, a gangster and his wife, and a pair of bandits intertwine in four tales.",
                "Historical events unfold from the perspective of an Alabama man with an IQ of 75."
            ],
        "question": "What is the plot of the movie The Terminator?",
    },
    {
        "category": "Film & TV",
        "id": "622a1c347cc59eab6f94fadd",
        "correctAnswer": "Tom Hanks",
        "incorrectAnswers":
            [
                "Morgan Freeman",
                "Nigel Hawthorne",
                "Paul Newman"
            ],
        "question": "Who won the 1994 Academy Award for Best Leading Actor for playing the role of Forrest Gump in Forrest Gump?",
    },
    {
        "category": "Film & TV",
        "id": "622a1c347cc59eab6f94fc10",
        "correctAnswer": "\"Elementary, my dear Watson.\"",
        "incorrectAnswers":
            [
                "\"Keep your friends close, but your enemies closer.\"",
                "\"My mother thanks you. My father thanks you. My sister thanks you. And I thank you.\"",
                "\"My precious.\""
            ],
        "question": "Which of these quotes is from the film 'The Adventures of Sherlock Holmes'?",
    }
];