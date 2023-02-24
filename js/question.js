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

export { Question };