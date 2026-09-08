class Requirement {
	constructor({category = [], ingredient = null, minLiquidness = 0, maxLiquidness = 1 } = {}) {
		this.category = category;
		this.ingredient = ingredient;
		this.minLiquidness = minLiquidness;
		this.maxLiquidness = maxLiquidness;
	}

	accepts(item) {
		const hasCategory = this.category.length === 0 || this.category.some((category) => item.profile.category.includes(category));
		const liquidness = item.profile.liquidness.value;
		const hasIngredient = this.ingredient === null || this.ingredient === item.ingredient;
		return hasCategory && liquidness >= this.minLiquidness && liquidness <= this.maxLiquidness && hasIngredient;
	}
    
}

class Action {
	constructor(name, description, func, requirements = {main: new Requirement(), secondary: new Requirement()}, minutes = null) {
		this.name = name;
		this.description = description;
		this.func = func;
		this.requirements = requirements;
	}
    print(mins){
        return this.description + (this.minutes !== null ? ` for ${mins} mins` : '');
    }
	canApplyMain(main) {
		return this.requirements.main.accepts(main);
	}
    canApplySecondary(secondary) {
		return this.requirements.secondary.accepts(secondary);
	}
}

const ACTIONS = Object.freeze([
	new Action('Sear', 'Brown the main ingredient in a hot pan', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({ category: [Categories.MEAT] }) }),
	new Action('Saute', 'Cook with oil', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({ category: [Categories.VEGETABLE] }), secondary: new Requirement({ingredient: INGREDIENTS.olive_oil }) }),
	new Action('Simmer', 'Cook gently in liquid', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { secondary: new Requirement({ minLiquidness: 0.55 }) }),
	new Action('Boil', 'Cook in boiling water', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({ category: [Categories.GRAIN] }) }),
	new Action('Fold', 'Combine gently', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { main: new Requirement({minLiquidness: 0.5}), secondary: new Requirement({minLiquidness: 0.5}) }),
	new Action('Season', 'Add', ({main = null, secondaries=[], time = null} = {}) => { /* implementation */ }, { secondary: new Requirement({ category: [Categories.SEASONING, Categories.SAUCE, Categories.FRUIT] }) })
]);
