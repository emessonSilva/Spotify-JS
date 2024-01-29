const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            const filteredResults = filterResultsByFirstLetter(result, searchTerm);
            displayResults(filteredResults);
        })
        .catch((error) => console.error('Error fetching data:', error));
}

function filterResultsByFirstLetter(results, searchTerm) {
    if (!searchTerm) {
        return results; 
    }

    const searchTermLower = searchTerm.toLowerCase();
    return results.filter(artist => artist.name.toLowerCase().startsWith(searchTermLower));
}


function displayResults(result) {
    resultPlaylist.classList.add('hidden')
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})