
// HTML Element Variables
var inputEl = document.querySelector(".movie-input");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = JSON.parse(localStorage.getItem("movies")) || [];
var genreName = localStorage.getItem("genre")
var rRecipeApiKey = "&apiKey=0c7c604f01a143d598df0735356390c3";
var rMovieApiKey = "apikey=84c248ca";

// Local Storage Function for Movie Search History
var historyStorage = function(name) {
    historyStorage.setItem("movies", name)


    // Search History Loop

    // Create Buttons for Each Search History Term
    
    // Append Buttons to History Div

    // Set TextContent for Button

};

// Local Storage Function for Genre
var genreStorage = function(genre) {
    localStorage.setItem("genre", genre)
};

// API Fetches
// Movie Poster Fetch
var getMoviePoster = function(movie) {
    var apiUrl = `http://www.omdbapi.com/?${rMovieApiKey}&t=superbad`;
    

    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var movieTitle = data.Title
        var movieGenre = data.Genre.split(',').pop()
        var moviePoster = data.Poster
        var moviePlot = data.Plot

        //set movie genre to searchhandler
        searchHandler(movieGenre)
        
        // movieName = movieTitle
    })
    // Alert modal user that fetch was not successful
    // pass response to movie poster display function
};
getMoviePoster()
//Recipe Fetch
// If Statement for Pairing Movie Genre with Ingredients

//Fetch
// var getRecipes = function(meal) {
//     var api = `https://api.spoonacular.com/recipes/random?number=3&tags=chinese` + rMovieApiKey;


//         fetch(api)
//         .then(function(response) {
            
//         //request as successful
//             return response.json();
//         })
//         .then(function(data){
//             for (let i = 0; i < data.recipes.length; i++){
//                 // Recipe name
//                 var recipeName = data.recipes[1].title

//                 // Food image
//                 var recipeImage = data.recipes[1].image

//                 // recipe link
//                 var recipeLink = data.recipes[0].sourceUrl

//                 // ingredient loop
//                 for (let ing = 0; ing < data.recipes[0].extendedIngredients.length; ing++) {
//                     var ingList = data.recipes[0].extendedIngredients[ing].name
//                     var ingamount = data.recipes[0].extendedIngredients[ing].amount
//                     var ingUnits = data.recipes[0].extendedIngredients[ing].measures.us.unitLong
//                     var ingShop = ingamount + ' ' + ingUnits
//                 }

//                 // instruction loop
//                 for (let inst = 0; inst < data.recipes[0].analyzedInstructions[0].steps.length; inst++){
//                     var cookSteps = data.recipes[0].analyzedInstructions[0].steps[inst].step
//                 }
//             }
//         })
        
// };
// getRecipes()
// Display Movie Poster
var displayPoster = function(moviedata) {

};

// Display Recipes
var displayRecipes = function(recipedata) {
    
};

    // Expand Recipe Size Hover

// // Global Function | Get Local Storage Names and Pass Into Functions
var searchHandler = function(genreValue) {
    // var searchItem = document.querySelector(".movie-input").value.trim();
    console.log(genreValue)
    // if (searchItem) {
    //     getMoviePoster(searchItem);
    //     historyStorage(searchItem);
    //     document.querySelector('.movie-input').value = ""
    // }
    
    if (genreValue) {
        // getRecipes(genreValue);
        genreStorage(genreValue)
    }
    

};

// //Event Listener for Submit Button
// submitBtnEl.addEventListener("click", searchHandler)
// //repopulate page after refresh
// window.addEventListener('load',
// function(){
//     if(movieName) {
//         getMoviePoster(movieName)
//         historyStorage(movieName)
//         document.querySelector('.movie-input').value = ""
//     } else {
//         localStorage.setItem("movies", "");
//     }

//     if(genreName) {
//         getRecipes(genreName)
//     } else {
//         localStorage.setItem("genre", "");
//     }

// }, false);

