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
};

// To randomly generate questions every time the app is initialized, we will use The Trivia API
// More info: https://the-trivia-api.com/docs/
const theTriviaAPIURL = 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=easy';

let questions;
fetch(theTriviaAPIURL, {
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json()).then(data => questions = data);

export { Question, questions };