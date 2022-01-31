window.addEventListener('load', function () {
    const resetBtn = document.querySelector('.reset button');
    const boxes = document.querySelectorAll('.box');
    const scoreX = document.querySelector('.p1');
    const scoreO = document.querySelector('.p2');
    const board = [
        '','','',
        '','','',
        '','','',
    ];
    const winConditions = [
        // Horizontal
        [0,1,2],
        [3,4,5],
        [6,7,8],

        // Vertical
        [0,3,6],
        [1,4,7],
        [2,5,8],

        // Diagonal
        [0,4,8],
        [2,4,6]
    ]
    var XScore = 0;
    var OScore = 0;
    var current = 'X';
    var hasWon = false;

    function resetGame() {
        gameStart();
        XScore = OScore = 0;
        scoreX.innerText = XScore;
        scoreO.innerText = OScore;
    }


    function gameStart() {
        boxes.forEach((box) => {
            box.innerHTML = '';
            box.addEventListener('click',addPiece);
        });
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        current = 'X'
        hasWon = false;
    }

    function checkWin(player) {
        if(!hasWon && !board.includes('')) {
            console.log('Tie');
            gameStart();
        }

        for (let i = 0; i < winConditions.length; i++) {
            let sum = 0;
            const win = winConditions[i];
            for (let j = 0; j < win.length; j++) {
                if(board[win[j]] == player) {
                    sum++;
                }
            }
            if(sum == 3) {
                if(player == 'X')
                    XScore++;

                if(player == 'O')
                    OScore++;

                hasWon = true;
                scoreX.innerText = XScore;
                scoreO.innerText = OScore;
                alert(`${player} has won`);
                gameStart();
            }
        }
    }


    function switchPlayer() {
        if(current == 'X') {
            current = 'O';
        } else {
            current = 'X';
        }
        return current;
    }

    function addPiece() {
        const p = switchPlayer();
        this.innerHTML = p;
        board.splice(this.id,1,p);
        this.removeEventListener('click',addPiece);
        //console.log(board);
        checkWin(p);
    }

    resetBtn.addEventListener('click', resetGame);
    gameStart();
});