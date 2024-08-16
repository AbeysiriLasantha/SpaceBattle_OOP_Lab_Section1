// Space Battle OOP Lab
// ====================

// Creating the base ship class  
class Ship {
    constructor (hull, firepower, accuracy) {
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
 
    destroyed() {
     // If hull reaches 0 or less, the ship is destroyed
     return this.hull <= 0; 
    }
}

// Creating the EarthShip object 
const earthShip = new Ship (20, 5, .7);
    console.log (earthShip);

// Creating the 6 AlianShip objects 
// Define an array to hold the AlianShips 
const alianShipArray = [];
// Define the no. of AlianShips
const noOfAlianShips = 6;

for (let ships=1; ships<=noOfAlianShips; ships++) {
    const hull = Math.floor(Math.random() * 4) + 3; // Range between 3 and 6
    const firepower = Math.floor(Math.random() * 3) + 2; // Range between 2 and 4
    const accuracy = Math.random() * 0.2 + 0.6; // Range between 0.6 and 0.8

    const alianShip = new Ship (hull, firepower, accuracy);
    alianShipArray.push(alianShip);
}

console.log (alianShipArray.length)

// AlianShip Details 
alianShipArray.forEach((newShip) => {
    console.log (newShip);
})