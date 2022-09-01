const API_KEY = 'api_key=c4b6c26525160b9cf4ef16959d2cfe50';
const baseURL = 'https://api.themoviedb.org/3';
const img_url = 'https://image.tmdb.org/t/p/w500';

const searchBar = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const searchBtn = document.querySelector('.search-btn');
const movieSearchBox = document.getElementById('movie-search-box');

function findMovies() {
    if(searchBar.value.length == 0) {
        searchList.innerHTML = '';
        searchBoxBoderTrigger();
        return;
    };

    fetch(`${baseURL+'/search/movie?'+API_KEY+'&query='+searchBar.value}`)
    .then(res => res.json()).then(searchResult => {
        // console.log(searchResult.results);
        if(searchResult.results.length !== 0) {
            showSearchResult(searchResult.results);
        }
    });
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


function showSearchResult(data) {
    searchList.innerHTML = '';
    searchBoxBoderTrigger();
    data.forEach(element => {
        const {title, poster_path, popularity, release_date, id} = element;
        console.log(title);
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = id; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');  
        let moviePoster = (poster_path) ? (img_url+poster_path) : "https://cdn1.iconfinder.com/data/icons/modifiers-add-on-1-1/48/Sed-24-512.png";
        
        
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail shadow-md">
            <img class="rounded" src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${title}</h3>
            <p>${release_date}</p>
            <p>${popularity}</p>
        </div>
        <p class="heart"><i class="fa-solid fa-heart text-2xl"></i></p>
        `;
        
        searchList.appendChild(movieListItem);
    });
}

function loadOnClickMovieDetails() {
    
}