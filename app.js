// Space Battle OOP Lab
// ====================

// AlienShips' name list
const noOfAlienShips = 6;
const alienShipNames = ["Nebulon", "Xylarian", "Zorgon", "Arcturus", "Krylon", "Orion"];
const earthShipName = "US_AIREX";


// Creating the base ship class  
class Ship {
    constructor (type, name, hull, firepower, accuracy) {
        this.type = type;
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    shoot(opponent) {
           //Math.random() is to generate a random number between 0 or 1 
        if (Math.random() < this.accuracy) {
            opponent.hull -= this.firepower;
            return true; // Shooter hit the opponent
        }
        return false; // Miss the opponent ship
    }
    
    isDestroy() {
        // If hull reaches 0 or less, the ship is destroyed
        return this.hull <= 0; 
    }
}

// Creating the EarthShip object 
const earthShip = new Ship ("USS",earthShipName, 20, 5, .7);
    console.log (earthShip);

// Creating the 6 AlienShip objects 
// Define an array to hold the AlienShips 
const alienShipArray = [];
// Define the no. of AlienShips


for (let ships=1; ships<=noOfAlienShips; ships++) {
    const hull = Math.floor(Math.random() * 4) + 3; // Range between 3 and 6
    const firepower = Math.floor(Math.random() * 3) + 2; // Range between 2 and 4
    const accuracy = Math.random() * 0.2 + 0.6; // Range between 0.6 and 0.8

    const alienShip = new Ship ("ALIEN", alienShipNames[ships-1],hull, firepower, accuracy);
    alienShipArray.push(alienShip);
}

console.log (alienShipArray.length)

// AlienShip Details 
alienShipArray.forEach((newShip) => {
    console.log (newShip);
})

//Checking EearthShip shoot
const earthShipShootResult = earthShip.shoot(alienShipArray[0]);
console.log (earthShipShootResult)

//Checking EearthShip shoot
const alienShipShootResult = alienShipArray[1].shoot(earthShip);
console.log (alienShipShootResult)