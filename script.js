let favMeals = JSON.parse(localStorage.getItem("favmeal")) || []
favMeals.forEach(addMealHtml)
let randomMealForLike;
const getRandomMealFn = getRandomMeal();
const reloadRandomMeal = document.getElementById("random-meal-reload");
reloadRandomMeal.addEventListener("click", () => getRandomMeal());


async function getRandomMeal() {
    const randomMealHtml = document.getElementById("random-meal-container");
    randomMealHtml.innerHTML = `<span id="loader" class="loader"></span>`
    const randomMealLoader = document.getElementById("random-meal-reload");
    randomMealLoader.style.display = "none";
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const randomMeal = await resp.json();

    const getRandomMeal = randomMeal.meals[0]

    const mealImage = new Image();
    mealImage.src = getRandomMeal.strMealThumb;

    



    mealImage.onload = function () {
        const mealHTML = `
            <div id="random-meal-img-title">
                <img src="${getRandomMeal.strMealThumb}" alt="" id="random-meal-img">
                <h3 class="random-meal-et">
                    RANDOM MEAL
                </h3>
            </div>
            <div class="random-meal-title-container">
                <h2 id="random-meal-title">
                    ${getRandomMeal.strMeal}
                </h2>
                <i onclick=likeMeal() id="random-meal-like" class="fa-xl fa-solid fa-heart"></i>
            </div>
        `;

        randomMealHtml.innerHTML = mealHTML;

        randomMealForLike = getRandomMeal;

        const likeButton = document.getElementById("random-meal-like");
        const foundMeal = getIdForMeals(randomMealForLike);

        if(foundMeal !== undefined){
            likeButton.classList.add("active")
        }
        randomMealLoader.style.display = "block";
    };

    
}




function likeMeal() {
    const likeButton = document.getElementById("random-meal-like");

    if (likeButton.classList.contains("active")) {
        removeLS(randomMealForLike.idMeal);

    } else {
        likeButton.classList.add("active")
        addMealLS(randomMealForLike);
    
    }

}

function addMealHtml(meal) {

    const favMeals = document.getElementById("fav-meals")


    const newMealDiv = document.createElement("div");
    newMealDiv.className = "fav-meals-box";
    
    const newMealHTML = `
        <img src="${meal.strMealThumb}" alt="" class="fav-meals-img">
        <h4 class="fav-meals-text">${meal.strMeal}</h4>
        <button id="fav-meals-x" onclick="removeLS('${meal.idMeal}')"><i class="fa-solid fa-rectangle-xmark"></i></button>
    `;

    newMealDiv.innerHTML = newMealHTML;

    favMeals.insertAdjacentElement("afterbegin", newMealDiv);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();


    localStorage.setItem("favmeal", JSON.stringify([...mealIds, mealId]));

    addMealHtml(mealId);
}

function removeLS(mealId) {
    const mealIds = getMealsLS();
    const favMealsContainer = document.getElementById("fav-meals");
    const likeButton = document.getElementById("random-meal-like");

    const updatedMeals = mealIds.filter(id => id.idMeal !== mealId);

    localStorage.setItem("favmeal", JSON.stringify(updatedMeals));

    favMealsContainer.innerHTML = "";
    if(likeButton.classList.contains("active")){
        likeButton.classList.remove("active");
    }
    updatedMeals.forEach(addMealHtml);
}


function getIdForMeals(mealId){
    const mealIds = getMealsLS();

    const foundMeal = mealIds.find(el => el.idMeal === mealId.idMeal)
    
    return foundMeal;
}



function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("favmeal"));


    return mealIds === null ? [] : mealIds;
}

async function getMealById(id) {
    const mealById = await fetch("www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
}

async function getMealBySearch(term) {
    const mealBySearch = await fetch(" www.themealdb.com/api/json/v1/1/search.php?s=" + term)
}