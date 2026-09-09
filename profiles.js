class Ingredient {
	constructor({ name=null, quantity = 1, mass = 0, volume = 0, liquidness = 0, minSafeTemperature = 0, categories = new Map(), temperature = 0 } = {}) {
		this.name = name;
		this.quantity = quantity;
        this.mass = mass;
		this.volume = volume;
		this.liquidness = Math.max(0, Math.min(1, liquidness));
		this.temperature = temperature;
		this.minSafeTemperature = minSafeTemperature;
        this.categories = categories;
        this.isSafe = temperature >= minSafeTemperature;
        categories.forEach((category) => {
            if (ingredient.get(category)>=0.5) {
                category.children.push(this);
            }
        });
	}
    get isSafe(){
        return this.temperature >= this.minSafeTemperature || this.isSafe;
    }
    static combine(options = {heatTo: null}, ingredients=[]){
        const totalMass = ingredients.reduce((sum, ingredient) => sum + ingredient.mass * ingredient.quantity, 0);
        const totalVolume = ingredients.reduce((sum, ingredient) => sum + ingredient.volume * ingredient.quantity, 0);
        const totalLiquidness = ingredients.reduce((sum, ingredient) => sum + ingredient.liquidness * ingredient.volume * ingredient.quantity, 0) / totalVolume;
        const minSafeTemperature = Math.max(...ingredients.map(p => p.minSafeTemperature));
        var avgTemperature;
        if (options.heatTo !== null) {
            if (options.heatTo=='safe'){
                avgTemperature = minSafeTemperature;
                isSafe=true;
            } else {
                avgTemperature = options.heatTo;
            }
        } else {
            avgTemperature = ingredients.reduce((sum, ingredient) => sum + ingredient.temperature * ingredient.mass, 0) / totalMass;
        }
        var categories = new Map();
        ingredients.forEach((ingredient) => {
            ingredient.categories.forEach((weight, category) => {
                categories.set(category, (categories.get(category) || 0) + weight * ingredient.mass);
            });
        });
        categories.forEach((weight, category) => {
            categories.set(category, weight / totalMass);
        });

        return new Ingredient({ mass: totalMass, volume: totalVolume, liquidness: totalLiquidness, temperature: avgTemperature, minSafeTemperature: minSafeTemperature, categories: categories });

    }
    static list = {
        chicken: new Ingredient({name: 'chicken', mass: 450, volume: 0.5, liquidness: 0.05, minSafeTemperature: 74, category: [[Category.meat, 1]] }),
        tofu: new Ingredient({name: 'tofu', mass: 300, volume: 0.32, liquidness: 0.15, category: [[Category.meat, 1]] }),
        mushrooms: new Ingredient({name: 'mushrooms', mass: 250, volume: 0.4, liquidness: 0.35, category: [[Category.vegetable, 1]] }),
        bell_pepper: new Ingredient({name: 'bell pepper', mass: 160, volume: 0.22, liquidness: 0.4, category: [[Category.vegetable, 1]] }),
        onion: new Ingredient({name: 'onion', mass: 150, volume: 0.18, liquidness: 0.3, category: [[Category.vegetable, 1]] }),
        spinach: new Ingredient({name: 'spinach', mass: 100, volume: 0.8, liquidness: 0.2, category: [[Category.vegetable, 1]] }),
        cumin: new Ingredient({name: 'cumin', mass: 5, volume: 0.006, liquidness: 0.01, category: [[Category.seasoning, 1]] }),
        olive_oil: new Ingredient({name: 'olive oil', mass: 100, volume: 0.1, liquidness: 0.9, category: [[Category.sauce, 1]] }),
        tomato: new Ingredient({name: 'tomato', mass: 180, volume: 0.2, liquidness: 0.65, category: [[Category.fruit, 1]] }),
        lemon: new Ingredient({name: 'lemon', mass: 120, volume: 0.12, liquidness: 0.55, category: [[Category.fruit, 1]] }),
        rice: new Ingredient({name: 'rice', mass: 180, volume: 0.22, liquidness: 0.02, category: [[Category.grain, 1]] }),
        pasta: new Ingredient({name: 'pasta', mass: 200, volume: 0.28, liquidness: 0.02, category: [[Category.grain, 1]] }),
        cheddar: new Ingredient({name: 'cheddar', mass: 120, volume: 0.11, liquidness: 0.1, category: [[Category.dairy, 1]] }),
        yogurt: new Ingredient({name: 'yogurt', mass: 180, volume: 0.17, liquidness: 0.7, category: [[Category.dairy, 1]] }),
        soy_sauce: new Ingredient({name: 'soy sauce', mass: 90, volume: 0.08, liquidness: 1, category: [[Category.sauce, 1]] })
    }
}

class Category {
    constructor(name, parent = null){
        this.name = name;
        this.children = [];
        if (parent) {
            parent.children.push(this);
        }
    }
    static meat = new Category('meat');
    static vegetable = new Category('vegetable');
    static dairy = new Category('dairy');
    static fruit = new Category('fruit');
    static grain = new Category('grain');
    static seasoning = new Category('seasoning');
    static sauce = new Category('sauce', Category.seasoning);
}