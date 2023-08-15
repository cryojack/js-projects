// This is a JS tutorial for Regular Expressions (Regex)

/***************************************/
/*     REGEX TESTING AND MATCHING      */
/***************************************/

// Test a regex pattern in a string using test() method
// SYNTAX - <regex>.test(<string>)
// Returns a boolean
let myStr = "Hello my fellow children! Children of the corn!!"  // The string
let myRegex = /change/                     // The regex pattern to be searched enclosed in (/) backslashes
console.log(myRegex.test(myStr))           // false as 'change' doesn't exist in the string
console.log(/fellow/.test(myStr))          // true as 'fellow' exists in the string

// Extract the matched string using match() method
// SYNTAX - <string>.test(<regex>)
// Returns an array with the string (changes as per the regex flag)
console.log(myStr.match(/children/))       // Returns 'children' (case-sensitive match)

// Regex flags are modifiers used to change match type
// They are appended at the end of the regex pattern after the last backslash
// EXAMPLE - /regex/ig
// The (i) flag means case-insensitive matches
// The (g) flag means global matches
console.log(myStr.match(/children/ig))     // Returns all matches of 'children', case-insensitive

// Match multiple patterns using OR (|) in the regex pattern
let myStr2 = "I have a car and a bike, but I travel by bus everyday. Everyday this life!"
let multiRegex = /car|bike|bus/
console.log(multiRegex.test(myStr2))       // Returns true since one pattern is matched

// Match certain words using the Wildcard (.) operator
console.log(/bu./.test(myStr2))            // Match words starting with 'bu', returns true

// Match certain words with character classes ([xyz])
let myStr3 = "The bot is with the bat which bit me on the bus!"
console.log(myStr3.match(/b[ao]./g))       // Match words starting with either 'ba' or 'bo'

// Match through a certain number of characters using the hyphen (-) operator
let myStr4 = "The bat is with the cat who doesn't like the cot with the bed."
console.log(myStr4.match(/[a-e]at/ig))     // Match words starting from 'a' to 'e' ending in 'at'

// Matching letters and digits in a certain range
let myStr5 = "It is now 30 minutes to 12 and we are 90 minutes late!"
console.log(myStr5.match(/[1-5]/g))        // Match all digits from 1 to 5

// Match everything except the characters in the pattern using the negate (^) operator
console.log(myStr5.match(/[^aeiou]/ig))    // Match all characters apart from vowels

// Match one or more characters using the plus (+) operator
let myStr6 = "The passing of Illinois is so very baaad!"
console.log(myStr6.match(/s+/))            // Matches 'ss'

// Match zero or more characters using the star (*) operator
console.log(myStr6.match(/Il*/g))          // Matches 'Ill'

// Greedy vs lazy matches using the question (?) operator
let cStr = myStr4 + ' ' + myStr5
console.log(cStr.match(/w[a-z]+?[ho]/g))   // Matches 'with' and 'who'

// Match pattern at the beginning of string using (^) operator
console.log(cStr.match(/^The/g))           // Matches 'The' at the beginning of the pattern

// Match pattern at the end of string using ($) operator
console.log(cStr.match(/late!$/g))         // Matches 'late!' at the end of the pattern

// Match all letters and numbers using the (w) operator (no whitespaces or special chars)
console.log(cStr.match(/\w+/g))            // Matches all words (no whitespaces or special chars)

// Match everything except letters and numbers using the (W) operator
console.log(cStr.match(/\W/g))             // Matches whitespaces and special characters

// Match all numbers using the (d) operator
let nStr = "At exactly 1200 hours, the plane will arrive from direction 330."
console.log(nStr.match(/\d+/g))            // Matches all numbers

// Match all non-numbers using the (D) operator
console.log(nStr.match(/\D+/g))            // Matches all non-numbers

// Match all whitespaces using the (s) operator
console.log(nStr.match(/\s/g))             // Matches all whitespaces

// Match all non-whitespaces using the (S) operator
console.log(nStr.match(/\S/g))             // Matches all non-whitespaces

// Match between a certain number of letters using {n,n} (n represents the number)
console.log(myStr6.match(/ba{2,3}d/g))     // Matches 'bad' if it has between 2 or 3 letters of 'a'
console.log(myStr6.match(/ba{2,}d/g))      // Matches 'bad' if it has between 2 or more letters of 'a'
console.log(myStr6.match(/ba{2}d/g))       // Matches 'bad' if it has only 2 letters of 'a', returns null

// Match an optional character using the (?) operator after a letter
let strn1 = "This is my favourite color!"
let strn2 = "This is my favorite color!"
let strp = /favou?rite/g
console.log(strn1.match(strp))             // Matches 'favourite'
console.log(strn2.match(strp))             // Matches 'favorite' as 'u' is regarded as optional
