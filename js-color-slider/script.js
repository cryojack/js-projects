// Color box variable to show the color
const colorbox  = document.querySelector(".color-box");

// Color value display variable
const r_disp    = document.getElementById("red");
const g_disp    = document.getElementById("green");
const b_disp    = document.getElementById("blue");
const a_disp    = document.getElementById("alpha");
const hexval    = document.getElementById("hexval");

// Slider values
const r_slider  = document.getElementById("colorSliderRed");
const g_slider  = document.getElementById("colorSliderGreen");
const b_slider  = document.getElementById("colorSliderBlue");
const a_slider  = document.getElementById("colorSliderAlpha");
const randBttn  = document.getElementById("bttnRandom");

// Slider value output
const r_out     = document.getElementById("R_output");
const g_out     = document.getElementById("G_output");
const b_out     = document.getElementById("B_output");
const a_out     = document.getElementById("A_output");

// Functions below

function changeColor () {
    colorbox.style.backgroundColor = "rgba("+r_slider.value+","+g_slider.value+","+b_slider.value+","+a_slider.value+")";
}

function rgbToHex (color) {
    var hex = Number(color).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

r_slider.addEventListener('input', function () {
    r_disp.innerHTML = r_out.innerHTML = this.value;
    changeColor();
    hexval.innerHTML = "#" + rgbToHex(this.value) + rgbToHex(g_slider.value) + rgbToHex(b_slider.value);
});

g_slider.addEventListener('input', function () {
    g_disp.innerHTML = g_out.innerHTML = this.value;
    changeColor();
    hexval.innerHTML = "#" + rgbToHex(r_slider.value) + rgbToHex(this.value) + rgbToHex(b_slider.value);
});

b_slider.addEventListener('input', function () {
    b_disp.innerHTML = b_out.innerHTML = this.value;
    changeColor();
    hexval.innerHTML = "#" + rgbToHex(r_slider.value) + rgbToHex(g_slider.value) + rgbToHex(this.value);
});

a_slider.addEventListener('input', function () {
    a_disp.innerHTML = a_out.innerHTML = this.value;
    changeColor();
});

randBttn.addEventListener('click', function () {
    r_disp.innerHTML = r_out.innerHTML = r_slider.value = Math.floor(Math.random() * 256);
    g_disp.innerHTML = g_out.innerHTML = g_slider.value = Math.floor(Math.random() * 256);
    b_disp.innerHTML = b_out.innerHTML = b_slider.value = Math.floor(Math.random() * 256);
    a_disp.innerHTML = a_out.innerHTML = a_slider.value = Math.round(Math.random() * 10) / 10;
    changeColor();
    hexval.innerHTML = "#" + rgbToHex(r_slider.value) + rgbToHex(g_slider.value) + rgbToHex(b_slider.value);
})