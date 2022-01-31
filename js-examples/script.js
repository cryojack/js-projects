window.addEventListener('load', function() {


    function convertTo12HrsFormat(time) {
        var formattedTime = '';
        var suffix = '';
        var temp = time.toString().slice(0,4);
        var h = Number(temp.slice(0,2));
        var m = Number(temp.slice(2,4));
        if(h > 24 || m > 59) {
            return 'Invalid time entered';
        } else {
            if (h > 12) {
                h = h - 12;
                suffix = 'pm';
            } else if (h == 12) {
                suffix = 'pm';
            } else {
                suffix = 'am';
            }
            formattedTime += (h).toString().padStart(2,0) + ':' + m.toString().padStart(2,0) + suffix;
        }
        return formattedTime;
    }


    // recursion practice

    function recursivePower(num,pow) {
        if(pow < 1)
            return 1;
        console.log('after : ' + num,pow);
        return num * recursivePower(num, pow - 1);
    }

    function evenOdd(arr) {
        for (const num of arr) {
            console.log(num % 2 === 0 ? `${num} Even` : `${num} Odd`)
        }
    }

    function leapYear(year) {
        return year % 4 === 0 ? `${year} is leap year` : `${year} is not leap year`
    }


    const container = document.querySelector('.container');
    const inner = document.createElement('h3');
    container.appendChild(inner);
    container.setAttribute('style', 'width:100%;height:500px;background-color:beige;display:flex;justify-content:center;align-items:center');
    inner.setAttribute('style', 'background-color:blue;color:white;font-size:40px;width:100%;height:200px;tex-align:center;display:flex;justify-content:center;align-items:center');



    const arr1 = [];

    function insertElements(array,min,max,number) {
        if((max - min) < number) {
            return "Error: max-min should be greater than number!";
        } else {
            for(let i = 0 ; i < number ; i++) {
                const n = Math.round(Math.random() * (max - min) + min);
                if(!array.includes(n)) {
                    array.push(n)
                }
            }
        }
    }

    function getHighest(array) {
        let n = 0;
        for (let i = 0; i < array.length; i++) {
            if(array[i] > n) {
                n = array[i];
            }
        }
        return n;
    }

    function getLowest(array) {
        let n = array[Math.round(Math.random() * (array.length - 1))];
        for (let i = 0; i < array.length; i++) {
            if(array[i] < n) {
                n = array[i];
            }
        }
        return n;
    }

    function multiples(n,i) {
        return n * i;
    }

    function evenOdd(n) {
        return n % 2 == 0;
    }

    function multiplyAll(s,n) {
        return s * n;
    }

    function greaterThan(n) {
        return n > 50;
    }

    insertElements(arr1, 1, 99, 5)

    arr2 = arr1.filter(evenOdd)
    arr3 = arr2.every(greaterThan)

    const str1 = "Content reproduced on this site is the property of its respective owners, and this content is not reviewed in advance by MariaDB. The views, information and opinions expressed by this content do not necessarily represent those of MariaDB or any other party.";


    function checkWords(words,word) {
        if(word in words) {
            words[word]++;
        } else {
            words[word] = 1;
        }
        return words;
    }

    function checkOverAge(age) {
        return age > 18;
    }

    const arr = [
        19,12
    ]

    console.log(
        arr.some(checkOverAge)
    )
})