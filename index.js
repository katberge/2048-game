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
        let twoOrFour = Math.floor(Math.random() * 5)
        // adds either a two or four to the square (4 is less likely)
        if (twoOrFour < 4) {
            squares[randomPosition].innerHTML = numbers[0];
        } else {
            squares[randomPosition].innerHTML = numbers[1];
        }
    }

    // start game
    function startGame() {
        newSquare();
        newSquare();
    }
    // have game start right away
    startGame();

    // adds key controls
    function control(e) {
        if (e.keyCode == 37) {
            moveLeft();
        }
        if (e.keyCode == 38) {
            moveUp();
        }
        if (e.keyCode == 39) {
            moveRight();
        }
        if (e.keyCode == 40) {
            // moveDown();
        }
    }
    document.addEventListener("keyup", control);

    function moveLeft() {
        for (let i = 1; i < width * width; i++) {
            if (squares[i].classList.contains("taken") && i % width !== 0 && i !== 0) {
                let position = i;
                while (position % width !== 0 && !squares[position - 1].classList.contains("taken") && position !== 0) {
                    position -= 1;
                    squares[position].innerHTML = squares[position + 1].innerHTML;
                    squares[position].classList.add("taken");
                    squares[position + 1].innerHTML = "";
                    squares[position + 1].classList.remove("taken");
                }
                if (position % width !== 0 && squares[position - 1].classList.contains("taken") && squares[position].innerHTML === squares[position - 1].innerHTML && position !== 0) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position - 1].innerHTML *= 2;
                }
            }
        }
        newSquare();
    }

    function moveUp() {
        for (let i = 1; i < width * width; i++) {
            const topRow = [0, 1, 2, 3];
            if (squares[i].classList.contains("taken") && !topRow.some(x => x == i)) {
                let position = i;
                while (!topRow.some(x => x == position) && !squares[position - width].classList.contains("taken")) {
                    position -= width;
                    squares[position].innerHTML = squares[position + width].innerHTML;
                    squares[position].classList.add("taken");
                    squares[position + width].innerHTML = "";
                    squares[position + width].classList.remove("taken");
                }
                if (!topRow.some(x => x == position) && squares[position - width].classList.contains("taken") && squares[position].innerHTML === squares[position - width].innerHTML) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position - width].innerHTML *= 2;
                }
            }
        }
        newSquare();
    }

    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (squares[i].classList.contains("taken") && (i + 1) % width !== 0) {
                let position = i;
                while ((position + 1) % width !== 0 && !squares[position + 1].classList.contains("taken")) {
                    position += 1;
                    squares[position].innerHTML = squares[position - 1].innerHTML;
                    squares[position].classList.add("taken");
                    squares[position - 1].innerHTML = "";
                    squares[position - 1].classList.remove("taken");
                }
                if ((position + 1) % width !== 0 && squares[position + 1].classList.contains("taken") && squares[position].innerHTML === squares[position + 1].innerHTML) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position + 1].innerHTML *= 2;
                }
            }
        }
        newSquare();
    }

    // function moveDown() {}
})