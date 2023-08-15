// This is a JS tutorial with all known use-cases for JavaScript

// This is a single line comment

/* This is a 
multi line comment */

/***************************************/
/*       VARIABLES AND DATATYPES       */
/***************************************/

// var - is function scoped
// Can be redeclared many times, undefined if no value given
// Is hoisted
var num1 = 10;

// let - is block scoped
// Cannot be redeclared, undefined if no value given
// Not hoisted
let num2 = 20

// const - is a constant
// Cannot be redeclared, value does not change
// Best to use UPPERCASE names
const MAX_VAL = 500

var aNumber = 10                // This is an integer
var aFloat = 12.4               // This is a float
var aString = 'Hello World!'    // This is a string
var aBoolean = true             // This is a boolean

/**************************************/
/*             OPERATIONS             */
/**************************************/

var n1 = 10
var n2 = 30

console.log(n1 + n2) // Addition
console.log(n1 - n2) // Subtraction
console.log(n1 * n2) // Multiplication
console.log(n1 / n2) // Division
console.log(n1 % n2) // Remainder

// Compounding
n1 += 1
n1 -= 1
n1 *= 1
n1 /= 1

// Increment and Decrement
n2++
n2--

/****************************************/
/* STRING LITERALS AND ESCAPE SEQUENCES */
/****************************************/

// Use backslash (\) to escape single or double quotes
var mystr1 = 'This is Mike\'s shirt'
var mystr2 = "This is an \"inside-job\" amirite??"

// Escape sequences
// \'	single quote
// \"	double quote
// \\	backslash
// \n	newline
// \t	tab
// \r	carriage return
// \b	word boundary
// \f	form feed
var multiline = "This is the first line\nThis is the second line\n\tThis is a third line with a tab!"
console.log(multiline)

/***************************************/
/*            CONCATENATION            */
/***************************************/

// String concatenation
var concatstr = "This is " + "Sparta!"
console.log(concatstr)
concatstr += "\n And you better remember!!"
console.log(concatstr)

// Concatenating variables
var petname = "Arrow"
console.log("I have a dog and his name is " + petname)

var line1 = "I have a cat and "
var line2 = "I have a dog"
line1 += line2
console.log(line1)

/***************************************/
/*          STRING OPERATIONS          */
/***************************************/

// Get string length
console.log("This is Sparta".length)

var str1 = "You're gonna do WHAT??!"
console.log(str1.length)

// Get n-th character in a string
console.log(str1[4])

// Get last character
console.log(str1[str1.length - 1])

// Get n-th to last character
console.log(str1[str1.length - 5])

/**************************************/
/*          ARRAY OPERATIONS          */
/**************************************/

// Array declaration
// JS arrays can contain different datatypes
const arr1 = [1,14,7.5,"hello","David"]

// Get element at certain index 
console.log("4th element is " + arr1[3])

// Get array length
console.log("arr1 length is " + arr1.length)

// Multidimensional array
const arr2 = [
    [1,2,3],
    ["James","Hogan"],
    [[13,24,"inside"],87,9]
]

// Accessing elements in multidimensional arrays
console.log("Accessing the \"inside\" value in arr2 " + arr2[2][0][2])

// Manipulate arrays by adding/removing elements

// push(args) - add element to end of array
arr1.push("last")
console.log("Pushed item to end of arr1 " + arr1)

// pop() - remove element from end of array
arr1.pop()
console.log("Popped item from end of arr1 " + arr1)

// unshift(args) - add element to start of array
arr1.unshift("first")
console.log("Unshifted item to start of arr1 " + arr1)

// shift() - remove element from start of array
arr1.shift()
console.log("Shifted item from start of arr1 " + arr1)

/*************************************/
/*             FUNCTIONS             */
/*************************************/

// Function declaration
function showName() {
    console.log("Hello World!")
}
// Call function
showName()

// Function with parameters
function showMyName(name) {
    console.log("Hello " + name)
}
// Call function with parameter
showMyName("Jack")

// Functions with return value
function greetMe(name) {
    return "Hello " + name
}
// Assign the function return value to a variable
const greet = greetMe("Jill")
console.log(greet)

// JavaScript variables have scope i.e. where can it be accessed
// Global variables can be accessed anywhere and by any function
// They can be declared outside a function or using the var keyword

var thisIsGlobal = 100 // Global variable

// Local variables can only be accessed in the function block they were declared in
// Use let or const to declare non-global variables
function localFunction(number) {
    let multiple = 10           // Local variable
    return number * quotient    // Valid
}

// Local and global variables can have the same name, the local one will get precedence
function newFunc() {
    let thisIsGlobal = 10
    return thisIsGlobal // Will return 10 as local variable will get precedence
}
console.log(newFunc())

