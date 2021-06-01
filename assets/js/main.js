let scores, current, player, active;
let sixPreviousTurn = false;
let dice = document.getElementById('dice');
let dice1 = document.getElementById('dice-1');
let dice2 = document.getElementById('dice-2');
let player0 = document.getElementById('player-0');
let player1 = document.getElementById('player-1');
let player0Score = document.getElementById('player-0-score');
let player1Score = document.getElementById('player-1-score');
let holdText = document.getElementById('hold-text');

hideDice();

const newGame = function () {
    active = true;
    scores = [0, 0];
    current = 0;
    player = 0;
    startGame();
};

const nextPlayer = function () {
    player === 0 ? player = 1 : player = 0;
    current = 0;
    sixPreviousTurn = false;
    changePlayer();
}

const rollDice = function () {
    if (active) {
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        let sixCurrentTurn;
        displayDice(dice1, dice2);

        if (dice1 === 6 || dice2 === 6) sixCurrentTurn = true;

        if (sixPreviousTurn && sixCurrentTurn) {
            scores[player] = 0;
            current = 0;
            setScore(scores[player]);
            setCurrent(current);
            nextPlayer();
        } else {
            if (dice1 !== 1 && dice2 !== 1) {
                current += dice1 + dice2;
                setCurrent(current);
                if (sixCurrentTurn) sixPreviousTurn = true;
            } else {
                nextPlayer();
            }
        }
    }
};

const hold = function () {
    if (active) {
        scores[player] += current;
        setScore(scores[player]);
        if (scores[player] >= 100) {
            active = false;
            showWinner();
        } else {
            nextPlayer();
        }
    }
};

document.getElementById('new-game').addEventListener('click', newGame);
document.getElementById('roll-dice').addEventListener('click', rollDice);
document.getElementById('hold').addEventListener('click', hold);

// UI

function startGame() {
    player0Score.innerHTML = 0;
    player1Score.innerHTML = 0;
    player0.classList.remove('text-danger');
    player1.classList.remove('text-danger');
    player0.classList.add('text-danger');
    holdText.innerHTML = 'Hold'
    hideDice();
}

function changePlayer() {
    player0.classList.toggle('text-danger');
    player1.classList.toggle('text-danger');
    holdText.innerHTML = 'Hold'
    grayDice();
}

function setScore(score) {
    (player === 0) ? player0Score.innerHTML = score : player1Score.innerHTML = score;
}

function setCurrent(current) {
    holdText.innerHTML = `
    Hold (${current})
    `
}

function redDice() {
    dice.classList.remove('text-secondary');
    dice.classList.add('text-danger');
}

function grayDice() {
    dice.classList.remove('text-danger');
    dice.classList.add('text-secondary');
}

function hideDice() {
    dice.classList.add('d-none');
}

function displayDice(n1, n2) {
    redDice();
    setDice(dice1, n1);
    setDice(dice2, n2);
    dice.classList.remove('d-none');
}

function setDice(dice, number) {
    dice.classList.remove('fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six')
    switch (number) {
        case 1:
            dice.classList.add('fa-dice-one');
            break;
        case 2:
            dice.classList.add('fa-dice-two');
            break;
        case 3:
            dice.classList.add('fa-dice-three');
            break;
        case 4:
            dice.classList.add('fa-dice-four');
            break;
        case 5:
            dice.classList.add('fa-dice-five');
            break;
        case 6:
            dice.classList.add('fa-dice-six');
            break;
        default:
            break;
    }
}

function showWinner() {
    if (player === 0) {
        player0.classList.remove('text-danger');
        player0.classList.add('text-success');
    } else {
        player1.classList.remove('text-danger');
        player1.classList.add('text-success');
    }
}
