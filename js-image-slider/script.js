const imgSlides = document.querySelectorAll("img.slide")
const nextBttn = document.getElementById("next")
const prevBttn = document.getElementById("prev")

let count = 0

imgSlides.forEach((img, index) => {
    img.style.left = `${index * 100}%`
})

function nextSlide() {
    if (count >= imgSlides.length - 1) {
        count = 0
    } else {
        count++
    }
    changeSlide()
}

function prevSlide() {
    if (count <= 0) {
        count = imgSlides.length - 1
    } else {
        count--
    }
    changeSlide()
}

function changeSlide() {
    imgSlides.forEach((img) => {
        img.style.transform = `translateX(-${count * 100}%)`
    })
}

nextBttn.addEventListener("click", nextSlide)
prevBttn.addEventListener("click", prevSlide)
