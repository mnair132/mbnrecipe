async function loadFavorites() {
  const response = await fetch('recipes.json');
  const recipes = await response.json();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';

  recipes.filter(r => favorites.includes(r.id)).forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <button onclick="removeFromFavorites('${recipe.id}')">Remove</button>
    `;
    list.appendChild(card);
  });
}

function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(f => f !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites();
}

loadFavorites();
