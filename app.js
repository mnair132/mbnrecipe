async function loadRecipes() {
  const response = await fetch('./recipes.json');
  const recipes = await response.json();
  displayRecipes(recipes);
}

function displayRecipes(recipes) {
  const list = document.getElementById('recipe-list');
  list.innerHTML = '';
  const searchValue = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  recipes
    .filter(r => r.name.toLowerCase().includes(searchValue))
    .filter(r => category === 'all' || r.category === category)
    .forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <button onclick="addToFavorites('${recipe.id}')">Add to Favorites</button>
      `;
      list.appendChild(card);
    });
}

function addToFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Recipe added to favorites!');
  }
}

document.getElementById('search').addEventListener('input', loadRecipes);
document.getElementById('categoryFilter').addEventListener('change', loadRecipes);

loadRecipes();
