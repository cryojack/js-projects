// function convertTo12HrsFormat(time) {
//     var formattedTime = '';
//     var suffix = '';
//     var temp = time.toString().slice(0,4);
//     var h = Number(temp.slice(0,2));
//     var m = Number(temp.slice(2,4));
//     if(h > 24 || m > 59) {
//         return 'Invalid time entered';
//     } else {
//         if (h > 12) {
//             h = h - 12;
//             suffix = 'pm';
//         } else if (h == 12) {
//             suffix = 'pm';
//         } else {
//             suffix = 'am';
//         }
//         formattedTime += (h).toString().padStart(2,0) + ':' + m.toString().padStart(2,0) + suffix;
//     }
//     return formattedTime;
// }

function convertTo12HrsFormat(time) {
    var formattedTime = ""
    var suffix = ""
    var temp = time.toString().slice(0, 4)
    var h = Number(temp.slice(0, 2))
    var m = Number(temp.slice(2, 4))
    if (h > 24 || m > 59) {
        return "Invalid time entered"
    } else {
        if (h > 12) {
            h = h - 12
            suffix = "pm"
        } else if (h == 12) {
            suffix = "pm"
        } else {
            suffix = "am"
        }
        formattedTime +=
            h.toString().padStart(2, 0) +
            ":" +
            m.toString().padStart(2, 0) +
            suffix
    }
    return formattedTime
}

function recursivePower(num, pow) {
    if (pow < 1) return 1
    console.log("after : " + num, pow)
    return num * recursivePower(num, pow - 1)
}

function evenOdd(arr) {
    for (const num of arr) {
        console.log(num % 2 === 0 ? `${num} Even` : `${num} Odd`)
    }
}

function leapYear(year) {
    return year % 4 === 0 ? `${year} is leap year` : `${year} is not leap year`
}

function insertElements(min, max, number) {
    if (max - min < number)
        return "Error: max-min should be greater than number!"

    let arr = []
    for (let i = 0; i < number; i++) {
        const n = Math.round(Math.random() * (max - min) + min)
        if (!arr.includes(n)) {
            arr.push(n)
        }
    }
    return arr
}

function insertElements2(min, max) {
    let arr = []
    for (let i = min; i <= max; i++) {
        arr.push(i)
    }
    return arr
}

function getHighest(array) {
    let n = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] > n) {
            n = array[i]
        }
    }
    return n
}

function getLowest(array) {
    let n = array[Math.round(Math.random() * (array.length - 1))]
    for (let i = 0; i < array.length; i++) {
        if (array[i] < n) {
            n = array[i]
        }
    }
    return n
}

function multiples(n, i) {
    return n * i
}

function multiplyAll(s, n) {
    return s * n
}

function greaterThan(n) {
    return n > 50
}

let arr = insertElements2(1582, 2023)
arr = arr.filter((year) => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
})
console.log(arr)
