const startB = document.getElementById("start");
const stopB  = document.getElementById("stop");
const main  = document.getElementById("mainContainer");
const box1  = document.getElementById("box1");
const box2  = document.getElementById("box2");
const box3  = document.getElementById("box3");
var intervID;

function changeColor () {
    var r,g,b;
	r = Math.round(Math.random() * (256 - 0))
	g = Math.round(Math.random() * (256 - 0))
	b = Math.round(Math.random() * (256 - 0))
    main.style.backgroundColor = "rgb("+r+","+g+","+b+")";
    box1.innerHTML = "R : " + r;
    box2.innerHTML = "G : " + g;
    box3.innerHTML = "B : " + b;
    //console.log(box1.innerHTML + " | " + box2.innerHTML + " | " + box3.innerHTML);
}

startB.addEventListener('click', function (e) {
    e.preventDefault()
    intervID = setInterval(changeColor,500)
})

stopB.addEventListener('click', function (e) {
    e.preventDefault()
    clearInterval(intervID)
    main.style.backgroundColor = "white";
    box1.innerHTML = "0"
    box2.innerHTML = "0"
    box3.innerHTML = "0"
})