// Main variables
const mainText  = document.getElementById("jsrText");
const inputWord = document.getElementById("jsrInputWord");

const letters   = document.getElementById("dispLetter");
const words     = document.getElementById("dispWord");
const dispFind  = document.getElementById("dispFind");
const longWord  = document.getElementById("longWord"); 

const wordDisp  = document.getElementById("findWord");
const bttnReset = document.getElementById("jsrBttnReset");

function letterCount () {
    var count = mainText.value;
    var letters = 0;
    var regex = /^[a-z0-9]+$/i;
    for (var i = 0; i < count.length; i++) {
        if (count[i].match(regex)) {
            letters += 1;
        }
    }
    return letters;
}

function wordCount () {
    var count = mainText.value;
    var regex = /[\w\d\’\'-]+/gi;
    var words = count.match(regex).length;
    return words;
}

function findWord () {
    var found = 0;
    var count = mainText.value;
    var regex = /[\w\d\’\'-]+/gi;
    var words = count.match(regex);
    for (var i = 0; i < words.length; i++) {
        if (words[i] === inputWord.value) {
            found += 1;
        }
    }
    return found;
}

function longestWord () {
    var longest = "";
    var count = mainText.value;
    var regex = /[\w\d\’\'-]+/gi;
    var words = count.match(regex);
    for (var i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}

mainText.addEventListener('input', function (e) {
    letters.innerHTML = letterCount()
    words.innerHTML = wordCount()
    longWord.innerHTML = longestWord()
    if (inputWord.value) {
        wordDisp.innerHTML = 'Occurences of ' + inputWord.value + ' : '
        dispFind.innerHTML = findWord()
    }
});

inputWord.addEventListener('input', function (e) {
    wordDisp.innerHTML = 'Occurences of ' + inputWord.value + ' : '
    dispFind.innerHTML = findWord()
});

bttnReset.addEventListener('click', function (e) {
    e.preventDefault()
    mainText.value = ""
    inputWord.value = ""
    letters.innerHTML = '0'
    words.innerHTML = '0'
    wordDisp.innerHTML = 'Find Word : '
    dispFind.innerHTML = '0'
});