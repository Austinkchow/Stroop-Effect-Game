const game = {
    time: 30,
    points: 0,
    rounds: 0,
    words: ['red', 'yellow', 'blue', 'green', 'orange', 'purple'],
    time: 5
}

const start = function () {
    generateWord();
    $(".nav__start").css("display", "none");
}

const generateWord = function () {
    const $word = $(".display__word")
    randomNum = Math.floor(Math.random() * 6);
    $word.text(game.words[randomNum]);
    randomNum2 = Math.floor(Math.random() * 6);
    $word.css("color", game.words[randomNum2]);
}

$(".nav__start").on("click", start);

$(".tiles div").on("click", function (event) {
    let $class = $(event.target).attr("class").substring(7);
    let $display = $(".display__word").text();
    if ($class === $display) {
        game.points++
    };
    generateWord();
    $(".nav__score").text(`Score: ${game.points}`);
});