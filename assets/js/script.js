
// HTML Element Variables
var inputEl = document.querySelector(".movie-input");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = JSON.parse(localStorage.getItem("movies"));
var genreName = JSON.parse(localStorage.getItem("genre"));
var movieApiKey = "";
var recipeApiKey = "";

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
var getMoviePoster = function(name) {
    var apiUrl = "";
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
var getRecipes = function() {
    var api = "";
        fetch(apiUrl).then(function(reponse) {
        //request as successful
            if(response.ok) {
                response.json().then(function(recipedata) {
                    displayRecipes(recipedata);
                })
            }
        })
    };

// Display Movie Poster
var displayPoster = function(moviedata) {

};

// Display Recipes
var displayRecipes = function(recipedata) {
    
};

    // Expand Recipe Size Hover

// Global Function | Get Local Storage Names and Pass Into Functions
var searchHandler = function() {
    var searchItem = document.querySelector(".movie-input").value.trim();

    if (searchItem) {
        getMoviePoster(searchItem);
        historyStorage(searchItem);
    }
    else {
        localStorage.setItem("movies", "");
    }
    if (genreName) {
        getRecipes(genreName);
    }
    else {
        localStorage.setItem("genre", "");
    }

};

//Event Listener for Submit Button

//Event Listeners for Past Movie Name Search Buttons

