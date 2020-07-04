document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    let squares = Array.from(document.querySelectorAll("#grid div"));
    const width = 4;
    const numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

    // add new square to the grid
    function newSquare() {
        let randomPosition = Math.floor(Math.random() * width * width);
        while (squares[randomPosition].classList.contains("taken")) {
            randomPosition = Math.floor(Math.random() * width * width);
        }
        squares[randomPosition].classList.add("taken");
        squares[randomPosition].innerHTML = numbers[0];
    }

    // start game
    function startGame() {
        newSquare();
        newSquare();
    }
    // have game start right away
    startGame();
})