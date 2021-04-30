let scores, current, player, active;
let previousSix = false;

document.getElementById("btn-new").addEventListener('click', function () {
    active = true;
    scores = [0, 0];
    current = 0;
    player = 0;
    document.getElementById('player-0-current').innerHTML = '0';
    document.getElementById('player-1-current').innerHTML = '0';
    document.getElementById('player-0-total').innerHTML = '0';
    document.getElementById('player-1-total').innerHTML = '0';
    document.getElementById('player-0').classList.remove('text-danger');
    document.getElementById('player-1').classList.remove('text-danger');
    document.getElementById('player-0').classList.add('text-danger');
});

document.getElementById("btn-roll").addEventListener('click', function () {
    if (active) {
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1);
        console.log(dice2);

        let currentSix;

        if (dice1 == 6 || dice2 == 6) {
            currentSix = true;
        }

        if (previousSix && currentSix) {
            scores[player] = 0;
            nextPlayer();
        }

        if (dice1 !== 1 && dice2 !== 1) {
            current += dice1 + dice2;
            document.getElementById('player-' + player + '-current').innerHTML = current;
            if (currentSix) previousSix = true;
        } else {
            nextPlayer();
        }
    }
});

document.getElementById("btn-hold").addEventListener('click', function () {
    if (active) {
        scores[player] += current;
        document.getElementById('player-' + player + '-total').innerHTML = scores[player];
        if (scores[player] >= 100) {
            document.getElementById('player-' + player).classList.remove('text-danger');
            document.getElementById('player-' + player).classList.add('text-success');
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
    document.getElementById('player-0-current').innerHTML = '0';
    document.getElementById('player-1-current').innerHTML = '0';
    document.getElementById('player-0').classList.toggle('text-danger');
    document.getElementById('player-1').classList.toggle('text-danger');
}
