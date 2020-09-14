// HTML Element Variables
var inputEl = document.querySelector(".validate");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var whateva = document.querySelector('#whatever-u-want');
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = localStorage.getItem("movies")
var recipeMainContainer = document.querySelector("#recipe-list");
var recipeHeader = document.querySelector("#recipes-header");
recipeHeader.style.display = "none";
var postercontainerEl = document.querySelector("#poster-container")
var rRecipeApiKey = "&apiKey=0c7c604f01a143d598df0735356390c3";
var rRecipeApiKey2 = "&apiKey=119f114f6e334171834908713fb964b8";
var rRecipeApiKey3 = "&apiKey=8496184c37164d1a9b0b16b42f58bc2b";
var rRecipeApiKey4 = "&apiKey=fd2ce1b521e34e669afec9b791093734";
var rMovieApiKey = "apikey=84c248ca";
var rMovieApiKey2 = "apikey=67c1ed90";
var rMovieApiKey3 = "apikey=a05b3cd4";
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var searchHistoryEl = document.querySelector("#search-history");
var searchedMovies = document.querySelector("#searched-movies");


// Local Storage Function
var movieStorage = function (title, genre) {
    var movie = {
        title: title,
        genre: genre
    }
    
    var movies = JSON.parse(localStorage.getItem("movies"))
    
    if (!movies) {
        movies = [movie]
    } else {
        movies = movies.concat([movie])
    }

    localStorage.setItem("movies", JSON.stringify(movies))
};

// Movie Poster Fetch | OMDB API
var getMoviePoster = function (movie) {
    var tempCity = movie.replace(' ', '%20')
    var apiUrl = `http://www.omdbapi.com/?${rMovieApiKey3}&t=${tempCity}`;
    fetch(apiUrl).then(function (Response) {

        return Response.json().then(function (data) {

                var movieTitle = data.Title
                var movieGenre = data.Genre.split(' ').pop()
                var moviePoster = data.Poster

                //Pass to Local Storage
                movieStorage(movieTitle, movieGenre);

                // Pass Movie Title and Poster to displayPoster Function
                displayPoster(movieTitle, moviePoster);

                var lastMovie = JSON.parse(localStorage.getItem("movies"));
                getRecipes(lastMovie[lastMovie.length - 1]);

            })
            .catch(function (error) {
                console.log("Error");
                modal.style.display = "block";
            });
    });
};

// Recipes Fetch | Spoonacular
var getRecipes = function (meal) {

    // Pass to Function to Determine Cuisine Type
    var cuisine = genreToCuisine(meal.genre);

    var api = `https://api.spoonacular.com/recipes/random?number=3&tags=${cuisine}` + rRecipeApiKey3;

    // Clear Previous Searches
    whateva.innerHTML = ' ';

    fetch(api)
        .then(function (response) {

            //request was successful
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.recipes.length; i++) {

                recipeHeader.style.display = "block";
                var columnEl = document.createElement('div')
                columnEl.setAttribute('class', 'col s12')

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
                cardContentEl = document.createElement('div')
                cardContentEl.setAttribute('class', 'card-stacked')
                cardStackedEl = document.createElement('div')
                cardStackedEl.setAttribute('class', 'card-content')
                cardContentEl.appendChild(cardStackedEl)
                contentCardEl.appendChild(cardContentEl)

                // Recipe name and info
                var recipeName = data.recipes[i].title
                recipeNameEl = document.createElement('h4')
                recipeNameEl.textContent = recipeName
                recipeNameEl.setAttribute('id', 'recipe-one-name')
                var recipeSummary = data.recipes[i].summary
                recipeInfoEl = document.createElement('p')
                recipeInfoEl.innerHTML = recipeSummary
                recipeInfoEl.setAttribute('class', 'disable-link')
                cardStackedEl.appendChild(recipeNameEl)
                cardStackedEl.appendChild(recipeInfoEl)

                // recipe link
                var recipeLink = data.recipes[i].sourceUrl
                recipeLinkContainerEl = document.createElement('div')
                recipeLinkContainerEl.setAttribute('class', 'card-action')
                recipeLinkEl = document.createElement('a')
                recipeLinkEl.setAttribute('class', 'waves-effect waves-light btn')
                recipeLinkEl.setAttribute('href', `${recipeLink}`)
                recipeLinkEl.setAttribute('target', '_blank')
                recipeLinkEl.textContent = "See Recipe"
                cardStackedEl.appendChild(recipeLinkEl)

                whateva.appendChild(columnEl)
            }
        })
};

