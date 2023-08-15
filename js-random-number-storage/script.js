// Get the elements into which we will add cards and the button to generate and undo
const listbox = document.querySelector('div.listbox')
const generate = document.getElementById('generate')
const undo = document.getElementById('undo')

// Disable the Undo button for now
undo.setAttribute('disabled',true)

// Get the min max value ranges for random numbers
const min = document.getElementById('min')
const max = document.getElementById('max')

let listOfCards = []            // Store all random numbers in order they are created
let listOfRemovedCards = []     // Store removed cards as objects with index position and number

let cardIndex = 0               // Variable to store current index, to be used for card index

function formatDateTime(datetime) {
    // Constants to define days and months
    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    // Date formatting here
    const date = datetime.getDate()
    const day = DAYS[datetime.getDay()]
    const month = MONTHS[datetime.getMonth()]
    const year = datetime.getFullYear()
    let d = ''

    // Date day suffix
    if (date > 3 && date < 21) {
        d = 'th'
    }
    switch (date % 10) {
        case 1:  d = 'st'
        case 2:  d = 'nd'
        case 3:  d = 'rd'
        default: d = 'th'
    }

    // Time formatting here
    const hours = datetime.getHours() > 9 ? datetime.getHours() : '0' + datetime.getHours()
    const minutes = datetime.getMinutes() > 9 ? datetime.getMinutes() : '0' + datetime.getMinutes()
    const seconds = datetime.getSeconds() > 9 ? datetime.getSeconds() : '0' + datetime.getSeconds()

    // Join them all together to return
    const fullDate = day +', '+ date + d +' of '+ month +' ' + year  + ', at ' + hours +':'+ minutes +':'+ seconds

    return fullDate
}

function getRandomNumber(min,max) {
    if(min >= max) return undefined

    let randNum = Math.floor(Math.random() * (max - min + 1) + min)
    let duplicates = 0
    // We need to check in both arrays for duplicate numbers
    listOfCards.forEach(obj => {
        if(obj.id === randNum) duplicates++
    })

    listOfRemovedCards.forEach(obj => {
        if(obj.id === randNum) duplicates++
    })

    // If a duplicate is found, rerun
    if(duplicates > 0 || randNum < 1) {
        randNum = Math.floor(Math.random() * (max - min + 1) + min)
    } else {
        return randNum
    }
}

function createCard() {
    const datetime = formatDateTime(new Date())             // Get date
    const id = getRandomNumber(min.value,max.value)         // Get random number

    if(id === undefined || datetime === undefined) {
        return
    } else {
        // Push the newly created card into array and update view, increment current card index
        listOfCards.push({'index':cardIndex,'id':id,'datetime':datetime})
        updateCardView()
        cardIndex++
    }
}

function removeCard(cardId) {
    let id = Number(cardId.split('-')[1])
    let index = 0
    let datetime = ''

    if(id === undefined || id === null) return

    listOfCards.forEach(obj => {
        if(obj.id === id) {
            index = obj.index
            datetime = obj.datetime
        }
    })

    // listOfCards = listOfCards.filter(obj => { return obj.id !== id })
    listOfCards[index] = ''
    listOfRemovedCards.push({'index':index,'id':id,'datetime':datetime})
    updateCardView()
}

function restoreCard() {
    const cardToRestore = listOfRemovedCards[listOfRemovedCards.length - 1]
    if(cardToRestore === undefined || listOfRemovedCards.length < 1) return

    const restoredCardIndex = cardToRestore.index
    const restoredCardId = cardToRestore.id
    const restoredCardDateTime = cardToRestore.datetime
    
    listOfRemovedCards.pop()
    listOfCards[restoredCardIndex] = {'index':restoredCardIndex,'id':restoredCardId,'datetime':restoredCardDateTime}
    // if(listOfCards.length < 1) {
    //     listOfCards.push({'index':restoredCardIndex,'id':restoredCardId,'datetime':restoredCardDateTime})
    // } else {
    //     for (let i = 0; i < listOfCards.length; i++) {
    //         const obj = listOfCards[i]
    //         if(restoredCardIndex < obj.index) {
    //             listOfCards.splice(i,0,{'index':restoredCardIndex,'id':restoredCardId,'datetime':restoredCardDateTime})
    //             break
    //         }
    //     }
    // }
    updateCardView()
}

function updateCardView() {
    let cards = ''
    listOfCards.forEach(obj => {
        if(obj !== '') {
            cards +=
            `<div class="card" id="card-${obj.id}">
                <button class="removecard" onclick="removeCard(document.getElementById('card-${obj.id}').id)">X</button>
                <p class="number">${obj.id}</p>
                <p class="datetime">Generated on ${obj.datetime}</p>
            </div>`
        }
    })
    listbox.innerHTML = ''
    listbox.innerHTML += cards
    enableUndoButton()
}

function enableUndoButton() {
    if(listOfRemovedCards.length > 0) {
        undo.removeAttribute('disabled')
    } else {
        undo.setAttribute('disabled',true)
    }
}


generate.addEventListener('click', createCard)
undo.addEventListener('click',restoreCard)