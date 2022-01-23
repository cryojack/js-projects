window.addEventListener('load', function () {
    const black = "rgb(63, 59, 59)";
    const white = "white";
    const body          = document.querySelector("body");
    const heading       = document.querySelector(".heading h1");
    const caption       = document.querySelector(".caption h4");
    const themeChanger  = document.querySelector(".theme-change");

    function changeTheme() {
        if(!themeChanger.classList.contains("dark")) {
            themeChanger.classList.add("dark");
            themeChanger.classList.remove("light");
            themeChanger.innerHTML = "Light";
            body.style.backgroundColor = black;
            heading.style.color = white;
            caption.style.color = white;
        } else {
            themeChanger.classList.remove("dark")
            themeChanger.classList.add("light");
            themeChanger.innerHTML = "Dark"
            body.style.backgroundColor = white;
            heading.style.color = black;
            caption.style.color = black;
        }
    }

    themeChanger.addEventListener('click', changeTheme);

});