/************************************/
/*      CONDITIONAL STATEMENTS      */
/************************************/

// Get datatype using typeof
// Eg. typeof <variable name>
console.log(typeof aNumber, typeof aFloat, typeof aString, typeof aBoolean)

// Comparison operators
// Equality operator (==) checks if the operands are equal and does type conversion.
console.log(20 == 20)       // Returns true
console.log(20 == "20")     // Returns true due to type conversion

// Strict equality operator (===) checks if the operands are equal. No type conversion done.
console.log(20 === 20)      // Returns true
console.log(20 === "20")    // Returns false as no type conversion

// Inequality operator (!=) checks if the operands are not equal and does type conversion.
console.log(20 != 20)       // Returns false
console.log(20 != "20")     // Returns false due to type conversion

// Strict inequality operator (!==) checks if the operands are not equal. No type conversion done.
console.log(20 !== 20)      // Returns false
console.log(20 !== "20")    // Returns true as no type conversion

// Greater than operator (>) checks if the left value is greater than the right one. Type conversion done.
console.log(20 > 10)        // Returns true
console.log(10 > "20")      // Returns false due to type conversion

// Greater than or equal to operator (>=) checks if the left value is greater than or equal to the right one. Type conversion done.
console.log(10 >= 9)        // Returns true
console.log(8 >= "9")       // Returns false due to type conversion

// Less than operator (<) checks if the left value is lesser than the right one. Type conversion done.
console.log(20 < 10)        // Returns false
console.log(10 < "20")      // Returns true due to type conversion

// Less than or equal to operator (<=) checks if the left value is less than or equal to the right one. Type conversion done.
console.log(10 <= 9)        // Returns false
console.log(8 <= "9")       // Returns true due to type conversion

// Logical AND operator (&&) returns true if both left and right conditions are true
console.log(true && true)   // Returns true
console.log(true && false)  // Returns false

// Logical OR operator (||) returns true if either left or right conditions are true
console.log(true || true)   // Returns true
console.log(true || false)  // Returns true

// You can return boolean values directly using a function
function returnBool(n1,n2) {
    return n1 === n2    // Return a boolean value by directly checking the condition
}
console.log(returnBool(1,2))    // Returns false

// if statement
// Evaluates if the argument is true
function checkTrue(arg) {
    if(arg) {
        return "TRUE"
    }
    return "FALSE"
}
console.log(checkTrue(true)) // Returns TRUE

// if-else statements
// Evaluates if statement when true, moves to else block if false
function checkEvenNumber(num) {
    if(num % 2 == 0) {
        console.log(num + " Is EVEN")
    } else {
        console.log(num + " Is ODD")
    }
}
checkEvenNumber(20)     // if block is true
checkEvenNumber(21)     // else block is true

// if-else if statements
// Evaluates if block when true, moves to else-if block if false, moves to last else block if all blocks are false
function checkTime(time) {
    if(time >= 8 && time < 12) {
        console.log("It's morning!")
    } else if(time >= 12 && time < 17) {
        console.log("It's afternoon")
    } else {
        console.log("I don't know man")
    }
}
checkTime(12)

// switch-case statements
// Work like if-else, but instead have cases which are evaluated with strict equality (no type conversion)
// Also have a default case if no conditions are satisfied
function getDay(day) {
    switch(day) {
        case 1:
            console.log("Sunday")
            break
        
        case 2:
            console.log("Monday")
            break

        case 3:
            console.log("Tuesday")
            break

        case 4:
            console.log("Wednesday")
            break

        case 5:
            console.log("Thursday")
            break

        case 6:
            console.log("Friday")
            break
        
        case 7:
            console.log("Saturday")
            break

        default:
            console.log("Not a day!!")
            break
    }
}
getDay(7)       // Returns "Saturday"
getDay('j')     // Returns "Not a day!!"

// Multiple cases can have the same result
function multiCase(n) {
    switch(n) {
        case 1:
        case 2:
        case 3:
            console.log("Between 1 and 3")
            break

        case 4:
        case 5:
        case 6:
            console.log("Between 4 and 6")
            break
        
        default:
            console.log("Default")
            break
    }
}
multiCase(3)    // Returns "Between 1 and 3"

// Ternary operators work like if-else statements but a bit more simplified
// The question mark (?) is used after a conditional statement, on true it evaluates the statement after the question mark, else it evaluates the statement after the colon (:)
// Syntax - <condition> ? <true statement> : <false statement>
function ternaryReturn(arg) {
    return arg ? true : false   // You can directly use ternary operators in a return statement
}
console.log(ternaryReturn(true)) // Returns true

