let watchlistResult
const movieWatchlist = document.getElementById('movie-watchlist-container')

function renderWatchlist() {
    watchlistResult = ''
    for (const movieId of Object.keys(localStorage)) {
        const movieInfo = JSON.parse(localStorage.getItem(movieId))
        const { Title, Runtime, Genre, Poster, imdbRating, Plot, imdbID } = movieInfo
        watchlistResult += `
            <div class='movie'>
                <div class='movie-info'>
                    <div class='movie-main-info'>
                        <h2 class='movie-title'>${Title}</h2>
                        <p class='movie-rating'>${imdbRating}</p>
                    </div>
                    <div class='movie-secondary-info'>
                        <p class='movie-runtime'>${Runtime}</p>
                        <p class='movie-genre'>${Genre}</p>
                        <button id='${imdbID}' class='watchlist-btn remove-movie'><span> - </span>Remove</button>
                    </div>
                    <p class='movie-plot'>${Plot}</p>
                </div>
                <img class='movie-poster' src='${Poster}' alt=''>
            </div>
        `
        movieWatchlist.innerHTML = watchlistResult
    }
    removeMovies()
}

function removeMovies() {
    const watchlist = document.getElementsByClassName('watchlist-btn')
    for (const movie of watchlist) {
        movie.addEventListener('click', function(){
            localStorage.removeItem(movie.id)
            renderWatchlist()
        })
    }
}

renderWatchlist()