//SETTING VARIABLES
let UserInput = document.querySelector(".input-area");
let searchButton = document.querySelector(".search-btn");
let result = document.querySelector(".result-area");
let recipeInstructions = document.querySelector(".recipe-instructions");
let image = document.querySelector(".main-img");
let noResults = document.querySelector(".no-results");

//EVENTS
searchButton.addEventListener('click', getRecipes);
result.addEventListener('click', getRecipeDetails);
recipeInstructions.addEventListener('click', closeRecipeDetails);
// searchButton.addEventListener('click', removeImg);

// //REMOVE MAIN IMAGE
// function removeImg() {
//     image.innerHTML = "";
// }

//FUNCTION FOR FETCHING API AND MATCHING USER VALUE
function getRecipes() {
    let searchTerm = UserInput.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`;

    //FETCH API
    fetch(apiUrl)
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((data) => {
        displayRecipes(data);
    })
    searchButton.addEventListener('click', emptyInput());
    function emptyInput() {
    UserInput.value = "";
}
}

function displayRecipes(recipes) {
    result.innerHTML = "";
    if (recipes.meals == null) {
        result.innerHTML = `<div class="main-img">
        <img src="./images/luisa-brimble-vIm26fn_QKg-unsplash.jpg" alt="">
        <div class="no-results">No Results Found! <br> Please use another Search Term!</div>
    </div>`;
        return
    }


    recipes.meals.forEach((recipe) => {
        result.innerHTML += `<div class="card">
        <div class="card-img">
            <img src="${recipe.strMealThumb}" alt="">
        </div>
        <div class="card-info">
            <h3>${recipe.strMeal}</h3>
        <button><a href="#" class= "recipe-btn" data-id=${recipe.idMeal}>Get recipe</a></button>
        </div>
    </div>`  
    });
}


function getRecipeDetails(e) {
    if(e.target.classList.contains('recipe-btn')) {
        let id = e.target.getAttribute('data-id');
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

         //FETCH API
    fetch(apiUrl)
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((data) => {
        displayRecipesDetails(data);
    })
    }
}

function displayRecipesDetails(recipeItem) {
    recipeInstructions.innerHTML = "";
    let item = recipeItem.meals[0];
    recipeInstructions.classList.remove('display');

    recipeInstructions.innerHTML = `<i class="fa-solid fa-xmark"></i>
        <h2>${item.strMeal}</h2>
        <p>Instructions:</p>
        <p>${item.strInstructions}</p>
     <a href="${item.strYoutube}">Watch video!</a>`;
}

function closeRecipeDetails(e) {
    if(e.target.classList.contains('fa-solid')) {
        e.target.parentElement.classList.add('display');
    }
}


