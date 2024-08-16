// Space Battle OOP Lab
// ====================

// Creating the base ship class  
class Ship {
    constructor (hull, firepower, accuracy) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    attack() {
        return "attach message";
    }
    
    destroy () {
        return "destroy message";
    }
}

