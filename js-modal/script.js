var modalButton = document.querySelector(".modal-button");
var closeButton = document.querySelector(".close");
var modalBG = document.querySelector(".modal-bg");

modalButton.addEventListener('click', function () {
    modalBG.classList.add("modal-bg-active");
});

closeButton.addEventListener('click', function () {
    modalBG.classList.remove("modal-bg-active");
});