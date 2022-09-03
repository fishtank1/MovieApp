let favisClicked = false, tileisClicked = false;
let heartBTN = document.querySelector('.fav');

let arr = JSON.parse(localStorage.getItem("movies"));
console.log(JSON.parse(localStorage.getItem("movies")))
for (var i = 0; i < arr.length; i++) {
    let movieListItem = document.createElement('div');
    movieListItem.classList.add('fav-res-img');
    movieListItem.style.backgroundImage = `url(${arr[i]})`;
    movieListItem.classList.add('rounded-lg');
    movieListItem.classList.add('flex');
    movieListItem.classList.add('justify-center');
    movieListItem.classList.add('items-center');
    movieListItem.classList.add('del-btn');
    movieListItem.innerHTML = `
    <button class="remove-fav">
        <p class="shadow-2xl"><i class="fa-solid fa-trash text-8xl"></i></p>
    </button>
    `;
    document.querySelector('.fav-list').appendChild(movieListItem);
    // document.querySelector('.remove-fav').addEventListener('click', () => {
    //     console.log('clicked');
    // });

    function trashIconVisible() {
        document.querySelector('.remove-fav').style.opacity = 1;
    }
    
    function trashIconDim() {
        document.querySelector('.remove-fav').style.opacity = 0;
    }
    
    document.querySelector('.del-btn').addEventListener('mouseover', trashIconVisible);
    document.querySelector('.del-btn').addEventListener('mouseleave', trashIconDim);
}

// for (const key in localStorage) {
//     console.log(localStorage[key]);
//     let movieListItem = document.createElement('div');
//     movieListItem.classList.add('rounded-lg');
//     movieListItem.classList.add('fav-res-img');
//     movieListItem.classList.add('flex');
//     movieListItem.classList.add('justify-center');
//     movieListItem.classList.add('items-center');
//     movieListItem.classList.add('del-btn');
//     movieListItem.innerHTML = `
//     <button class="remove-fav">
//         <p class="shadow-2xl"><i class="fa-solid fa-trash text-8xl"></i></p>
//     </button>
//     `;
//     document.querySelector('.fav-list').appendChild(movieListItem); 
// }


heartBTN.addEventListener('click', () => {
    if(favisClicked == false) {
        // Displays favourites 
        favisClicked = true;
        resultGrid.innerHTML = '';
        heartBTN.style.color = "red";
        document.querySelector('.settings').style.display = "none";
        document.querySelector('.search-implement').style.display = 'none';
        document.querySelector('.nav-brand-logo').style.opacity = '1';
        document.getElementById('favourite-result').style.opacity = '1';
    } else {
        // Hides favourites
        favisClicked = false;
        heartBTN.style.color = "white";
        document.querySelector('.settings').style.display = "flex";
        document.querySelector('.search-implement').style.display = 'flex';
        document.querySelector('.nav-brand-logo').style.opacity = '0';
        document.getElementById('favourite-result').style.opacity = '0';
        document.querySelector('.searchbar-logo').style.display = "flex";
    }
});

// document.querySelector('.remove-fav').addEventListener('click', () => {
//     console.log('clicked');
// });

// function trashIconVisible() {
//     document.querySelector('.remove-fav').style.opacity = 1;
// }

// function trashIconDim() {
//     document.querySelector('.remove-fav').style.opacity = 0;
// }

// document.querySelector('.del-btn').addEventListener('mouseover', trashIconVisible);
// document.querySelector('.del-btn').addEventListener('mouseleave', trashIconDim);