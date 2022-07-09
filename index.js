// The Open Movie Database https://www.omdbapi.com
// My API key: c818f7cd

const form = document.getElementById('search-movie-form')
const searchInput = document.getElementById('search-movie-input')
const movieSearchlist = document.getElementById('movie-searchlist-container')

const saveMovieInfo = async (movieId) => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=c818f7cd&i=${movieId}`)
    const data = await res.json()
    localStorage.setItem(movieId, JSON.stringify(data))
}

function checkWatchlist(movieiD) {
    if (localStorage.getItem(movieiD)){
        watchlistStr = `remove-movie'><span> - </span>Remove`
    } else {
        watchlistStr = `add-movie'><span> + </span>Watchlist`
    }
    return watchlistStr
}

function modifyWatchlist() {
    const watchlist = document.getElementsByClassName('watchlist-btn')
    for (const movie of watchlist) {
        movie.addEventListener('click', function(){
            if (movie.classList.contains('add-movie')) {
                movie.classList.replace('add-movie','remove-movie')
                movie.innerHTML = `
                <span> - </span>Remove
                `
                // console.log(movie.id)
                saveMovieInfo(movie.id)
            } else {
                movie.classList.replace('remove-movie', 'add-movie')
                movie.innerHTML = `
                <span> + </span>Watchlist
            `
            localStorage.removeItem(movie.id)
            }
        })
    }
}

const renderMovies = async (moviesIdArray) => {
    let moviesResult = ''
    for (const movieId of moviesIdArray) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=c818f7cd&i=${movieId}`)
        const data = await res.json()
        const { Title, Runtime, Genre, Poster, imdbRating, Plot, imdbID } = data
        if (!(Plot === 'N/A' || Poster === 'N/A'))

        moviesResult += `
        <div class='movie'>
        <div class='movie-info'>
            <div class='movie-main-info'>
                <h2 class='movie-title'>${Title}</h2>
                <p class='movie-rating'>${imdbRating}</p>
            </div>
            <div class='movie-secondary-info'>
                <p class='movie-runtime'>${Runtime}</p>
                <p class='movie-genre'>${Genre}</p>
                <button id='${imdbID}' class='watchlist-btn ${checkWatchlist(imdbID)}</button>
            </div>
            <p class='movie-plot'>${Plot}</p>
        </div>
        <img class='movie-poster' src='${Poster}' alt=''>
    </div>
    `
    }
    movieSearchlist.innerHTML = moviesResult
    modifyWatchlist()
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    movieSearchlist.innerHTML = ''
    const searchTitle = searchInput.value.replace(' ', '+')
    searchInput.value = ''
    const res = await fetch(`http://www.omdbapi.com/?apikey=c818f7cd&s=${searchTitle}`)
    const data = await res.json()
    if (data.Response === 'True') {
        let moviesIdArray = []
        for (const movie of data.Search) {
            moviesIdArray.push(movie.imdbID)
        }
        renderMovies(moviesIdArray)
    } else {
        movieSearchlist.innerHTML = `
            <p class='light-text'>Unable to find what you’re looking for. Please try another search.</p>
        `
    }
})