class Flavor {
    constructor(sweet, sour, salty, bitter, umami, heat, cooked, floral) {
        this.properties = {
            sweet,
            sour,
            salty,
            bitter,
            umami,
            heat,
            cooked,
            floral
        };
    }
    static combine(flavors = []) {
        const combined = new Flavor(0, 0, 0, 0, 0, 0, 0, 0);
        for (let flavor of flavors) {
            for (let [key, value] of Object.entries(flavor.properties)) {
                if (!combined.properties[key]) {
                    combined.properties[key] = 0;
                }
                combined.properties[key] += value;
            }
        }
        return combined;
    }
}

class Action {
    constructor(name, description = '', requirements = []) {
        this.name = name;
        this.description = description;
        this.requirements = requirements;
    }
}

class Category {
    static Meat = new Category('meat', []);
    static Vegetable = new Category('vegetable', []);
    static Dairy = new Category('dairy', []);
    static Fruit = new Category('fruit', []);
    static Grain = new Category('grain', []);
    static Seasoning = new Category('seasoning', []);
    static Sauce = new Category('sauce', []);
    constructor(name, actions) {
        this.name = name;
        this.actions = actions;
    }
}

class Profile {
    constructor(mass, volume, liquidness, flavor, category) {
        this.mass = mass; //in grams
        this.volume = volume; //in liters
        this.liquidness = liquidness; //ratio of liquid to total mass
        this.flavor = flavor;
        this.category = category;
    }
}

class Item {
    constructor(items = [], quantity = 1){
        this.items = items;
        this.profile = this.getProfile();
        this.quantity = quantity;
    }
    getProfile() {
        let mass = 0, volume = 0, liquidness = 0;
        let flavors, category = [];
        for (let item of this.items) {
            mass += item.profile.mass * item.quantity;
            volume += item.profile.volume * item.quantity;
            liquidness = (liquidness * (mass - item.profile.mass*item.quantity) + item.profile.liquidness * item.profile.mass * item.quantity) / mass;
            flavors.push(item.profile.flavor);
            category.push(...item.category);
        }
        const flavor = Flavor.combine(flavors);
        return new Profile(mass, volume, liquidness, flavor, category);
    }
}

class Recipe {
    constructor(profile) {
        this.profile = profile;
    }
}

class RecipeGenerator {

}