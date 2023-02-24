const theTriviaAPIURL = 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=easy';

class QuestionsAPI {
    constructor() {
        this.questions;
    }

    fetchQuestions() {
        return fetch(theTriviaAPIURL, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then((data) => {
            this.questions = data;
        });
    }
}

export { QuestionsAPI };