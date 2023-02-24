import { Player } from "./player.js";

function leaderboardBuilder() {
    let leaderboardPlayers = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let currentPlayer = JSON.parse(localStorage.getItem('player'));
    let currentPlayerIndex;

    if (!localStorage.getItem('leaderboard')) {
        originalLeaderboard(leaderboardPlayers);
    };

    // If the current player's score is within the scores set in the leaderboard, then their score is added
    for (let index = 0; index < leaderboardPlayers.length; index++) {
        if (currentPlayer.score >= leaderboardPlayers[index].score) {
            leaderboardPlayers.splice(index, 0, currentPlayer);
            leaderboardPlayers.pop();
            currentPlayerIndex = index;
            localStorage.setItem('leaderboard', JSON.stringify(leaderboardPlayers));
            // Once their score is added, we stop manipulating the leaderboard
            break;
        };
    };

    // We create the tr elements to be displayed on the leaderboard
    leaderboardPlayers.forEach((player, index) => {
        let playersElement = document.getElementById('players');
        let playerRow = document.createElement('tr');
        if (index == currentPlayerIndex) {
            // We add an id so that we can style this row differently from the others
            playerRow.id = 'currentPlayer';
        };
        playerRow.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        playersElement.appendChild(playerRow);
    })
};

function originalLeaderboard(players) {
    let leaderBoardPlayersNames = ['Mickey Mouth', 'The Condor', 'Alison Cat', 'Radio Knife', 'Carbon Thing'];
        let score = 100;

        // We build the leaderboard based on the names provided above
        for (let index = 0; index < leaderBoardPlayersNames.length; index++) {
            let player = new Player(leaderBoardPlayersNames[index], score);
            players.unshift(player);
            score += 100;
        };
        localStorage.setItem('leaderboard', JSON.stringify(players));
};

export { leaderboardBuilder };