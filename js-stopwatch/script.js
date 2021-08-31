// Display timers
const hours         = document.getElementById("hours");
const minutes       = document.getElementById("minutes");
const seconds       = document.getElementById("seconds");
const milliseconds  = document.getElementById("milliseconds");
const showCurrent   = document.getElementById("displayCurrent");

// Buttons
const start = document.getElementById("start");
const stop  = document.getElementById("stop");
const reset = document.getElementById("reset");

var interval, ms = 0, s = 0, m = 0, h = 0;
var isRunning = false;

function startTimer () {
    isRunning = true;
    ms += 1;
    updateTime();
}

function updateTime () {
    if (ms >= 100) {
        ms = 0;
        s += 1;
    }

    if (s >= 60) {
        s = 0;
        m += 1;
    }

    if (m >= 60) {
        m = 0;
        h += 1;
    }
    updateDisplay();
}

function updateDisplay () {
    if (ms < 10) {
        milliseconds.innerHTML = '0' + ms;
    } else {
        milliseconds.innerHTML = ms;
    }

    if (s < 10) {
        seconds.innerHTML = '0' + s;
    } else {
        seconds.innerHTML = s;
    }

    if (m < 10) {
        minutes.innerHTML = '0' + m;
    } else {
        minutes.innerHTML = m;
    }
}

function resetDisplay () {
    isRunning = false;
    start.disabled = false;
    stop.disabled = false;
    h = m = s = ms = 0;
    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    milliseconds.innerHTML = '00';
    displayCurrent.innerHTML = '';
}

start.addEventListener('click', function (e) {
    e.preventDefault()
    if (!isRunning) {
        interval = setInterval(startTimer,10)
        this.disabled = true
        stop.disabled = false
    }
})

stop.addEventListener('click', function (e) {
    e.preventDefault()
    if (isRunning) {
        clearInterval(interval)
        isRunning = false;
        displayCurrent.innerHTML = h + 'hrs ' +  m + 'min ' + s + 'sec ' + ms + 'ms ';
        this.disabled = true;
        start.disabled = false;
    }
})

reset.addEventListener('click', function (e) {
    e.preventDefault()
    clearInterval(interval)
    resetDisplay()
})