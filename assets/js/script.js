
// HTML Element Variables
var inputEl = document.querySelector(".movie-input");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = JSON.parse(localStorage.getItem("movies"));
var genreName = JSON.parse(localStorage.getItem("genre"));
var rMovieApiKey = "&apiKey=0c7c604f01a143d598df0735356390c3";
var rRecipeApiKey = "apikey=84c248ca";

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
    var apiUrl = `http://www.omdbapi.com/?${rRecipeApiKey}&t=${movie}`;


    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok) {
            response.json().then(function(moviedata) {
                // pass response to movie poster display function
                displayPoster(moviedata);
            });
        } else {
            // Alert modal user that fetch was not successful
        }
    });
};

//Recipe Fetch
// If Statement for Pairing Movie Genre with Ingredients

//Fetch
var getRecipes = function(meal) {
    var api = `https://api.spoonacular.com/recipes/random?number=3&tags=`+ meal + rMovieApiKey;
    console.log(api)
        fetch(api).then(function(response) {
        //request as successful
            if(response.ok) {
                response.json().then(function(recipedata) {
                    displayRecipes(recipedata);
                })
            }
        })
        
};
getRecipes()
// Display Movie Poster
var displayPoster = function(moviedata) {

};

// Display Recipes
var displayRecipes = function(recipedata) {
    
};

    // Expand Recipe Size Hover

// Global Function | Get Local Storage Names and Pass Into Functions
var searchHandler = function(genreValue) {
    var searchItem = document.querySelector(".movie-input").value.trim();

    if (searchItem) {
        getMoviePoster(searchItem);
        historyStorage(searchItem);
        document.querySelector('.movie-input').value = ""
    }
    
    if (genreValue) {
        getRecipes(genreValue);
    }
    

};

//Event Listener for Submit Button
submitBtnEl.addEventListener("click", searchHandler)
//repopulate page after refresh
window.addEventListener('load',
function(){
    if(movieName) {
        getMoviePoster(movieName)
        historyStorage(movieName)
        document.querySelector('.movie-input').value = ""
    } else {
        localStorage.setItem("movies", "");
    }

    if(genreName) {
        getRecipes(genreName)
    } else {
        localStorage.setItem("genre", "");
    }

}, false);

