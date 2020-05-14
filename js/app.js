const game = {
    time: 10,
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

/* const level1Intro = function () {
    $('.title').css("display", "none");
    $('.round1').css("display", "block");
    const threeSec = setTimeout(level1, 2000);
}

const level1 = function () {
    $(".nav,.display,.tiles").css("display", "flex");
    $(".nav__start").css("display", "none");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
}

const level2Intro = function () {
    $('.nav,.display,.tiles,.round1').css("display", "none");
    $('.round2').css("display", "block");
    const threeSec = setTimeout(level2, 2000);
}

const level2 = function () {
    $(".nav,.display,.tiles").css("display", "flex");
    $(".nav__start").css("display", "none");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
}

const level3Intro = function () {
    $('.nav,.display,.tiles,.round2').css("display", "none");
    $('.round3').css("display", "block");
    const threeSec = setTimeout(level2, 2000);
}

const level3 = function () {
    $(".nav,.display,.tiles").css("display", "flex");
    $(".nav__start").css("display", "none");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
} */

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
        levelIntro();
        game.time = 10;
        if (game.rounds === 4) {
            gameover();
        }
        clearInterval(game.interval);
    }
    game.time--;
}
/* const updateCountdown = function () {
    game.countdown.text(`${game.time}`);
    game.level.text(`Round: ${game.rounds}`)
    if (game.time === 0) {
        game.rounds++;
        if (game.rounds === 2) {
            level2Intro();
            game.time = 10;
        } else if (game.rounds === 3) {
            level3Intro();
            game.time = 10;
        } else if (game.rounds === 4) {
            gameover();
        }
        clearInterval(game.interval);
    }
    game.time--;
} */
/* const updateCountdown = function () {
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
} */
$('.hidden').css("display", "none")
//event
$(".title").on("click", ".title__start-game", levelIntro);
$(".nav__start").on("click", start);
$(".tiles div").on("click", refreshDisplay);
$("#gameover").on("click", "#restart", restart)