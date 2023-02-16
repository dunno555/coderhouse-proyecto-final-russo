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
        "correctAnswer": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine",
        "incorrectAnswers":
            [
                "A Marine observes the effects of war on his fellow recruits from their boot camp training to fighting in a war",
                "The lives of mob hitmen, a boxer, a gangster and his wife, and a pair of bandits intertwine in four tales",
                "Historical events unfold from the perspective of an Alabama man with an IQ of 75"
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

export { Question, questions };