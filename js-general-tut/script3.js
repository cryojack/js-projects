// This is a JS tutorial for Data Structures

/***************************************/
/*          ARRAY FUNCTIONS            */
/***************************************/

/* 
 * Modify an array using the splice() function
 * SYNTAX - array.splice(start, deleteCount, item1, itemN)
 * @param {number} start - The start index
 * @param {number} deleteCount - Number of items to be removed (can be zero)
 * @param {any} item1, itemN - The items to be added starting from start (OPTIONAL)
 */
let arr1 = [1,5,6,"hello",[12,23],{'car':'honda'}]  // Original array
arr1.splice(3,1)                                    // Removed 'hello' at index 3
arr1.splice(4,0,"Added now")                        // Added a new item at index 4
arr1.splice(2,1,["A","B"])                          // Removed 1 item at index 2 and added new item
console.log(arr1)                                   // Modified array

/* 
 * Return a portion of an array using the slice() function
 * SYNTAX - array.slice(start, end)
 * @param {number} start - The start index
 * @param {number} end - The end index, not included (OPTIONAL)
 */
let arr2 = [1,5,6,"hello",[12,23],{'car':'honda'}]  // Original array
console.log(arr2.slice(2,4))                        // Returns '6' and 'hello'
console.log(arr2.slice(3))                          // Returns everything from index 3

/* 
 * Check if an item exists in an array using indexOf() function
 * SYNTAX - array.indexOf(elem)
 * @param {any} elem - The element to be searched.
 * Returns an index number if elem is present, -1 if elem doesn't exist
 */
console.log(arr2.indexOf("hello"))                  // Returns 3 as "hello" is at index 3
console.log(arr2.indexOf(36))                       // Returns -1 as 36 doesn't exist in the array

/* 
 * Use the spread operator (...) to copy an entire array
 * SYNTAX - let newArr = [...oldArr]
 */
let aNewArr = [...arr2]
console.log(aNewArr)                                // Copies arr2 contents into aNewArr


/***************************************/
/*              OBJECTS                */
/***************************************/

/* 
 * Add key-value pairs to objects
 * SYNTAX - object.keyToAdd = "value"
 * SYNTAX - object['key to add'] = "value"
 */
const mypcdetails = {
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
    "total cost"    : {
        "den"  : "rupees",
        "price": 95000
    }
}

mypcdetails.noOfParts = 15                          // Adds key 'noOfParts' with value 15 to the object
mypcdetails["bought from"] = "A gaming shop!!"      // Use single/double quotes to add property with space
console.log(mypcdetails)

let assembledDate = mypcdetails["assembled on"]     // Access the value of a certain key
console.log(assembledDate)

/* 
 * Delete object properties using the delete keyword
 * SYNTAX - delete object.property
 */
delete mypcdetails.parts.ram                        // Deletes 'ram' from the 'parts' property
delete mypcdetails["bought from"]                   // Alternate syntax for property with space
console.log(mypcdetails)

/* 
 * Check if object has a property using hasOwnProperty()
 * SYNTAX - object.hasOwnProperty(prop)
 * @param {prop} property - The property to be checked
 */
console.log(mypcdetails.hasOwnProperty("total cost"))   // Returns true as this property exists
console.log(mypcdetails.hasOwnProperty("bought from"))  // Returns false as this property doesn't exist

/* 
 * Use for..in loop to iterate over all the keys in an object
 * SYNTAX - for(key in obj) {
 *      do something
 * }
 */
for (const key in mypcdetails) {
    console.log(key)                                    // Returns all the keys
}

/* 
 * Return an array of all keys using Object.keys(obj)
 * @param {obj} object - The object from which keys are to be extracted
 */
console.log(Object.keys(mypcdetails))                   // Returns an array of the keys

/* 
 * Create a basic object
 * SYNTAX - let/var/const objname = {} (curly braces)
 */
let MyCar = {
    carName: "Alto LXi",                                // Object property 
    wheels : 4,
    travelled : 76566,
    introduce: function() {                             // Object method
        console.log("My car is an " + MyCar.carName + ", It has " + MyCar.wheels + " wheels and it as travelled " + MyCar.travelled + " KM")
    }
}

/* 
 * Access object properties and methods
 * SYNTAX - objname.prop / objname.method()
 */
console.log(MyCar.carName)                              // Prints "Alto LXi"
MyCar.introduce()                                       // Runs the introduce() function

/* 
 * Access object properties and methods
 * SYNTAX - objname.prop / objname.method()
 */
let MyCar2 = {
    carName: "Hyndai Verna",
    wheels : 4,
    travelled : 79812,
    introduce: function() {
        console.log("My car is an " + this.carName + ", It has " + this.wheels + " wheels and it as travelled " + this.travelled + " KM")           // Using this keyword to point to object properties
    }
}

/* 
 * Create constructors for objects
 * SYNTAX - function ObjectName(args) {}
 */
function Vehicle(vehicleName,wheels,travelled) {
    this.vehicleName = vehicleName
    this.wheels = wheels
    this.travelled = travelled
}

/* 
 * Create objects using constructor
 * SYNTAX - let var = new ObjectConst()
 */
let car = new Vehicle("Car1",4,75644)
console.log(car.vehicleName)                            // Access object properties as usual

/* 
 * Check if an object is an instance of a constructor using instanceof
 * SYNTAX - object instanceof Object
 */
console.log(car instanceof Vehicle)                     // Returns true

/* 
 * Check if object has own properties using hasOwnProperty()
 * SYNTAX - obj.hasOwnProperty(prop)
 */
console.log(car.hasOwnProperty("wheels"))               // Returns true
console.log(car.hasOwnProperty("introduce"))            // Returns false

/* 
 * Use for...in loop to iterate over all properties
 */
for(let prop in car) {
    console.log(prop)
}

/* 
 * Add prototype properties
 * SYNTAX - constructor.prototype.prop = something
 */
Vehicle.prototype.fuel = "petrol"                       // Adds 'fuel' property to Vehicle constructor

/* 
 * Define prototype as an object to save time and also add constructor to it
 */
Vehicle.prototype = {
    constructor: Vehicle,
    start: function () {
        return "VROOM!"
    }
}

/* 
 * Check type of object using constructor keyword
 * SYNTAX - obj.constructor
 */
console.log(car.constructor === Vehicle)                // Returns true as car is a Vehicle object

/* 
 * Check if object is prototype of constructor using isPrototypeOf
 * SYNTAX - constructor.prototype.isPrototypeOf(obj)
 */
let truck = new Vehicle("Benz",8,50000)
console.log(Vehicle.prototype.isPrototypeOf(truck))     // Returns true