const employees = [
    {
        id: 288345,
        name: {
            first: "Liz",
            last : "Lemon"
        },
        address: {
            house   : "Apartment S/123",
            street  : "7 Primrose Road",
            district: "Manhattan",
            city    : "New York",
            state   : "NY"
        },
        desig: "Head Writer",
        doj  : "03/15/1994",
        salary: {
            base : 32832,
            suppl: 17058,
            bonus: 9456,
            inc1 : 5022,
            inc2 : 3522
        }
    },
    {
        id: 276113,
        name: {
            first: "Jack",
            last : "Donaghy"
        },
        address: {
            house   : "No. 17 West",
            street  : "11 Grove Street",
            district: "The Village",
            city    : "New York",
            state   : "NY"
        },
        desig: "CEO",
        doj  : "10/01/1996",
        salary: {
            base : 85644,
            suppl: 23562,
            bonus: 11900,
            inc1 : 8900,
            inc2 : 5600
        }
    },
    {
        id: 234451,
        name: {
            first: "Pete",
            last : "Hornberger"
        },
        address: {
            house   : "Flat 233 Ironside Bldg",
            street  : "19/2 West Brooklyn",
            district: "Brooklyn",
            city    : "New York",
            state   : "NY"
        },
        desig: "Associate Writer",
        doj  : "08/21/1992",
        salary: {
            base : 32732,
            suppl: 17048,
            bonus: 9756,
            inc1 : 5552,
            inc2 : 4522
        }
    }
]


function sum(arr) {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s
}

const arr = employees.map(emp => ({
    EMPNAME: emp.name.first + ' ' + emp.name.last,
    EMPDESIG: emp.desig,
    EMPSAL: sum([
        emp.salary.base,
        emp.salary.suppl,
        emp.salary.bonus,
        emp.salary.inc1,
        emp.salary.inc2
    ])
})).filter(emp => emp.EMPSAL < 100000)
console.log(
    arr
)