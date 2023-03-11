export class UIHandler {
    constructor() {
    }

    hideElement(element, className) {
        if (className) {
            element.classList.replace(className, 'hide')
        } else {
            element.classList.add('hide');
        }
    };

    showElement(element, className) {
        if (className) {
            element.classList.replace('hide', className);
        } else {
            element.classList.remove('hide');
        }
    };

    playerTextBuilder(name, score) {
        return `<b>Player:</b> ${name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<b>Score:</b> <span id="score">${score}</span>`;
    };


    // SOLVE THE PROBLEM OF THE ID TO STYLE THAT DIFFERENTLY // MAYBE A CURRENTPLAYER FLAG ON THE PLAYER CLASS?
    leaderboard(players) {
        players.forEach((player) => {
            let playersElement = document.getElementById('players');
            let playerRow = document.createElement('tr');
            // We add an id so that we can style this row differently from the others
            player.currentPlayer && (playerRow.id = 'currentPlayer');
            playerRow.innerHTML = `
                <td>${player.name}</td>
                <td>${player.score}</td>
            `;
            playersElement.appendChild(playerRow);
        })
    };

    difficultyTextColor(diff, element) {
        switch (diff) {
            case 'easy':
                element.className = 'text-success';
                break;
            case 'medium':
                element.className = 'text-warning';
                break;
            case 'hard':
                element.className = 'text-danger';
                break;
        };
    };
}