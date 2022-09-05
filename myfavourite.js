function makeFavList(params) {
    if(localStorage.length == 0) {
        movies = [];
        movies.push(params);
        localStorage.setItem("movies", JSON.stringify(movies));
    } else {
        movies = JSON.parse(localStorage.getItem("movies"));
        movies.push(params);
        localStorage.setItem("movies", JSON.stringify(movies));
    }    
}


function showFavList(){
    let arr = JSON.parse(localStorage.getItem("movies"));
    // console.log(arr);
    if(arr == null || arr.length == 0) {
        window.alert("You've not added any movie into the list yet.");
        return;
    }

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
        document.querySelector('#favourite-result').style.opacity = "1";
    }
}

function exitFavPage() {
    let arr = JSON.parse(localStorage.getItem("movies"));
    if(arr == null || arr.length == 0) {
        window.alert("You've not added any movie into the list yet.");
        return;
    }
    document.querySelector('#favourite-result').style.opacity = "0";
    document.querySelector('.fav-list').innerHTML = "";
}

function clearList() {
    exitFavPage();
    localStorage.clear();
}

function removeMovie(idx) {
    let arr = JSON.parse(localStorage.getItem("movies"));
    arr.splice(idx, 1);
    localStorage.setItem("movies", JSON.stringify(arr));
    document.querySelector('.fav-list').innerHTML = "";
    if(arr.length == 0) {
        document.querySelector('.fav-list').innerHTML = "";
        document.querySelector('#favourite-result').style.opacity = "0";
        exitFavPage();
    }
    showFavList();
}