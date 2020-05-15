const game = {
    time: 15,
    points: 0,
    rounds: 1,
    words: ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'black'],
    colorsNum: 6,
    word: $(".display__word"),
    countdown: $(".nav__time .second"),
    level: $('.nav__round'),
    gameover: $('#gameover span'),
    interval: null,
    input: ""
}
const difficulty = function () {
    $(".modal-difficulty").removeClass("modal-hidden")
}
const difficultyOff = function () {
    $(".modal-difficulty").addClass("modal-hidden")
}
const instruction = function () {
    $(".modal-instruction").removeClass("modal-hidden")
}
const instructionOff = function () {
    $(".modal-instruction").addClass("modal-hidden")
}
const credit = function () {
    $(".modal-credit").removeClass("modal-hidden")
}
const creditOff = function () {
    $(".modal-credit").addClass("modal-hidden")
}
const cheat = function () {
    $(".modal-cheat").removeClass("modal-hidden")
}
const cheatOff = function () {
    $(".modal-cheat").addClass("modal-hidden")
}
const easy = function () {
    game.colorsNum = 2;
    difficultyOff();
}
const medium = function () {
    game.colorsNum = 4;
    difficultyOff();
}
const hard = function () {
    game.colorsNum = 6;
    difficultyOff();
}
const checkCode = function () {
    console.log($("input").val())
    if ($("input").val() === "a") {
        game.colorsNum = 1;
    }
}
const generateTiles = function () {
    for (let i = 0; i < game.colorsNum; i++) {
        $(".tiles").append(`<div class="tiles__${game.words[i]}"></div>`)

    }
}
//Game function
const refreshDisplay = function (event) {
    let $class = $(event.target).attr("class").substring(7);
    let $display = $(".display__word").text();
    if ($class === $display) {
        addPoints();
    } else {
        minusPoints()
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
const minusPoints = function () {
    if (game.rounds === 1) {
        game.points -= 1;
    } else if (game.rounds === 2) {
        game.points -= 2;
    } else if (game.rounds === 3) {
        game.points -= 3;
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
    randomNum = Math.floor(Math.random() * game.colorsNum);
    game.word.text(game.words[randomNum]);
    game.word.css("color", game.words[randomNum]);
    game.word.css("background-color", "black");
}

const textColorChange = function () {
    randomNum2 = Math.floor(Math.random() * game.colorsNum);
    game.word.css("color", game.words[randomNum2]);
    game.word.css("background-color", "black");
}

const textBackgroundChange = function () {
    randomNum2 = Math.floor(Math.random() * game.colorsNum);
    game.word.css("color", game.words[randomNum2]);
    randomNum3 = Math.floor(Math.random() * game.colorsNum);
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
        game.time = 15;
        if (game.rounds === 4) {
            gameover();
        }
        clearInterval(game.interval);
    }
    game.time--;

}
const levelIntro = function () {
    if (game.rounds === 1) {
        $('.title').css("display", "none");
        $('.round1').css("display", "flex");
        setTimeout(level, 4000);
    } else if (game.rounds === 2) {
        $('.game').css("display", "none");
        $('.round2').css("display", "flex");
        setTimeout(level, 4000);
    } else if (game.rounds === 3) {
        $('.game').css("display", "none");
        $('.round3').css("display", "flex");
        setTimeout(level, 4000);
    }
}
const level = function () {
    if (game.rounds === 1) {
        $('.round1').css("display", "none");
        generateTiles();
    } else if (game.rounds === 2) {
        $('.round2').css("display", "none");
    } else if (game.rounds === 3) {
        $('.round3').css("display", "none");
    }
    $(".game").css("display", "flex");
    $(".tiles").css("display", "flex");
    $(".display").css("display", "block");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
}

//Gameover
const gameover = function () {
    $(".tiles").empty();
    $(".game").css("display", "none");
    $('#gameover').append(`<p>Gameover!  <br>Score: ${game.points}</p>`);
    $('#gameover').append('<button id="restart">Restart</button>');
    $("#gameover").css("display", "flex");
}
//restart button
const restart = function () {
    $("#gameover").css("display", "none");
    $(".title").css("display", "flex");
    $('#gameover').empty();
    game.points = 0;
    game.rounds = 1;
    game.time = 15;
}

$('.hidden').css("display", "none")
//event
$(".title__start-game").on("click", levelIntro);

$('.title__difficulty').on("click", difficulty);
$('.modal-difficulty .modal__contents').on("blur", difficultyOff);

$('.easy').on("click", easy);
$('.medium').on("click", medium);
$('.hard').on("click", hard);


$('#title__instruction').on("click", instruction);
$('#title__instruction').on("blur", instructionOff);

$('.title__credit').on("click", credit);
$('.title__credit').on("blur", creditOff);

$('.title__cheat-code').on("click", cheat);
$('.modal-cheat .modal__contents').on("blur", cheatOff);
$('#submit').on('click', checkCode)

$(".tiles").on("click", "div", refreshDisplay);
$("#gameover").on("click", "#restart", restart)