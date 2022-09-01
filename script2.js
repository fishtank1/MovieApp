const searchBar = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const searchBtn = document.querySelector('.search-btn');
const movieSearchBox = document.getElementById('movie-search-box');
const resultGrid = document.getElementById('result-flex');

function findMovies() {
    if(searchBar.value.length == 0) {
        searchList.innerHTML = '';
        searchBoxBoderTrigger();
        return;
    };
    
    fetch(`https://omdbapi.com/?s=${searchBar.value}&page=1&apikey=94397865`)
    .then(res => res.json()).then(searchResult => {
        if(searchResult.Search == undefined)
            console.log(searchResult.Search);
        
        else if(searchResult.Search.length !== 0) {
            showSearchResult(searchResult.Search);
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
        const {Title, Poster, Year, imdbID} = element;
        console.log(Title);
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');  
        let moviePoster;
        if(Poster != "N/A") {
            moviePoster = Poster;
        } else {
            moviePoster = "https://cdn-icons-png.flaticon.com/128/2748/2748558.png";
        }
        
        
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail shadow-md">
            <img class="rounded" src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${Title}</h3>
            <p>${Year}</p>
        </div>
        <p class="heart"><i class="fa-solid fa-heart text-2xl"></i></p>
        `;
        
        searchList.appendChild(movieListItem);
    });
    loadOnClickMovieDetails()
}

function loadOnClickMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            console.log(movie.dataset.id);
            fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=94397865`)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector('.nav-brand-logo').style.display = "flex";
                document.querySelector('.settings').style.display = "none";
                document.querySelector('.searchbar-logo').style.display = "none";
                document.querySelector('.search-implement').style.display = "none";
                displayMovieDetails(data);
            });
        });
    });
}


function displayMovieDetails(details){
    const {Title, Awards, Language, Genre, Year, Released, Poster, Rated, Writer, Actors, Plot} = details;
    resultGrid.innerHTML = `
    <div id = "movie-image">
        <img src = "${(Poster != "N/A") ? Poster : "notfound.png"}" alt = "movie poster" class="rounded shadow-2xl">
    </div>
    <div id = "movie-info">
        <h1 class = "movie-title">${Title}</h1>
	  <p>Year: ${Year} &nbsp;<span class=" bg-yellow-500 p-1 rounded">Rating: ${Rated}</span> &nbsp;Released: ${Released}</p>

	  <p class="rounded shadow-md bg-zinc-700 p-1.5 w-fit"><span>Genere:</span> ${Genre}</p>

	  <p><span>Writer:</span> ${Writer}</p>
	  <p><span>Actors:</span> ${Actors}</p>
        <p><span>Plot:</span> ${Plot}</p>
	  <p class="italic mv-lang"><span>Language: </span>${Language}</p>
	  <p><span><i class="fa-solid fa-award"></i></span>&nbsp;&nbsp;  ${Awards}</p>
    </div>
    `;
    searchBoxBoderTrigger();
}

document.querySelector('.nav-brand-logo').addEventListener('click', () => {
    document.querySelector('.settings').style.display = "flex";
    document.querySelector('.nav-brand-logo').style.display = "none";
    document.querySelector('.searchbar-logo').style.display = "flex";
    document.querySelector('.search-implement').style.display = "flex";
    resultGrid.innerHTML = '';
});