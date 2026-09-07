class Profile {
    constructor(mass, volume, liquidness, flavor) {
        this.mass = mass;
        this.volume = volume;
        this.liquidness = liquidness;
        this.quantity = quantity;
        this.flavor = flavor;
    }
}

class Flavor {
    constructor() {
        this.properties = {};
    }
    static combine(flavors = []) {
        const combined = new Flavor();
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

class Combination {
    constructor(ingredients){
        this.ingredients = ingredients;
        this.profile = this.combineProfiles();
    }
    combineProfiles() {
        let mass = 0, volume = 0, liquidness = 0, quantity = 0;
        for (let ingredient of this.ingredients) {
            mass += ingredient.mass;
            volume += ingredient.volume;
            liquidness = (liquidness * (mass - ingredient.mass) + ingredient.liquidness * ingredient.mass) / mass;
        }
        flavor = Flavor.combine();
        return new Profile(mass, volume, liquidness, unity, flavor);
    }
}