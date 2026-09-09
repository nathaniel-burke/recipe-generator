class Requirement {
	constructor({categories = new Map(), ingredient = null, minLiquidness = 0, maxLiquidness = 1 } = {}) {
		this.categories = categories;
		this.ingredient = ingredient;
		this.minLiquidness = minLiquidness;
		this.maxLiquidness = maxLiquidness;
	}

	accepts(item) {
        if (item==null) return true;
		const isSufficientCategory = this.categories.size === 0 || this.categories.reduce((acc, category) => acc || (item.ingredient.categories[category]>=this.categories[category]), false);
        if (!isSufficientCategory) return false;
		const liquidness = item.ingredient.liquidness.value;
		const hasIngredient = this.ingredient === null || this.ingredient === item.ingredient;
		return isSufficientCategory && liquidness >= this.minLiquidness && liquidness <= this.maxLiquidness && hasIngredient;
	}
    
}

class Action {
    static list = {
        sear: new Action('Sear', 'Brown the main ingredient in a hot pan', {heatTo: 180}),
        saute: new Action('Saute', 'Cook with oil', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({ categories: new Map([[Categories.VEGETABLE, 0.5]]) }), secondary: new Requirement({ingredient: Ingredients.olive_oil }) }),
        simmer: new Action('Simmer', 'Cook gently in liquid', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { secondary: new Requirement({ minLiquidness: 0.55 }) }),
        boil: new Action('Boil', 'Cook in boiling water', {heatTo: 100}, { main: new Requirement({ category: [Categories.GRAIN] }) }),
        fold: new Action('Fold', 'Combine gently', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({minLiquidness: 0.5}), secondary: new Requirement({minLiquidness: 0.5}) }),
        season: new Action('Season', 'Add', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { secondary: new Requirement({ category: [[Category.seasoning, 1], [Category.sauce, 1], [Category.fruit, 1]] }) })
    }
	constructor(name, description, options, requirements = {main: new Requirement(), secondary: new Requirement()}, minutes = null) {
		this.requirements = requirements;
		this.name = name;
		this.description = description;
        this.execute = ({main, secondaries}) => Ingredients.combine(options,[main, ...secondaries]);
	}
	canApplyMain(main) {
		return this.requirements.main.accepts(main);
	}
    canApplySecondary(secondary) {
		return this.requirements.secondary.accepts(secondary);
	}
    canApply({main = null, secondary = []} = {}) {
        return this.canApplyMain(main) && this.canApplySecondary(secondary);
    }
}