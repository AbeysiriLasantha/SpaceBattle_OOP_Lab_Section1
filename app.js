// Space Battle OOP Lab
// ====================

// AlienShips' name list
const noOfAlienShips = 6;
const alienShipNames = ["Nebulon", "Xylarian", "Zorgon", "Arcturus", "Krylon", "Orion"];
const earthShipName = "US_AIREX";
let earthShip;
let alienShipArray = [];

//creat dom variables 
const shootBtn = document.getElementById("shoot")
const resetGameBtn = document.getElementById("retret");
const loadGameBtn = document.getElementById("loadgame");
const ussshipDiv=document.querySelector(".ussshipDiv");
const alienshipDiv=document.querySelector(".alienshipDiv");
const messageDiv = document.querySelector(".messageDiv");


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

function loadingGame() {
    // Creating the earthShip object 
    earthShip = new Ship ("USS",earthShipName, 20, 5, .7);

    // Creating the alienShip objects 
        for (let ships=1; ships<=noOfAlienShips; ships++) {
            const hull = Math.floor(Math.random() * 4) + 3; // Range between 3 and 6
            const firepower = Math.floor(Math.random() * 3) + 2; // Range between 2 and 4
            const accuracy = Math.random() * 0.2 + 0.6; // Range between 0.6 and 0.8

            const alienShip = new Ship ("ALIEN", alienShipNames[ships-1],hull, firepower, accuracy);
            alienShipArray.push(alienShip);
        }
    messageDisplay("Game is Loaded");
    displayShipStatus(earthShip);
    displayShipStatus(alienShipArray[0]);
}

// Display messages 
function messageDisplay(msgText) {
    messageDiv.innerHTML="";
    const message = document.createElement ('p');
    message.textContent = msgText;
    messageDiv.append(message);
}


function attack() {
    if (!earthShip) {
        console.error("EarthShip is not initialized.");
        return;
    }
    if (alienShipArray.length === 0) {
        console.error("No alien ships to attack.");
        return;
    }

    //Checking EearthShip shoot
    const earthShipShootResult = earthShip.shoot(alienShipArray[0]);
    console.log (earthShipShootResult)

    //Checking EearthShip shoot
    const alienShipShootResult = alienShipArray[1].shoot(earthShip);
    console.log (alienShipShootResult)
}

// AlienShip Details 
    alienShipArray.forEach((newShip) => {
    console.log (newShip);
    })

// Display ship status

    function displayShipStatus(ship) {
        const p1 = document.createElement ('p');
        p1.textContent="Ship Type: " + ship.type;
        const p2 = document.createElement ('p');
        p2.textContent="Ship Name: " + ship.name;
        const p3 = document.createElement ('p');
        p3.textContent="Hulls Remaining: " + ship.hull;
        const p4 = document.createElement ('p');
        p4.textContent="Firepower: " + ship.firepower;
        const p5 = document.createElement ('p');
        p5.textContent="Accuracy: " + ship.accuracy;
        
        if (ship.type === "USS") {
            ussshipDiv.innerHTML="";
            ussshipDiv.append(p1,p2,p3,p4,p5);
        } else if (ship.type === "ALIEN"){
            alienshipDiv.innerHTML="";
            alienshipDiv.append(p1,p2,p3,p4,p5);
        }

    }

// Event Listners
    loadGameBtn.addEventListener ("click", loadingGame);
    shootBtn.addEventListener ("click", attack);