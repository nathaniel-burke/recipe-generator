class Item {
    constructor(ingredient, quantity = 1) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.profile = ingredient.profile;
    }
}

class Recipe {
    constructor(items=[], actions=[]) {
        this.items = items;
        this.actions = actions;
    }
}

class RecipeGenerator {
    constructor(ingredients = INGREDIENTS, actions = ACTIONS) {
        this.ingredients = ingredients;
        this.actions = actions;
    }

    generate({ servings = 1, required = [] } = {}) {
        const selected = this.selectIngredients(mood, required);
        const items = selected.map((ingredient, index) => new Item(ingredient, index === 0 ? servings : 1));
        const mainItem = items[0];
        const steps = this.buildSteps(items);
        const mass = items.reduce((total, item) => total + item.profile.mass.value * item.quantity, 0);
        const volume = items.reduce((total, item) => total + item.profile.volume.value * item.quantity, 0);
        const liquidness = items.reduce((total, item) => total + item.profile.liquidness.value * item.profile.mass.value * item.quantity, 0) / mass;
        const name = `${this.titleCase(mainItem.ingredient.name)} ${this.titleCase(selected[1].name)} Bowl`;
        return new Recipe(name, items, steps, { servings, mass: Math.round(mass), volume: volume.toFixed(2), liquidness: Math.round(liquidness * 100) });
    }

    selectIngredients(mood, required) {
        const pool = this.ingredients;
        const choose = (categories) => pool.find((ingredient) => ingredient.profile.category.some((category) => categories.includes(category)));
        const anchor = required.length ? pool.find((ingredient) => ingredient.name === required[0]) : null;
        const main = anchor || choose([Categories.MEAT]) || choose([Categories.VEGETABLE]);
        const grain = choose([Categories.GRAIN]);
        const vegetable = choose([Categories.VEGETABLE]);
        const sauce = mood === 'bright' ? choose([Categories.FRUIT]) : choose([Categories.SAUCE, Categories.DAIRY]);
        const seasoning = choose([Categories.SEASONING]);
        return [main, grain, vegetable, sauce, seasoning].filter(Boolean);
    }

    buildSteps(items) {
        const steps = [];
        const addStep = (actionName, ingredientNames) => {
            const action = this.actions.find((candidate) => candidate.name === actionName);
            const actionItems = items.filter((item) => ingredientNames.includes(item.ingredient.name));
            if (action && action.canApply(actionItems)) steps.push({ action, ingredients: actionItems });
        };
        addStep('Boil', items.filter((item) => item.profile.category.includes(Categories.GRAIN)).map((item) => item.ingredient.name));
        addStep('Sear', items.filter((item) => item.profile.category.includes(Categories.MEAT)).map((item) => item.ingredient.name));
        addStep('Saute', items.filter((item) => item.profile.category.includes(Categories.VEGETABLE)).map((item) => item.ingredient.name));
        addStep('Simmer', items.filter((item) => item.profile.liquidness.value > 0.55).map((item) => item.ingredient.name));
        addStep('Season', items.filter((item) => item.profile.category.includes(Categories.SEASONING) || item.profile.category.includes(Categories.FRUIT)).map((item) => item.ingredient.name));
        addStep('Fold', items.map((item) => item.ingredient.name));
        return steps;
    }

    titleCase(value) { return value.replace(/\b\w/g, (letter) => letter.toUpperCase()); }
}

const generator = new RecipeGenerator();
const form = document.querySelector('#generator-form');
const result = document.querySelector('#recipe-result');
const ingredientSelect = document.querySelector('#ingredient');

function renderRecipe(recipe) {
    result.innerHTML = `<div class="recipe-heading"><div><span class="eyebrow">Generated dish</span><h2>${recipe.name}</h2></div><span class="servings">${recipe.stats.servings} servings</span></div><div class="stats"><div><strong>${recipe.stats.mass}g</strong><span>total mass</span></div><div><strong>${recipe.stats.volume}L</strong><span>approx. volume</span></div><div><strong>${recipe.stats.liquidness}%</strong><span>liquidness</span></div></div><div class="recipe-columns"><section><h3>What you need</h3><ul class="ingredient-list">${recipe.items.map((item) => `<li><span>${item.ingredient.name}</span><b>${item.quantity > 1 ? `${item.quantity} ×` : 'to taste'}</b></li>`).join('')}</ul></section><section><h3>How it comes together</h3><ol class="steps">${recipe.steps.map((step) => `<li><span class="step-number">${step.action.name}</span><p>${step.action.description} <em>(${step.action.minutes} min)</em></p></li>`).join('')}</ol></section></div>`;
}

function populateIngredients() {
    ingredientSelect.innerHTML = '<option value="">Surprise me</option>' + generator.ingredients.map((ingredient) => `<option value="${ingredient.name}">${ingredient.name}</option>`).join('');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const required = formData.get('ingredient') ? [formData.get('ingredient')] : [];
    renderRecipe(generator.generate({ servings: Number(formData.get('servings')), mood: formData.get('mood'), required }));
});

populateIngredients();
renderRecipe(generator.generate());
