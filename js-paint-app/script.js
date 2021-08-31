const canvas    = document.getElementById("canvas");
const posX      = document.getElementById("posX");
const posY      = document.getElementById("posY");
const drawWidth = document.getElementById("drawWidth");
const color     = document.getElementById("color");
const ctx       = canvas.getContext('2d');

var isDrawing = false;

function showPos (e) {
    posX.innerHTML = e.pageX - this.offsetLeft;
    posY.innerHTML = e.pageY - this.offsetTop;
}

function startPos () {
    isDrawing = true;
    ctx.beginPath();
}

function endPos () {
    isDrawing = false;
    ctx.beginPath();
}

function paint (e) {
    if (isDrawing) {
        ctx.lineWidth = drawWidth.value;
        ctx.lineCap = "square";
        ctx.strokeStyle = color.value;
        ctx.lineTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    }
}

canvas.addEventListener('mousemove', showPos, false);
canvas.addEventListener('mouseenter', showPos, false);
canvas.addEventListener('mouseleave', showPos, false);
canvas.addEventListener('mousedown', startPos);
canvas.addEventListener('mousedown', paint);
canvas.addEventListener('mouseup', endPos);
canvas.addEventListener('mousemove', paint);

drawWidth.addEventListener('input', function () {
    if (this.value > 25) {
        this.value = 25;
    }
    if (this.value < 1) {
        this.value = 1;
    }
});