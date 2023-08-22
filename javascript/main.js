//SETTING VARIABLES
let UserInput = document.querySelector(".input-area");
let serachButton = document.querySelector(".search-btn");
let result = document.querySelector(".result-area");
//ADD EVENTLISTNER ON SEARCH BUTTON
serachButton.addEventListener('click', getRecipes);
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
}

function displayRecipes(recipes) {
    if (recipes.meals == null) {
        result.innerHTML = "No Available Recipes";
        return
    }

    recipes.meals.forEach((recipe) => {
        result.innerHTML += `<div class="card">
        <div class="card-img">
            <img src="${recipe.strMealThumb}" alt="">
        </div>
        <div class="card-info">
            <h3>${recipe.strMeal}</h3>
        <button><a href="#">Get recipe</a></button>
        </div>
    </div>`  
    });

}