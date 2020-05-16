const game = {
    time: 15,
    points: 0,
    rounds: 1,
    colorsNum: 6,
    input: "",
    cheat: "off",
    interval: null,
    words: ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'black'],
    word: $(".display__word"),
}
//=====Functions====
$('.hidden').css("display", "none");
$(".title").css("display", "flex");

//=======Generate Tiles=======
const generateTiles = function () {
    for (let i = 0; i < game.colorsNum; i++) {
        $(".tiles").append(`<div class="tiles__${game.words[i]}"></div>`)
    }
}
//=======Generate Word, Color & Background========
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
    randomNum = generateRandomNum();
    game.word.text(game.words[randomNum]);
    game.word.css("color", game.words[randomNum]);
}
const textColorChange = function () {
    randomNum2 = generateRandomNum();
    game.word.css("color", game.words[randomNum2]);
}
const textBackgroundChange = function () {
    randomNum2 = generateRandomNum();
    game.word.css("color", game.words[randomNum2]);
    randomNum3 = generateRandomNum();
    if (randomNum2 === randomNum3) {
        game.word.css("background-color", game.words[randomNum3 + 1]);
    } else {
        game.word.css("background-color", game.words[randomNum3]);
    }
}
const generateRandomNum = function () {
    return Math.floor(Math.random() * game.colorsNum);
}
//=========timer Setup==========
const updateCountdown = function () {
    $(".nav__time .second").text(`${game.time}`);
    $('.nav__round').text(`Round: ${game.rounds}`)
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
//==========Phrases Setup=============
const levelIntro = function () {
    $('.round-intro span').text(game.rounds)
    if (game.rounds === 1) {
        $('.title').css("display", "none");
        $('.round-intro').css("display", "flex");
        setTimeout(level, 2000);
    } else if (game.rounds === 2) {
        $('.game').css("display", "none");
        $('.round-intro').css("display", "flex");
        setTimeout(level, 2000);
    } else if (game.rounds === 3) {
        $('.game').css("display", "none");
        $('.round-intro').css("display", "flex");
        setTimeout(level, 2000);
    }
}
const level = function () {
    if (game.rounds === 1) {
        $('.round-intro').css("display", "none");
        generateTiles();
    } else if (game.rounds === 2) {
        $('.round-intro').css("display", "none");
    } else if (game.rounds === 3) {
        $('.round-intro').css("display", "none");
    }
    $(".game").css("display", "flex");
    $(".tiles").css("display", "flex");
    $(".display").css("display", "block");
    updateCountdown();
    generateWord();
    game.interval = setInterval(updateCountdown, 1000);
}
const gameover = function () {
    $(".tiles").empty();
    $(".game").css("display", "none");
    $('#gameover').append(`<p>Game Over!  <br>Score: ${game.points}</p>`);
    $('#gameover').append('<button id="restart">Restart</button>');
    $("#gameover").css("display", "flex");
}
//======events functions=====
const changeColor = function (event) {
    $('.title__heading').css("color", `rgb(${event.offsetX},${event.offsetY},100)`);
}
const buttonFunction = function (event) {
    if (event.target.className === "title__start-game") {
        levelIntro();
    } else if (event.target.className === "title__difficulty") {
        $(".modal-difficulty").removeClass("modal-hidden");
    } else if (event.target.className === "title__instruction") {
        $(".modal-instruction").removeClass("modal-hidden");
    } else if (event.target.className === "title__cheat-code") {
        $(".modal-cheat").removeClass("modal-hidden");
    } else if (event.target.className === "title__credit") {
        $(".modal-credit").removeClass("modal-hidden");
    }
}
const modalOff = function () {
    $(".modal").addClass("modal-hidden");
}
const choseDifficulty = function () {
    if (event.target.className.includes("easy")) {
        game.colorsNum = 2;
    } else if (event.target.className.includes("medium")) {
        game.colorsNum = 4;
    } else if (event.target.className.includes("hard")) {
        game.colorsNum = 6;
    }
    modalOff();
}
const checkCode = function () {
    if ($("#cheat-code").val() === "GA") {
        game.cheat = "on"
    }
    modalOff();
}
const refreshDisplay = function (event) {
    let $class = $(event.target).attr("class").substring(7);
    let $display = $(".display__word").text();
    if ($class === $display || game.cheat === "on") {
        game.points += game.rounds;
    } else {
        game.points -= game.rounds;
    };
    generateWord();
    $(".nav__score").text(`Score: ${game.points}`);
}
const restart = function () {
    $("#gameover").css("display", "none");
    $(".title").css("display", "flex");
    $('#gameover').empty();
    game.points = 0;
    game.rounds = 1;
    game.time = 5;
    game.cheat = "off";
}
//========events=========
$(".title__heading").on("mousemove", changeColor);
$('.title button').on("click", buttonFunction)
$('.modal__contents').on("mouseleave", modalOff);
$('.difficulty__button').on('click', choseDifficulty)
$('#submit').on('click', checkCode)
$(".tiles").on("click", "div", refreshDisplay);
$("#gameover").on("click", "#restart", restart)