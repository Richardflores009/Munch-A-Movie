// HTML Element Variables
var inputEl = document.querySelector(".validate");
var submitBtnEl = document.querySelector(".btn");
var posterEl = document.querySelector(".poster");
var historyEl = document.querySelector(".history");
var whateva = document.querySelector('#whatever-u-want')
var recipeContainerEl = document.querySelector(".recipe-cont");
var movieName = localStorage.getItem("movies")
var recipeMainContainer = document.querySelector("#recipe-list")
var recipeHeader = document.querySelector("#recipes-header");
    recipeHeader.style.display="none";
var postercontainerEl = document.querySelector("#poster-container")
var rRecipeApiKey = "&apiKey=0c7c604f01a143d598df0735356390c3";
var rRecipeApiKey2 = "&apiKey=119f114f6e334171834908713fb964b8";
var rRecipeApiKey3 = "&apiKey=8496184c37164d1a9b0b16b42f58bc2b";
var rMovieApiKey = "apikey=84c248ca";
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Local Storage Function for Movie Search History
//var historyStorage = function(name) {
  //  localStorage.setItem("movies", name)
   

    // Search History Loop

    // Create Buttons for Each Search History Term
    
    // Append Buttons to History Div

    // Set TextContent for Button

//};

// Local Storage Function
var movieStorage = function(title, genre) {
    var movie = {title:title, genre:genre}
    console.log(title,genre)
    var movies = JSON.parse(localStorage.getItem("movies"))

    console.log("The movie:", movies)


    if(!movies){
        movies = [movie]
    } else {
        movies = movies.concat([movie])
    }

    //window.localStorage.setItem("movies", JSON.stringify(movies))
    localStorage.setItem("movies", JSON.stringify(movies))
    console.log(localStorage.getItem("movies"));
    console.log(movies[0].title)
    console.log(movies[0].genre)

};

// Movie Poster Fetch
var getMoviePoster = function(movie) {
    var tempCity = movie.replace(' ', '%20')

    var apiUrl = `http://www.omdbapi.com/?${rMovieApiKey}&t=${tempCity}`;
    console.log(apiUrl)

    fetch(apiUrl).then(function(Response) {
       
        return Response.json().then(function (data) {
        
            var movieTitle = data.Title
            var movieGenre = data.Genre.split(' ').pop()
            var moviePoster = data.Poster
            var moviePlot = data.Plot
        
             movieStorage(movieTitle, movieGenre);

            // Pass Movie Title and Poster to displayPoster Function
            displayPoster(movieTitle, moviePoster);

            //set movie genre to searchhandler
            // searchHandler(movieGenre)
            console.log(localStorage.getItem("movies"));
            var lastMovie = JSON.parse(localStorage.getItem("movies")).pop();
            getRecipes(lastMovie);
        })
        .catch(function(error) {
            console.log("Not a valid movie name");
            modal.style.display = "block";
        });
    });
};



//Fetch Recipes
var getRecipes = function(meal) {

console.log(meal)

    // If Statement for Pairing Movie Genre with Ingredients
    var cuisine = genreToCuisine(meal.genre);


    var api = `https://api.spoonacular.com/recipes/random?number=3&tags=${cuisine}` + rRecipeApiKey3;
        console.log(api);
        
        // recipeMainContainer.innerHTML= ' ';
        whateva.innerHTML= ' ';
        
        fetch(api)
        .then(function(response) {
            
        //request was successful
            return response.json();
        })
        .then(function(data){

            for (let i = 0; i < data.recipes.length; i++){
                
                recipeHeader.style.display = "block";

                var columnEl = document.createElement('div')
                columnEl.setAttribute('class', 'col s12')
                // headerDivEl = document.createElement('div')
                // columnHeaderEl = document.createElement('h4')
                // columnHeaderEl.textContent = "Recipes"
                // columnHeaderEl.setAttribute('class', 'column-header center')
                // headerDivEl.appendChild(columnHeaderEl)
                
                
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
                whateva.appendChild(columnEl)
                // recipeMainContainer.appendChild(columnHeaderEl)
               
                // recipeMainContainer.appendChild(columnEl)
                // recipeMainContainer.appendChild(columnHeaderEl)
                
                
            }
        })
        
};


// Funtion to Display Movie Poster
var displayPoster = function(movieTitle, moviePoster) {
    // Clear previous poster
    postercontainerEl.textContent="";

    // Create Header with Movie Title
    var movieTitleEl = document.createElement('h4')
    movieTitleEl.textContent = movieTitle
    movieTitleEl.setAttribute('class', 'column-header center')
    movieTitleEl.setAttribute('id', 'movie-title')
    
    // Create Div to Hold Movie Poster
    var moviePosterContainer = document.createElement('div')
    moviePosterContainer.setAttribute('id', 'movie-poster')
    var moviePosterEl = document.createElement('img')
    moviePosterEl.setAttribute('id', 'poster-img')
    moviePosterEl.setAttribute('src', `${moviePoster}`)
    moviePosterEl.setAttribute('class', 'poster-img box-shadow')
    moviePosterContainer.appendChild(moviePosterEl)

    // Display Elements
    postercontainerEl.appendChild(movieTitleEl)
    postercontainerEl.appendChild(moviePosterContainer)

};





// Function for Hovering over Recipes

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
        // historyStorage(inputEl.value);
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

// Function to Assign Cuisine Types to Movie Genres

function genreToCuisine(genre) {
    var cuisine
    if (genre==="Action") {
        cuisine = "japanese"
    }
    else if (genre==="Adventure") {
        cuisine = "german"
    }
    else if (genre==="Bollywood") {
        cuisine = "indian"
    }
    else if (genre==="Comedy") {
        cuisine = "mexican"
    }
    else if (genre==="Documentary") {
        cuisine = "spanish"
    }
    else if (genre==="Drama") {
        cuisine = "french"
    }
    else if (genre==="Family" || genre==="Animation") {
        cuisine = "american"
    }
    else if (genre==="Fantasy") {
        cuisine = "vietnamese"
    }
    else if (genre==="Horror") {
        cuisine = "indian"
    }
    else if (genre==="Romantic") {
        cuisine = "Thai"
    }
    else if (genre==="Sci-Fi") {
        cuisine = "chinese"
    }
    else if (genre==="Superhero") {
        cuisine = "mediterranean"
    }
    else if (genre==="Thriller" || genre==="Mystery") {
        cuisine = "cajun"
    }
    else if (genre==="Western") {
        cuisine = "southern"
    }
    else {
        cuisine = "british"
    }
    return cuisine;
};

//Modal Functions
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "block";
    }
}
