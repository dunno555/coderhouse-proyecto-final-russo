const theTriviaAPIURL = 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=';

class QuestionsAPI {
    constructor(questions = []) {
        this.questions = questions;
    }

    fetchQuestions(difficulty) {
        let modifiedURL = theTriviaAPIURL + difficulty
        fetch(modifiedURL, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then((data) => {
            this.questions = data;
        })
    }

    clearQuestions() {
        this.questions = [];
    }
}

export { QuestionsAPI };