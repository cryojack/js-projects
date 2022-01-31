window.addEventListener('load', function() {
    const imgbox = document.querySelector('.image-box img');
    const randomizer = document.getElementById('randomizer');
    const loader = document.querySelector('.load-indicator');
    const apikey = 'ecc12740-ae2a-49a7-9c1d-75d2a383bd59';
    const url = 'https://api.thecatapi.com/v1/images/search';


    function fetchKitteh() {
        loader.setAttribute('style', 'display:flex');
        fetch(url, {
            headers : {
                'Content-Type' : 'application/json',
                'x-api-key' : apikey
            }
        })
        .then(data => data.json())
        .then(data => {
            imgbox.removeAttribute('src');
            imgbox.setAttribute('src', data[0].url);
            loader.setAttribute('style', 'display:none');
        });
    }

    randomizer.addEventListener('click', fetchKitteh);

    
})