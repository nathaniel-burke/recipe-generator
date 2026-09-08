class Category {
	constructor(name, actions = []) {
		this.name = name;
		this.actions = actions;
	}

	toString() {
		return this.name;
	}
}

class Property {
	static Mass(value) {
		return new Property('mass', value);
	}

	static Volume(value) {
		return new Property('volume', value);
	}

	static Liquidness(value) {
		return new Property('liquidness', value);
	}

	static SpecificHeat(value) {
		return new Property('specificHeat', value);
	}

	static Temperature(value) {
		return new Property('temperature', value);
	}

	constructor(name, value = 0) {
		this.name = name;
		this.value = Number(value) || 0;
	}

	valueOf() {
		return this.value;
	}
}

class Profile {
	constructor({ mass = 0, volume = 0, liquidness = 0, specificHeat = 1, category = [], temperature = 0 } = {}) {
		this.mass = Property.Mass(mass);
		this.volume = Property.Volume(volume);
		this.liquidness = Property.Liquidness(Math.max(0, Math.min(1, liquidness)));
		this.specificHeat = Property.SpecificHeat(specificHeat);
		this.temperature = Property.Temperature(temperature);
		this.category = [...new Set(category)];
	}
}

class Ingredient {
	constructor(name, profile, minSafeCelsius=0) {
		this.name = name;
		this.profile = profile;
		this.minSafeTemperature = minSafeCelsius;
	}

}

const Categories = Object.freeze({
	MEAT: 'meat',
	VEGETABLE: 'vegetable',
	DAIRY: 'dairy',
	FRUIT: 'fruit',
	GRAIN: 'grain',
	SEASONING: 'seasoning',
	SAUCE: 'sauce'
});

const INGREDIENTS = Object.freeze({
	chicken: new Ingredient('chicken', new Profile({ mass: 450, volume: 0.5, liquidness: 0.68, category: [Categories.MEAT] })),
	tofu: new Ingredient('tofu', new Profile({ mass: 300, volume: 0.32, liquidness: 0.72, category: [Categories.MEAT] })),
	mushrooms: new Ingredient('mushrooms', new Profile({ mass: 250, volume: 0.4, liquidness: 0.92, category: [Categories.VEGETABLE] })),
	bell_pepper: new Ingredient('bell pepper', new Profile({ mass: 160, volume: 0.22, liquidness: 0.92, category: [Categories.VEGETABLE] })),
	onion: new Ingredient('onion', new Profile({ mass: 150, volume: 0.18, liquidness: 0.89, category: [Categories.VEGETABLE] })),
	spinach: new Ingredient('spinach', new Profile({ mass: 100, volume: 0.8, liquidness: 0.91, category: [Categories.VEGETABLE] })),
	tomato: new Ingredient('tomato', new Profile({ mass: 180, volume: 0.2, liquidness: 0.95, category: [Categories.FRUIT] })),
	lemon: new Ingredient('lemon', new Profile({ mass: 120, volume: 0.12, liquidness: 0.89, category: [Categories.FRUIT] })),
	rice: new Ingredient('rice', new Profile({ mass: 180, volume: 0.22, liquidness: 0.12, category: [Categories.GRAIN] })),
	pasta: new Ingredient('pasta', new Profile({ mass: 200, volume: 0.28, liquidness: 0.1, category: [Categories.GRAIN] })),
	cheddar: new Ingredient('cheddar', new Profile({ mass: 120, volume: 0.11, liquidness: 0.36, category: [Categories.DAIRY] })),
	yogurt: new Ingredient('yogurt', new Profile({ mass: 180, volume: 0.17, liquidness: 0.82, category: [Categories.DAIRY] })),
	soy_sauce: new Ingredient('soy sauce', new Profile({ mass: 90, volume: 0.08, liquidness: 0.98, category: [Categories.SAUCE] })),
	olive_oil: new Ingredient('olive oil', new Profile({ mass: 45, volume: 0.05, liquidness: 1, category: [Categories.SAUCE] })),
	garlic: new Ingredient('garlic', new Profile({ mass: 15, volume: 0.02, liquidness: 0.63, category: [Categories.SEASONING] })),
	cumin: new Ingredient('cumin', new Profile({ mass: 5, volume: 0.006, liquidness: 0.02, category: [Categories.SEASONING] })),
	chili_flakes: new Ingredient('chili flakes', new Profile({ mass: 4, volume: 0.005, liquidness: 0.03, category: [Categories.SEASONING] }))
});
