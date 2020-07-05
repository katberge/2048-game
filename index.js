document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#grid");
    let squares = Array.from(document.querySelectorAll("#grid div"));
    let newGameBtn = document.querySelector("#new-game");
    const width = 4;
    const numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
    const colors = [
        "var(--color-a)",
        "var(--color-b)",
        "var(--color-c)",
        "var(--color-d)",
        "var(--color-e)",
        "var(--color-f)",
        "var(--color-g)",
        "var(--color-h)",
        "var(--color-i)",
        "var(--color-j)",
        "var(--color-k)"
    ];
    const scoreDisplay = document.querySelector("#score");
    let score = 0;


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
            squares[randomPosition].style.backgroundColor = colors[0];
        } else {
            squares[randomPosition].innerHTML = numbers[1];
            squares[randomPosition].style.backgroundColor = colors[1];
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
            moveDown();
        }
    }
    document.addEventListener("keyup", control);

    // adds functionality to the new game button
    newGameBtn.addEventListener("click", () => {
        location.reload();
    })

    function moveLeft() {
        let before = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                before.push(squares.indexOf(x));
            }
        })
        for (let i = 1; i < width * width; i++) {
            if (squares[i].classList.contains("taken") && i % width !== 0 && i !== 0) {
                let position = i;
                while (position % width !== 0 && !squares[position - 1].classList.contains("taken") && position !== 0) {
                    position -= 1;
                    squares[position].innerHTML = squares[position + 1].innerHTML;
                    squares[position].classList.add("taken");
                    let num = parseInt(squares[position].innerHTML, 10);
                    squares[position].style.backgroundColor = colors[numbers.indexOf(num)];
                    squares[position + 1].innerHTML = "";
                    squares[position + 1].classList.remove("taken");
                    squares[position + 1].style.backgroundColor = "";
                }
                if (position % width !== 0 && squares[position - 1].classList.contains("taken") && squares[position].innerHTML === squares[position - 1].innerHTML && position !== 0) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position].style.backgroundColor = "";
                    squares[position - 1].innerHTML *= 2;
                    let num = parseInt(squares[position - 1].innerHTML, 10);
                    squares[position - 1].style.backgroundColor = colors[numbers.indexOf(num)];
                    score += num;
                    scoreDisplay.innerHTML = score;
                }
            }
        }

        // only send new square if key moved squares
        let after = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                after.push(squares.indexOf(x));
            }
        })
        function areSame() { 
            if (before.length !== after.length) {
                return false;
            }
            for (let i = 0; i < before.length; i++) {
                if (before[i] !== after[i]) {
                    return false;
                }
            }
            return true;
        }
        if (!areSame()) {
            newSquare();
        }

        endGame();
    }

    function moveUp() {
        let before = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                before.push(squares.indexOf(x));
            }
        })
        for (let i = 0; i < width * width; i++) {
            const topRow = [0, 1, 2, 3];
            if (squares[i].classList.contains("taken") && !topRow.some(x => x == i)) {
                let position = i;
                while (!topRow.some(x => x == position) && !squares[position - width].classList.contains("taken")) {
                    position -= width;
                    squares[position].innerHTML = squares[position + width].innerHTML;
                    squares[position].classList.add("taken");
                    let num = parseInt(squares[position].innerHTML, 10);
                    squares[position].style.backgroundColor = colors[numbers.indexOf(num)];
                    squares[position + width].innerHTML = "";
                    squares[position + width].classList.remove("taken");
                    squares[position + width].style.backgroundColor = "";
                }
                if (!topRow.some(x => x == position) && squares[position - width].classList.contains("taken") && squares[position].innerHTML === squares[position - width].innerHTML) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position].style.backgroundColor = "";
                    squares[position - width].innerHTML *= 2;
                    let num = parseInt(squares[position - width].innerHTML, 10);
                    squares[position - width].style.backgroundColor = colors[numbers.indexOf(num)];
                    score += num;
                    scoreDisplay.innerHTML = score;
                }
            }
        }
        
        // only send new square if key moved squares
        let after = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                after.push(squares.indexOf(x));
            }
        })
        function areSame() { 
            if (before.length !== after.length) {
                return false;
            }
            for (let i = 0; i < before.length; i++) {
                if (before[i] !== after[i]) {
                    return false;
                }
            }
            return true;
        }
        if (!areSame()) {
            newSquare();
        }
        
        endGame();
    }

    function moveRight() {
        let before = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                before.push(squares.indexOf(x));
            }
        })
        for (let i = width * width - 1; i >= 0; i--) {
            if (squares[i].classList.contains("taken") && (i + 1) % width !== 0) {
                let position = i;
                while ((position + 1) % width !== 0 && !squares[position + 1].classList.contains("taken")) {
                    position += 1;
                    squares[position].innerHTML = squares[position - 1].innerHTML;
                    squares[position].classList.add("taken");
                    let num = parseInt(squares[position].innerHTML, 10);
                    squares[position].style.backgroundColor = colors[numbers.indexOf(num)];
                    squares[position - 1].innerHTML = "";
                    squares[position - 1].classList.remove("taken");
                    squares[position - 1].style.backgroundColor = "";
                }
                if ((position + 1) % width !== 0 && squares[position + 1].classList.contains("taken") && squares[position].innerHTML === squares[position + 1].innerHTML) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position].style.backgroundColor = "";
                    squares[position + 1].innerHTML *= 2;
                    let num = parseInt(squares[position + 1].innerHTML, 10);
                    squares[position + 1].style.backgroundColor = colors[numbers.indexOf(num)];
                    score += num;
                    scoreDisplay.innerHTML = score;
                }
            }
        }
        
        // only send new square if key moved squares
        let after = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                after.push(squares.indexOf(x));
            }
        })
        function areSame() { 
            if (before.length !== after.length) {
                return false;
            }
            for (let i = 0; i < before.length; i++) {
                if (before[i] !== after[i]) {
                    return false;
                }
            }
            return true;
        }
        if (!areSame()) {
            newSquare();
        }
        
        endGame();
    }

    function moveDown() {
        let before = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                before.push(squares.indexOf(x));
            }
        })
        for (let i = width * width - 1; i >= 0; i--) {
            const bottomRow = [width * 3, width * 3 + 1, width * 3 + 2, width * 3 + 3];
            if (squares[i].classList.contains("taken") && !bottomRow.some(x => x == i)) {
                let position = i;
                while (!bottomRow.some(x => x == position) && !squares[position + width].classList.contains("taken")) {
                    position += width;
                    squares[position].innerHTML = squares[position - width].innerHTML;
                    squares[position].classList.add("taken");
                    let num = parseInt(squares[position].innerHTML, 10);
                    squares[position].style.backgroundColor = colors[numbers.indexOf(num)];
                    squares[position - width].innerHTML = "";
                    squares[position - width].classList.remove("taken");
                    squares[position - width].style.backgroundColor = "";
                }
                if (!bottomRow.some(x => x == position) && squares[position + width].classList.contains("taken") && squares[position].innerHTML === squares[position + width].innerHTML) {
                    squares[position].classList.remove("taken");
                    squares[position].innerHTML = "";
                    squares[position].style.backgroundColor = "";
                    squares[position + width].innerHTML *= 2;
                    let num = parseInt(squares[position + width].innerHTML, 10);
                    squares[position + width].style.backgroundColor = colors[numbers.indexOf(num)];
                    score += num;
                    scoreDisplay.innerHTML = score;
                }
            }
        }
        
        // only send new square if key moved squares
        let after = [];
        squares.forEach(x => {
            if (x.classList.contains("taken")) {
                after.push(squares.indexOf(x));
            }
        })
        function areSame() { 
            if (before.length !== after.length) {
                return false;
            }
            for (let i = 0; i < before.length; i++) {
                if (before[i] !== after[i]) {
                    return false;
                }
            }
            return true;
        }
        if (!areSame()) {
            newSquare();
        }
        
        endGame();
    }

    // way for game to end 
    let lost = document.querySelector("#lost");
    let won = document.querySelector("#won");
    function endGame() {
        if (squares.some(x => x.innerHTML == "2048")) {
            won.style.display = "block";
            grid.style.filter = "brightness(70%)";
            document.removeEventListener("keyup", control);
        }
        if (squares.every(x => x.classList.contains("taken"))) {
            let answer = "yes";
            for (let i = 0; i < width * width; i++) {
                const topRow = [0, 1, 2, 3];
                const bottomRow = [width * 3, width * 3 + 1, width * 3 + 2, width * 3 + 3];
                if (i % width !== 0 && i !== 0 && squares[i].innerHTML == squares[i - 1].innerHTML) {
                    answer = "no";
                } else if (!topRow.some(x => x == i) && squares[i].innerHTML == squares[i - width].innerHTML){
                    answer = "no";
                } else if ((i + 1) % width !== 0 && squares[i].innerHTML == squares[i + 1].innerHTML) {
                    answer = "no";
                } else if (!bottomRow.some(x => x == i) && squares[i].innerHTML == squares[i + width].innerHTML) {
                    answer = "no";
                }
            }
            if (answer == "yes") {
                lost.style.display = "block";
                grid.style.filter = "brightness(70%)";
                document.removeEventListener("keyup", control);
            }
        }
    }
})