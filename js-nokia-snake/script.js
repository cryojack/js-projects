document.addEventListener('DOMContentLoaded', function() {
    const squares   = document.querySelectorAll('.grid div');
    const scoreDisp = document.querySelector('.score span');
    const startBtn  = document.querySelector('.startBtn');

    const width = 10;

    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // Functions here 

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        //generateApple()
        direction = 1;
        scoreDisp.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes,intervalTime);
    }

    function moveOutcomes() {
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) || 
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
          console.log('you lose');
          return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        console.log(`tail is ${tail}`);
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            generateApple();
            score++;
            scoreDisp.textContent = score;
            clearInterval(interval);
            intervalTime *= speed;
            interval = setInterval(moveOutcomes,intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');
    }
    

    function changeDirection(e) {
        squares[currentIndex].classList.remove('snake');
        
        if(e.keyCode === 39) {
            direction = 1
          } else if (e.keyCode === 38) {
            direction = -width
          } else if (e.keyCode === 37) {
            direction = -1
          } else if (e.keyCode === 40) {
            direction = +width
          }
    }

    document.addEventListener('keyup', changeDirection);

    startBtn.addEventListener('click', startGame);
});