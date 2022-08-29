let searchBar = document.querySelector('.search-query');
let searchBtn = document.querySelector('.search-btn');
let searchResult = document.getElementById('search-list');

// Listner to handle search icon button press/click
searchBtn.addEventListener('click', () => {
    if(searchBar.value != '') {
        searchBar.style.borderBottomLeftRadius = "0px";
        searchBtn.style.borderBottomRightRadius = "0px";
        searchResult.style.display = "block";
    } {
        searchBar.placeholder = "Search for your movie"
    }
});

// Listner to handle enter key press
searchBar.addEventListener('keyup',(event) => {
    if(event.keyCode == 13 && searchBar.value.length > 0) {
        searchResult.style.display = "block";
        searchBar.style.borderBottomLeftRadius = "0px";
        searchBtn.style.borderBottomRightRadius = "0px";
    } else {
        searchBar.placeholder = "Search for your movie"
    }
    
});