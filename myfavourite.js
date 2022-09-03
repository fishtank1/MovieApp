let favisClicked = false, tileisClicked = false;
let heartBTN = document.querySelector('.fav');

heartBTN.addEventListener('click', () => {
    if(favisClicked == false && localStorage == null) {
        window.alert('No movies added to the list or if added then please reload the page and click again.');
        return;
    }
    else if(favisClicked == false) {
        // Displays favourites 
        favisClicked = true;
        resultGrid.innerHTML = '';
        heartBTN.style.color = "red";
        document.querySelector('.settings').style.display = "none";
        document.querySelector('#favourite-result').style.display = "flex";
        document.querySelector('.search-implement').style.display = 'none';
        document.querySelector('.nav-brand-logo').style.opacity = '1';
        document.getElementById('favourite-result').style.opacity = '1';
    } else {
        // Hides favourites
        favisClicked = false;
        heartBTN.style.color = "white";
        document.querySelector('.settings').style.display = "flex";
        document.querySelector('.nav-brand-logo').style.opacity = '0';
        document.getElementById('favourite-result').style.opacity = '0';
        document.querySelector('.searchbar-logo').style.display = "flex";
        document.querySelector('#favourite-result').style.display = "none";
        document.querySelector('.search-implement').style.display = 'flex';
    }
});

let arr = JSON.parse(localStorage.getItem("movies"));
console.log(JSON.parse(localStorage.getItem("movies")))
for (var i = 0; i < arr.length; i++) {
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = i;
    movieListItem.classList.add('fav-res-img');
    movieListItem.style.backgroundImage = `url(${arr[i]})`;
    movieListItem.classList.add('rounded-lg');
    movieListItem.classList.add('flex');
    movieListItem.classList.add('items-end');
    movieListItem.innerHTML = `
    <button class="remove-fav" onclick="removeMovie(${i})">
        <p class="shadow-2xl p-2"><i class="fa-solid fa-trash text-xl"></i></p>
    </button>
    `;
    document.querySelector('.fav-list').appendChild(movieListItem);
}

function removeMovie(idx) {
    arr.splice(idx, 1);
    localStorage.setItem("movies", JSON.stringify(arr));
    console.log(localStorage);
}

document.querySelector('.clear-all').addEventListener('click', () => {
    localStorage.clear();
});