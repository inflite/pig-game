let scores, current, player, active;
let previousSix = true;
hideDice();

document.getElementById("btn-new").addEventListener('click', function () {
    active = true;
    scores = [0, 0];
    current = 0;
    player = 0;
    newGame();
});

document.getElementById("btn-roll").addEventListener('click', function () {
    if (active) {
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        let currentSix;
        showDice(dice1, dice2);

        if (dice1 == 6 || dice2 == 6) {
            currentSix = true;
        }

        if (previousSix && currentSix) {
            scores[player] = 0;
            current = 0;
            document.getElementById('player-' + player + '-total').innerHTML = scores[player]
            document.getElementById('player-' + player + '-current').innerHTML = current;
            nextPlayer();
        } else {
            if (dice1 !== 1 && dice2 !== 1) {
                current += dice1 + dice2;
                document.getElementById('player-' + player + '-current').innerHTML = current;
                if (currentSix) previousSix = true;
            } else {
                nextPlayer();
            }
        }
    }
});

document.getElementById("btn-hold").addEventListener('click', function () {
    if (active) {
        scores[player] += current;
        document.getElementById('player-' + player + '-total').innerHTML = scores[player];
        if (scores[player] >= 100) {
            declareWinner();
            active = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    player === 0 ? player = 1 : player = 0;
    current = 0;
    previousSix = false;
    changeTurn();
}

function hideDice() {
    document.getElementById('dice').style.display = "none";
}

function showDice(dice1, dice2) {
    redDice();
    document.getElementById('dice-1').innerHTML = dice1;
    document.getElementById('dice-2').innerHTML = dice2;
    document.getElementById('dice').style.display = "block";
}

function grayDice() {
    document.getElementById('dice-1').classList.remove('bg-danger');
    document.getElementById('dice-2').classList.remove('bg-danger');
    document.getElementById('dice-1').classList.add('bg-secondary');
    document.getElementById('dice-2').classList.add('bg-secondary');
}

function redDice() {
    document.getElementById('dice-1').classList.remove('bg-secondary');
    document.getElementById('dice-2').classList.remove('bg-secondary');
    document.getElementById('dice-1').classList.add('bg-danger');
    document.getElementById('dice-2').classList.add('bg-danger');
}

function newGame() {
    document.getElementById('player-0-current').innerHTML = '0';
    document.getElementById('player-1-current').innerHTML = '0';
    document.getElementById('player-0-total').innerHTML = '0';
    document.getElementById('player-1-total').innerHTML = '0';
    document.getElementById('player-0').classList.remove('border-danger');
    document.getElementById('player-0').classList.remove('border-success');
    document.getElementById('player-0').classList.remove('bg-success');
    document.getElementById('player-0').classList.remove('text-light');
    document.getElementById('player-1').classList.remove('border-danger');
    document.getElementById('player-1').classList.remove('border-success');
    document.getElementById('player-1').classList.remove('bg-success');
    document.getElementById('player-1').classList.remove('text-light');
    document.getElementById('player-0').classList.add('border-danger');
    hideDice();
}

function changeTurn() {
    document.getElementById('player-0-current').innerHTML = '0';
    document.getElementById('player-1-current').innerHTML = '0';
    document.getElementById('player-0').classList.toggle('border-danger');
    document.getElementById('player-1').classList.toggle('border-danger');
    grayDice();
}

function declareWinner() {
    document.getElementById('player-' + player).classList.remove('border-danger');
    document.getElementById('player-' + player).classList.add('border-success');
    document.getElementById('player-' + player).classList.add('bg-success');
    document.getElementById('player-' + player).classList.add('text-light');
}
