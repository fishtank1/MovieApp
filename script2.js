const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const searchBtn = document.querySelector('.search-btn');
const resultGrid = document.getElementById('result-flex');

function loadMovies(searchTerm) {
    // console.log('Enter this file');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=94397865`, true);
    xhr.onload = async function () {
        if(this.status == 200) {
            displayMovieList(JSON.parse(this.responseText).Search);
        }
    }

    xhr.send();
}

function searchBoxBoderTrigger() {
    if(movieSearchBox.value.length > 0) {
        movieSearchBox.style.borderBottomLeftRadius = "0px";
        searchBtn.style.borderBottomRightRadius = "0px";    
    } else {
        movieSearchBox.style.borderBottomLeftRadius = "25px";
        searchBtn.style.borderBottomRightRadius = "25px";
    }
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}


function displayMovieList(movies){
    searchBoxBoderTrigger();
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        
        // Hits another API where Actors working in the film are stored
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://www.omdbapi.com/?i=${movies[idx].imdbID}&apikey=94397865`, true);
        xhr.onload = function () {
            let actors = JSON.parse(this.responseText).Actors;
            if(movies[idx].Poster != "N/A")
                moviePoster = movies[idx].Poster;
            else 
                    moviePoster = "notfound.png";
                
            movieListItem.innerHTML = `
                <div class = "search-item-thumbnail shadow-md">
                    <img class="rounded" src = "${moviePoster}">
                </div>
                <div class = "search-item-info">
                    <h3>${movies[idx].Title}</h3>
                    <p>${movies[idx].Year}</p>
                    <p>${actors}</p>
                </div>
                <p class="heart"><i class="fa-solid fa-heart text-2xl"></i></p>
            `;
        }

        xhr.send();
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}


function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`, true);
            xhr.onload = function () {
                const movieDetails = JSON.parse(this.responseText);
                document.querySelector('.nav-brand-logo').style.display = "flex";
                document.querySelector('.settings').style.display = "none";
                document.querySelector('.searchbar-logo').style.display = "none";
                displayMovieDetails(movieDetails);
            }

            xhr.send();
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div id = "movie-image">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "notfound.png"}" alt = "movie poster" class="rounded shadow-2xl">
    </div>
    <div id = "movie-info">
        <h1 class = "movie-title">${details.Title}</h1>
	  <p>Year: ${details.Year} &nbsp;<span class=" bg-yellow-500 p-1 rounded">Rating: ${details.Rated}</span> &nbsp;Released: ${details.Released}</p>

	  <p class="rounded shadow-md bg-zinc-700 p-1.5 w-fit"><span>Genere:</span> ${details.Genre}</p>

	  <p><span>Writer:</span> ${details.Writer}</p>
	  <p><span>Actors:</span> ${details.Actors}</p>
        <p><span>Plot:</span> ${details.Plot}</p>
	  <p class="italic mv-lang"><span>Language: </span>${details.Language}</p>
	  <p><span><i class="fa-solid fa-award"></i></span>&nbsp;&nbsp;  ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        movieSearchBox.value = "";
        movieSearchBox.placeholder = "Search IMDB"
        movieSearchBox.style.borderBottomLeftRadius = "25px";
        searchBtn.style.borderBottomRightRadius = "25px";
        searchList.classList.add('hide-search-list');
    }
});

// After serach on top nav bar logo hides when clicked
document.querySelector('.nav-brand-logo').addEventListener('click', () => {
    document.querySelector('.settings').style.display = "flex";
    document.querySelector('.nav-brand-logo').style.display = "none";
    document.querySelector('.searchbar-logo').style.display = "flex";
    resultGrid.innerHTML = '';
});

