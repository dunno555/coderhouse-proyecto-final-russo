// prompt with question -> user should add answer on textbox
// if correct answer is not provided, alert is shown informing user that they have N attempts remaining
// when attempts have been exhausted, alert is shown informing user that the program has ended, and
// showing the correct answer
// if correct answer is provided before the attempts have been exhausted, then a Congratulations message is
// shown and thanking user for playing

// total number of attempts: 2

const question = () => { return prompt(`Read the question below and answer it on the text box. Enter the number which matches your answer:\n
    What is Matt Leacock's most famous game?\n
    1. Agricola
    2. Settlers of Catan
    3. Pandemic
    4. Carcassonne\n
`) };

const dataValidator = (str) => {
    let validity = '';
    if (parseInt(str) > 4 || parseInt(str) < 1) {
        validity = 'invalid';
    } else if (!str) {
        validity = 'invalid';
    } else if (isNaN(parseInt(str))) {
        validity = 'invalid';
    };
    return validity;
};

let answer = question();
const pandemicBGGLink = 'https://boardgamegeek.com/boardgame/30549/pandemic';

for (let i = 1; i >= 0; i--) {
    let validation = dataValidator(answer);
    const validButIncorrectOptions = ['1', '2', '4'];
    if (validation.toLowerCase() == 'invalid')  {
        alert('Sorry, but the only valid answers are 1, 2, 3, or 4. Try again.');
        i++;
    } else if (answer == '3') {
        alert(`Correct! For more info on Pandemic, check out its profile on BGG:\n${pandemicBGGLink}`);
        break;
    } else if (i == 0) {
        alert(`Sorry! The correct answer is 3. Pandemic. Better luck next time!\n\nFor more info on Pandemic, check out its profile on BGG: ${pandemicBGGLink}`);
        break;
    };

    if (validButIncorrectOptions.includes(answer)) {
        alert(`Sorry, that is not the correct answer. You have ${i} chance left. Try again!`);
    };

    answer = question();
};