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

//Game function
const refreshDisplay = function (event) {
    let $class = $(event.target).attr("class").substring(7);
    let $display = $(".display__word").text();
    if ($class === $display) {
        addPoints();
    };
    generateWord();
    $(".nav__score").text(`Score: ${game.points}`);
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
//generate word
const generateWord = function () {
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

//timer setup
const updateCountdown = function () {
    game.countdown.text(`${game.time}`);
    game.level.text(`Round: ${game.rounds}`)
    if (game.time === 0) {
        game.rounds++;
        levelIntro();
        game.time = 5;
        if (game.rounds === 4) {
            clearInterval(game.interval);
            gameover();
        }
    }
    game.time--;
}
const levelIntro = function () {
    if (game.rounds === 1) {
        $('.title').css("display", "none");
        $('.round1').css("display", "block");
    } else if (game.rounds === 2) {
        $('.nav,.display,.tiles,.round1').css("display", "none");
        $('.round2').css("display", "block");
    } else if (game.rounds === 3) {
        $('.nav,.display,.tiles,.round2').css("display", "none");
        $('.round3').css("display", "block");
    }
    const threeSec = setTimeout(level, 2000);
}
const level = function () {
    if (game.rounds === 1) {
        $('.round1').css("display", "none");
    } else if (game.rounds === 2) {
        $('.round2').css("display", "none");
    } else if (game.rounds === 3) {
        $('.round3').css("display", "none");
    }
    $(".nav,.display,.tiles").css("display", "flex");
    $(".nav__start").css("display", "none");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
}

//Gameover
const gameover = function () {
    $(".nav,.display,.tiles").css("display", "none")
    $('#gameover').append(`<p>Gameover!  <br>Score: ${game.points}</p>`);
    $('#gameover').append('<button id="restart">Restart</button>');
    return;
}
//restart button
const restart = function () {
    $(".title").css("display", "flex");
    $('#gameover').empty();
    game.points = 0;
    game.rounds = 1;
    game.time = 10;
}

$('.hidden').css("display", "none")
//event
$(".title__start-game").on("click", levelIntro);
$(".tiles div").on("click", refreshDisplay);
$("#gameover").on("click", "#restart", restart)