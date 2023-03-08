const theTriviaAPIURL = 'https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=';

class QuestionsAPI {
    constructor(questions = []) {
        this.questions = questions;
    }

    async fetchQuestions(difficulty) {
        let modifiedURL = theTriviaAPIURL + difficulty
        const response = await fetch(modifiedURL, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        this.questions = data;
    }

    clearQuestions() {
        this.questions = [];
    }
}

export { QuestionsAPI };