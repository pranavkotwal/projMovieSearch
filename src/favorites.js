// const del = document.querySelector('.del-btn')

// REnder the movies from local storage 
function renderFavorites() {
  const favSection = document.getElementById('favorites');
  favSection.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // to check the prefix of the movie stored by "adding to fav"
    if (key.startsWith('movie_')) {
      const movieDetailDiv = document.createElement('li');

      const movieDetail = document.createElement('div');
      movieDetail.className = 'favMovie'   // will use this for styling 
      movieDetail.innerHTML = `${localStorage.getItem(key)} <button class="del-btn">Remove Fav</button>`;
      const removeButton = movieDetail.querySelector('.del-btn');
      // when delete button is clicked the entry will get deleted from local storage.
      removeButton.addEventListener('click', function() {
        localStorage.removeItem(key);
        renderFavorites(); // re-render favorites after removing a movie
      });
      favSection.appendChild(movieDetailDiv);
      movieDetailDiv.appendChild(movieDetail)
    }
  }
}
renderFavorites()
