const scrollline = document.querySelector('div.scrollline')

function changeScrollLine(y) {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight

    if(y <= 0 || y >= total) return

    scrollline.style.width = Math.round((y/total) * 100) + '%'
}

window.addEventListener('scroll', () => {
    changeScrollLine(this.scrollY)
})