// You can chain ternary operations
function chainedTernaryReturn(num) {
    return num < 0 ? "Negative" : num > 0 ? "Positive" : "Zero"
}
console.log(chainedTernaryReturn(40))   // Returns "Positive"

/***********************************/
/*             OBJECTS             */
/***********************************/

// Objects are a form of related data structure.
// They can contain variables and functions.

// This is an object
const personA = {
    "name"      :   "John Smith",   // "name" is a property, "John Smith" is the value
    "age"       :   37,
    "job"       :   "Lead Engineer",
    "likes"     :   ["Hiking","Cycling","Dogs"],
    "about me"  :   "Just a normal guy!"
}

// Accessing the object properties
console.log(personA.name)
console.log(personA["age"])
console.log(personA["about me"])    // Can be used to access properties which have a space or special character

// Accessing using variables
let job = "job"
console.log(personA[job])           // Use the variable directly without quotes

// Adding new properties to the object
personA["salary"] = "$25000"
console.log(personA.salary)         // Can be accessed as "salary" property has been created and added

// Deleting an object's property
delete personA["about me"]          // This is deleted
console.log(personA["about me"])    // Will return undefined as property doesn't exist

// Checking if an object has a property
let sal = "salary"
function checkProperty(obj,prop) {
    if(obj.hasOwnProperty(prop)) {  // .hasOwnProperty returns a boolean value
        console.log("EXISTS!")
    } else {
        console.log("DOESN'T EXIST!")
    }
}
checkProperty(personA,sal)          // Will return true as "salary" exists
checkProperty(personA,"about me")   // Will return false as "about me" doesn't exist

// Objects can contain nested objects and nested arrays
const gamingPC = {
    "name"          : "My Awesome PC!!",
    "assembled on"  : "19/04/2022",
    "parts" : {
        "cpu" : "Intel i7 6700K",
        "gpu" : "GTX 1070 ROG STRIX",
        "ram" : "HyperX Gaming 4x4GB 2133Mhz DDR4",
        "hdd" : "Seagate 1TB",
        "case": "Cooler Master"
    },
    "can play" : ["Fallout 76","GTA 5","Elder Scrolls V Skyrim","CyberPunk 2077","Fortnite","Rust"],
    "total cost"    : "Rs. 95000"
}

// Accessing "gpu" in "parts" (object)
console.log(gamingPC.parts.gpu)

// Accessing a game in "can play" (array)
console.log(gamingPC["can play"][1])

// Adding new games to the "can play" array inside the "gamingPC" object
function addNewGame(obj,game) {
    if(!obj.hasOwnProperty("can play")) {
        obj["can play"] = []
        obj["can play"].push(game)
    } else {
        obj["can play"].push(game)
    }
}
addNewGame(gamingPC,"Flight Simulator")
console.log(gamingPC["can play"])

/***********************************/
/*              LOOPS              */
/***********************************/

// while loop
// Runs until the condition is false
function incrementToN(num) {
    let n = 1
    while(n <= num) {
        console.log("increment " + n)
        n++
    }
}
incrementToN(10)    // Runs till "n" value equals "num" value

// do-while loop
// Runs as long as the while condition is true
// Unlike while, do-while will run once even if the condition is false
function incrementToN2(num) {
    let n = num
    do {
        console.log("increment V2 " + n)
        n++
    } while(n <= num)
}
incrementToN2(5)    // Runs once and then terminates as while condition is false

// for loop
// Takes three arguments, initialization, condition and increment
function iterateArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}
iterateArray(gamingPC['can play'])  // Using the array in the "gamingPC" object created before

// Recursion - function calls itself
// It needs a base case (to end recursion) and recursive case (to continue recursion)
function recursiveAdd(n) {
    if(n <= 1) {
        return 1                        // Base case to terminate the recursion
    } else {
        return n + recursiveAdd(n - 1)  // Call function within function
    }
}
console.log(recursiveAdd(5))

/**********************************/
/*             RANDOM             */
/**********************************/

// Generate random numbers using Math.random()
// Generates a random floating point number between 0 and 1
// We can multiply the random float with an integer(n) to get a number within a range of 0 to n-1
// We can also use Math.floor() to get a whole number
function generateRandom(n) {
    return Math.floor(Math.random() * n)
}
console.log(generateRandom(100))        // Will return a random number from 0 to n-1

// Generate random numbers within a range
function generateRandomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
console.log(generateRandomRange(1,10))  // Will return a random number between min and max

// Parsing strings and returning numbers using parseInt()
// parseInt(str,base) takes 2 arguments, the string to be parsed and the base (or radix)
console.log(parseInt("001"))        // Returns the number 1

console.log(parseInt("0xaa",16))    // Returns the number 170 (base-16 is hexadecimal)
