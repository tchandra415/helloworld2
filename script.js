document.addEventListener('DOMContentLoaded', function () {
    loadRecipes();
});

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    if (name && ingredients && instructions) {
        const recipe = {
            name,
            ingredients,
            instructions,
        };

        saveRecipe(recipe);
        loadRecipes();
        clearForm();
    } else {
        alert('Please fill in all fields.');
    }
}

function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipesList = document.getElementById('recipes');
    recipesList.innerHTML = '';

    recipes.forEach(function (recipe, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${recipe.name}</strong>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipesList.appendChild(li);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes();
}

function clearForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
}
