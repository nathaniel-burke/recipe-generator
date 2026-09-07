class Requirement {
    constructor() {
       
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

class Property {
    static Mass = (num)=> new Property('mass', num);
    static Volume = (num)=> new Property('volume', num);
    static Liquidness = (num)=> new Property('liquidness', num);
    constructor(name, value = 0) {
        this.name = name;
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
}

class Profile {
    constructor(mass, volume, liquidness, category) {
        this.mass = Property.Mass(mass); //in grams
        this.volume = Property.Volume(volume); //in liters
        this.liquidness = Property.Liquidness(liquidness); //ratio of liquid to total mass
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
        for (let item of this.items) {
            mass += item.profile.mass * item.quantity;
            volume += item.profile.volume * item.quantity;
            liquidness = (liquidness * (mass - item.profile.mass*item.quantity) + item.profile.liquidness * item.profile.mass * item.quantity) / mass;
            for (let cat of item.profile.category) {
                if (!category.includes(cat)) {
                    category.push(cat);
                }
            }
        }
        return new Profile(mass, volume, liquidness, category);
    }
}

class Recipe {
    constructor(profile) {
        this.profile = profile;
    }
}

class RecipeGenerator {

}