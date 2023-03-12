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

    addAnimation(element, className) {
        element.classList.add(className);
    };

    removeAnimation(element, className) {
        element.classList.remove(className);
    };

    playerTextBuilder(name, score) {
        return `<b>Player:</b> ${name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<b>Score:</b> <span id="score">${score}</span>`;
    };

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