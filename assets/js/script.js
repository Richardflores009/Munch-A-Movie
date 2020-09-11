// HTML Element Variables
var inputEl = document.querySelector(".validate");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = localStorage.getItem("movies")
var recipeMainContainer = document.querySelector("#recipe-list")
//var genreName = JSON.parse(localStorage.getItem("genres"))
var rRecipeApiKey = "&apiKey=0c7c604f01a143d598df0735356390c3";
var rRecipeApiKey2 = "&apiKey=119f114f6e334171834908713fb964b8";
var rRecipeApiKey3 = "&apiKey=8496184c37164d1a9b0b16b42f58bc2b";
var rMovieApiKey = "apikey=84c248ca";

// Local Storage Function for Movie Search History
var historyStorage = function(name) {
    var movieStore = localStorage.setItem("movies", name)
   

    // Search History Loop

    // Create Buttons for Each Search History Term
    
    // Append Buttons to History Div

    // Set TextContent for Button

};

// Local Storage Function for Genre
var genreStorage = function(genre) {
    localStorage.setItem("genres", genre)
};

// API Fetches
// Movie Poster Fetch
var getMoviePoster = function(movie) {
    var tempCity = movie.replace(' ', '%20')
    var apiUrl = `http://www.omdbapi.com/?${rMovieApiKey}&t=${tempCity}`;
    console.log(apiUrl)

    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        return response.json();
    })
    .then(function (data) {
        
        var movieTitle = data.Title
        var movieGenre = data.Genre.split(' ').pop()
        var moviePoster = data.Poster
        var moviePlot = data.Plot
        
        genreStorage(movieGenre);

        // Pass Movie Title and Poster to displayPoster Function
        displayPoster(movieTitle, moviePoster);
    
        
        //set movie genre to searchhandler
        // searchHandler(movieGenre)
        

    })
    getRecipes();
    // Alert modal user that fetch was not successful
    // pass response to movie poster display function
};

//Recipe Fetch
// If Statement for Pairing Movie Genre with Ingredients

//Fetch
var getRecipes = function(meal) {
    var api = `https://api.spoonacular.com/recipes/random?number=3&tags=chinese` + rRecipeApiKey3;
        console.log(api);

        fetch(api)
        .then(function(response) {
            
        //request as successful
            return response.json();
        })
        .then(function(data){
            for (let i = 0; i < data.recipes.length; i++){
                var columnEl = document.createElement('div')
                columnEl.setAttribute('class', 'col s12')
                // columnHeaderEl = document.createElement('h4')
                // columnHeaderEl.textContent = "Recipes"
                // columnHeaderEl.setAttribute('class', 'column-header center')
                // columnEl.appendChild(columnHeaderEl)
                
                // all content will append to this then this will append to columnEl
                contentCardEl = document.createElement('div')
                contentCardEl.setAttribute('class', 'card horizontal box-shadow')
                columnEl.appendChild(contentCardEl)

                // Food image
                var recipeImage = data.recipes[i].image
                imageContainerEl = document.createElement('div')
                imageContainerEl.setAttribute('class', 'card-image')
                imageEl = document.createElement('img')
                imageEl.setAttribute('src', `${recipeImage}`)
                imageContainerEl.appendChild(imageEl)
                contentCardEl.appendChild(imageContainerEl)
                
                // Card stacked div holds all content left to append to contentCardEl
                cardStackedEl = document.createElement('div')
                cardStackedEl.setAttribute('class', 'card-content')
                contentCardEl.appendChild(cardStackedEl)

                 // Recipe name and info
                var recipeName = data.recipes[i].title
                recipeNameEl = document.createElement('h4')
                recipeNameEl.textContent = recipeName
                recipeNameEl.setAttribute('id', 'recipe-one-name')
                recipeInfoEl = document.createElement('p')
                recipeInfoEl.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, ipsam. Iusto ut minus recusandae nobis cumque quasi, inventore possimus consequuntur voluptates mollitia, odit corporis odio fugit, exercitationem totam temporibus ducimus"
                cardStackedEl.appendChild(recipeNameEl)
                cardStackedEl.appendChild(recipeInfoEl)

                // recipe link
                // var recipeLink = data.recipes[1].sourceUrl
                // recipeLinkContainerEl = document.createElement('div').href = recipeLink
                // recipeLinkContainerEl.setAttribute('class', 'card-action')
                // recipeLinkEl = document.createElement('a')
                // recipeLinkEl.setAttribute('class', 'waves-effect waves-light btn')
                // recipeLinkEl.setAttribute('target', '_blank')
                // recipeLinkContainerEl.appendChild(recipeLinkEl)
                // cardStackedEl.appendChild(recipeLinkContainerEl)
                // ingredient loop
                // for (let ing = 0; ing < data.recipes[0].extendedIngredients.length; ing++) {
                //     var ingList = data.recipes[0].extendedIngredients[ing].name
                //     var ingamount = data.recipes[0].extendedIngredients[ing].amount
                //     var ingUnits = data.recipes[0].extendedIngredients[ing].measures.us.unitLong
                //     var ingShop = ingamount + ' ' + ingUnits
                // }

                // // instruction loop
                // for (let inst = 0; inst < data.recipes[0].analyzedInstructions[0].steps.length; inst++){
                //     var cookSteps = data.recipes[0].analyzedInstructions[0].steps[inst].step
                // }

                // recipeMainContainer.appendChild(columnHeaderEl)
                recipeMainContainer.appendChild(columnEl)
            }
            // displayRecipes(recipeName, recipeImage, recipeLink);
        })
        
};


// Display Movie Poster
var displayPoster = function(movieTitle, moviePoster) {
    console.log(movieTitle);
    console.log(moviePoster);
    document.getElementById("movie-title").textContent = movieTitle;
    document.getElementById("poster-img").src = moviePoster;

};

// Display Recipes
// var displayRecipes = function(recipeName, recipeImage, recipeLink) {
//     console.log(recipeName[0]);
//     document.getElementById("recipe-one-name").textContent = recipeName;
//     document.getElementById("recipe-one").src = recipeImage;
//     document.getElementById('recipe-one-link').href = recipeLink;
    
// };

    // Expand Recipe Size Hover

// // Global Function | Get Local Storage Names and Pass Into Functions
var searchHandler = function() {
    event.preventDefault();
    //console.log(genreName);
    console.log(inputEl.value);

    // if (genreName) {
    //     // getRecipes(genreValue);
    //     // genreStorage(genreName)
        
    // }  else {
    //     localStorage.setItem('genres', "")
        
    // }
   

    if (inputEl.value) {
        getMoviePoster(inputEl.value);
        historyStorage(inputEl.value);
        //  document.querySelector('.movie-input').value = ""
    }
    
    
};

// //Event Listener for Submit Button
submitBtnEl.addEventListener("click", searchHandler)
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