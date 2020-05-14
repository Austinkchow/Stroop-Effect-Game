const game = {
    time: 5,
    points: 0,
    rounds: 1,
    words: ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'black'],
    randomNum: Math.floor(Math.random() * 6),
    word: $(".display__word"),
    countdown: $(".nav__time .second"),
    level: $('.nav__round'),
    gameover: $('#gameover span'),
    interval: null
}

//generate word
let generateWord = function () {
    if (game.rounds === 1) {
        textChange();
    } else if (game.rounds === 2) {
        textChange();
        textColorChange();
    } else if (game.rounds === 3) {
        textChange();
        textBackgroundChange()
    }
};

const textChange = function () {
    randomNum = Math.floor(Math.random() * 6);
    game.word.text(game.words[randomNum]);
    game.word.css("color", game.words[randomNum]);
    game.word.css("background-color", "whitesmoke");

}

const textColorChange = function () {
    randomNum2 = Math.floor(Math.random() * 6);
    game.word.css("color", game.words[randomNum2]);
    game.word.css("background-color", "black");
}

const textBackgroundChange = function () {
    randomNum2 = Math.floor(Math.random() * 6);
    game.word.css("color", game.words[randomNum2]);
    randomNum3 = Math.floor(Math.random() * 6);
    if (randomNum2 === randomNum3) {
        game.word.css("background-color", game.words[randomNum3 + 1]);
    } else {
        game.word.css("background-color", game.words[randomNum3]);
    }
}

const addPoints = function () {
    if (game.rounds === 1) {
        game.points += 1;
    } else if (game.rounds === 2) {
        game.points += 2;
    } else if (game.rounds === 3) {
        game.points += 3;
    }
}
//Gameover
const gameover = function () {
    $(".title,.nav,.display,.tiles").hide()
    $('#gameover').append(`<p>Gameover!  <br>Score: ${game.points}</p>`);
    $('#gameover').append('<button id="restart">Restart</button>');

}

//start button function
const start = function () {
    updateCountdown();
    generateWord();
    $(".nav__start").css("display", "none");
    game.interval = setInterval(updateCountdown, 1000);
    $(".tiles").css("display", "flex");

}
//answer buttons function
const refreshDisplay = function (event) {
    let $class = $(event.target).attr("class").substring(7);
    let $display = $(".display__word").text();
    if ($class === $display) {
        addPoints();
    };
    generateWord();
    $(".nav__score").text(`Score: ${game.points}`);
}

//restart button
const restart = function () {
    $(".title,.nav,.display").show();
    $('#gameover').empty();
    $(".nav__start").css("display", "block");
    game.points = 0;
    game.rounds = 1;
    game.time = 5;
}
//timer setup
const updateCountdown = function () {
    game.countdown.text(`${game.time}`);
    game.level.text(`Round: ${game.rounds}`)
    if (game.time === 0) {
        game.rounds++;
        if (game.rounds < 4) {
            game.time = 5;
        } else {
            clearInterval(game.interval);
            gameover()
        }
    }
    game.time--;
}

$('.title').css("display", "flex");
//event
$(".nav__start").on("click", start);
$(".tiles div").on("click", refreshDisplay);
$("#gameover").on("click", "#restart", restart)