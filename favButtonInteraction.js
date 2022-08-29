let favBtn = document.querySelector('.heart');
let filledVal = false;

favBtn.addEventListener('click', () => {
    if(filledVal) {
        favBtn.style.color = "white";
        filledVal = false;
    } else {
        favBtn.style.color = "red";
        filledVal = true;
    }
});