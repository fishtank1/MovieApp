// Search API Link: http://www.omdbapi.com/?s=spiderman&apikey=94397865
// Details API Link: http://www.omdbapi.com/?i=tt2705436&apikey=94397865

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const searchBtn = document.querySelector('.search-btn');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=94397865`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
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

function findMovies(){
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
        // fetch(`http://www.omdbapi.com/?i=${movies[idx].imdbID}&apikey=94397865`)
        // .then((response) => response.json())
        // .then((data) => {
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
                </div>
                `;
            // });

        // movieListItem.innerHTML = `
        // <div class = "search-item-thumbnail shadow-md">
        //     <img class="rounded" src = "${moviePoster}">
        // </div>
        // <div class = "search-item-info">
        //     <h3>${movies[idx].Title}</h3>
        //     <p>${movies[idx].Year}</p>
        //     <p>${data.Actors}</p>
        // </div>
        // `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}