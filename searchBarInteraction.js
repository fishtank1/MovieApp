let searchBar = document.querySelector('.search-query');
let searchBtn = document.querySelector('.search-btn');
let searchResult = document.getElementById('search-list');

function myFunction() {
    searchResult.style.display = "none";
    searchBar.placeholder = "Search for your movie"
    searchBar.style.borderBottomLeftRadius = "25px";
    searchBtn.style.borderBottomRightRadius = "25px";
}

// Listner to handle enter key press
searchBar.addEventListener('keyup', myFunction);
document.addEventListener('keyup', myFunction);