// Funtion to Display Movie Poster
var displayPoster = function (movieTitle, moviePoster) {
    // Clear previous poster
    postercontainerEl.textContent = "";

    // Create Header with Movie Title
    var movieTitleEl = document.createElement('h4');
    movieTitleEl.textContent = movieTitle;
    movieTitleEl.setAttribute('class', 'column-header center');
    movieTitleEl.setAttribute('id', 'movie-title');

    // Create Div to Hold Movie Poster
    var moviePosterContainer = document.createElement('div');
    moviePosterContainer.setAttribute('id', 'movie-poster');
    var moviePosterEl = document.createElement('img');
    moviePosterEl.setAttribute('id', 'poster-img');
    moviePosterEl.setAttribute('src', `${moviePoster}`);
    moviePosterEl.setAttribute('class', 'poster-img box-shadow');
    moviePosterContainer.appendChild(moviePosterEl);

    // Display Elements
    postercontainerEl.appendChild(movieTitleEl);
    postercontainerEl.appendChild(moviePosterContainer);

    // Call Function to Display Searched Movie in History
    displaySearchTitle();

    // Clear Form
    inputEl.value=""

};

// Function to Display Searched Movies in History
var displaySearchTitle = function() {

    var retrievedMovies = localStorage.getItem("movies");
    var previousMovieEl = JSON.parse(retrievedMovies);
    var movie_len = previousMovieEl.length;

    for (var search = 0; search < movie_len; search++) {
    }
    // Limit Display to 3 Movies
    if (movie_len > 3) {
        var oldData = searchHistoryEl.firstElementChild;
        searchHistoryEl.removeChild(oldData);
    }
    searchHistoryEl.appendChild(createHistoryElement(previousMovieEl[previousMovieEl.length - 1].title, previousMovieEl[previousMovieEl.length - 1].genre));
};


// Function to Display Prior Searches from Local Storage Upon Page Reload
var titleToDisplay = function () {
    var retrievedMovies = localStorage.getItem("movies");

    // If no prior searches, do not display History header
    // if (!retrievedMovies) {
    //     searchedMovies.style.color="black"
    //     searchedMovies.style.borderBottom="black"  
    //}
    var previousMovieEl = JSON.parse(retrievedMovies);
    var movie_len = (previousMovieEl.length > 3) ? 3 : previousMovieEl.length;
    for (var search = 0; search < movie_len; search++) {
        searchHistoryEl.appendChild(createHistoryElement(previousMovieEl[search].title, previousMovieEl[search].genre));
    }
};

// Global Functions | Call Movie Poster Display Functions After Button Click
var searchHandler = function (title) {
    event.preventDefault();

    if (inputEl.value) {
        getMoviePoster(inputEl.value);

    } else if (title){
        getMoviePoster(title);

    }
};

// //Event Listener for Submit Button
submitBtnEl.addEventListener("click", searchHandler);

// Function to Create Search History Buttons
function createHistoryElement(title, genre) {
    var movieButtonEl = document.createElement("button");
    var titleholder = document.createElement("h4");
    movieButtonEl.style.width="100%";
    titleholder.style.color = "black";
    titleholder.innerHTML = title;
    movieButtonEl.appendChild(titleholder);

    movieButtonEl.addEventListener("click", function(event) {
        event.preventDefault();
        
        // send title to searchHandler function as inputEl
        searchHandler(title);
    });
    return movieButtonEl; 
};

// Function to Assign Cuisine Types to Movie Genres
function genreToCuisine(genre) {
    var cuisine
    if (genre === "Action") {
        cuisine = "japanese"
    } else if (genre === "Adventure") {
        cuisine = "german"
    } else if (genre === "Bollywood") {
        cuisine = "indian"
    } else if (genre === "Comedy") {
        cuisine = "mexican"
    } else if (genre === "Documentary") {
        cuisine = "spanish"
    } else if (genre === "Drama") {
        cuisine = "french"
    } else if (genre === "Family" || genre === "Animation") {
        cuisine = "american"
    } else if (genre === "Fantasy") {
        cuisine = "vietnamese"
    } else if (genre === "Horror") {
        cuisine = "indian"
    } else if (genre === "Romantic") {
        cuisine = "Thai"
    } else if (genre === "Sci-Fi") {
        cuisine = "chinese"
    } else if (genre === "Superhero") {
        cuisine = "mediterranean"
    } else if (genre === "Thriller" || genre === "Mystery") {
        cuisine = "cajun"
    } else if (genre === "Western") {
        cuisine = "southern"
    } else {
        cuisine = "british"
    }
    return cuisine;
};

// Modal Functions
span.onclick = function () {
    modal.style.display = "none";

}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }

}

// Page Load
window.addEventListener("load", titleToDisplay());
