const displayPass   = document.getElementById("password");
const pass_length   = document.getElementById("length");

const include_num   = document.getElementById("includeNum");
const include_spec  = document.getElementById("includeSpec");
const include_upper = document.getElementById("includeUpper");

const check_num     = document.getElementById("includeNum");
const check_spec    = document.getElementById("includeSpec");
const check_upper   = document.getElementById("includeUpper");

const passBttn      = document.getElementById("bttnRandom");

const lower_chars   = 'abcdefghijklmnopqrstuvwxyz';
const upper_chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers       = '0123456789';
const special_chars = '!#$%&()*+,-./:;<=>?@[\]^_`{|}~';

function generatePassword (len) {
    var pass = '', str = lower_chars;
    if (check_num.checked) {
        str += numbers;
    }
    if (check_spec.checked) {
        str += special_chars;
    }
    if (check_upper.checked) {
        str += upper_chars;
    }
    for (var i = 0; i < len; i++) {
        pass += str.charAt(Math.round(Math.random() * str.length));
    }
    return pass;
}

pass_length.addEventListener('input', function () {
    if (this.value < 8) {
        this.value = 8;
    }
    if (this.value > 40) {
        this.value = 40;
    }
});

passBttn.addEventListener('click', function () {
    displayPass.innerHTML = generatePassword(pass_length.value);
});