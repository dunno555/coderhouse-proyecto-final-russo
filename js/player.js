export class Player {
    constructor(name, difficulty, score = 0, currentPlayer = true) {
        this.name = name;
        this.difficulty = difficulty;
        this.score = score;
        this.currentPlayer = currentPlayer;
    }
};