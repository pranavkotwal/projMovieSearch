// bf37c1a0
// https://www.omdbapi.com/?i=tt2582782&type=movie&apikey=bf37c1a0 > page details
const apikey = 'bf37c1a0';

const searchInput = document.querySelector('#search');
const searchResults = document.getElementById('search-result')
const favorites = [];

// fetch movie results from api


const query = searchInput.value ;

async function fetchMovie(){
    const query = searchInput.value.trim();
    if(query.length>=2){
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&type=movie&apikey=bf37c1a0`)

        const data = await response.json()
        const moviesList = data.Search
        

        try{
            if(moviesList){

                searchResults.innerHTML = ''
                for(let i=0;i<moviesList.length;i++){
                //Create Movie List Element
                let movie = document.createElement('li')
                // set attribute to get it's Imdb Id
                movie.setAttribute('data-id',moviesList[i].imdbID)
                movie.innerHTML = `
                <div class="movieDetail" data-id=${moviesList[i].imdbID}> 
                <img src=" ${moviesList[i].Poster=="N/A"? "src/noimage.png":moviesList[i].Poster}" class="poster-thumbnail">
                <h2 data-id="${moviesList[i].imdbID}"> ${moviesList[i].Title} </h2>
                <button class="fav-btn" data-id=${moviesList[i].imdbID}>Add to Favorite</button>
                </div>
                `
                
                searchResults.appendChild(movie)
                
                console.log(moviesList)
               } 
               getId()
               getFavorites()
                 // moviesList[i]
        }else{
            searchResults.innerHTML = `<p>Movie not found</p>`
            
        }
     
    }
    catch(error){
        console.log(error)
    }
        }
        

   
}
// on clicking and writing atleast three letters the event would get triggered and show results
searchInput.addEventListener('click',fetchMovie)
searchInput.addEventListener('keyup',fetchMovie)

// if the movie exists clicking on it will save it data-id attribute
let movieId;

function  getId(){
    let movie = document.getElementsByTagName('li');
    if(movie)
    {
    document.addEventListener('click',(e)=>{
        if(e.target.className == "movieDetail"){ 
            // get the data-id
          movieId = e.target.getAttribute('data-id')
          //store the data-id in session storage
          sessionStorage.setItem("movieId",movieId)
          window.location.href = "src/Movie.html"
        }
    })
}
}


// "tt2582782"
// when clicked on "fav button" it clones the parent element and removes the button 

function getFavorites() {
  const favButtons = document.querySelectorAll('.fav-btn');
  for (let i = 0; i < favButtons.length; i++) {
    const button = favButtons[i];
    button.addEventListener('click', function(event) {
      const movieDetail = event.target.parentNode.cloneNode(true); //clone the parent
      movieDetail.removeChild(movieDetail.lastElementChild); // remove the button
      localStorage.setItem(`movie_${movieDetail.dataset.id}`, movieDetail.innerHTML);
    });
  }
}
