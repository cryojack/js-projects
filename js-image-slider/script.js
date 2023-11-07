const carouselSlide = document.querySelector(".carousel-slide")
const imgSlides = document.querySelectorAll("img.slide")
const nextBttn = document.getElementById("next")
const prevBttn = document.getElementById("prev")

let imgSize = imgSlides[0].clientWidth
let counter = 1
carouselSlide.style.transform = `translateX(${imgSize * counter}px)`

// prevBttn.addEventListener("click", prevSlide)
// nextBttn.addEventListener("click", nextSlide)
