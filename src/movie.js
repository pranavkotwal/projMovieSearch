// calls api again to get movie details and renders 

async function loadDetails(){
    // Get id from session storage 
    const imdbi = sessionStorage.getItem('movieId')


        try{
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbi}&type=movie&apikey=bf37c1a0`)
            const data = await response.json();
            // renderMovie(data)
            const detail= document.getElementById('details')

            detail.innerHTML = `
            
            <img src = "${data.Poster=="N/A"? "noimage.png":data.Poster}">
            <h2>${data.Title}</h2>
            <h3>Plot : ${data.Plot}</h3>
            <h3>Rating : ${data.imdbRating}
            <p class="release"><strong>Relased : ${data.Released}</strong></p>
            `
        }
        catch(error){
            console.log(error)
        }
}

loadDetails()