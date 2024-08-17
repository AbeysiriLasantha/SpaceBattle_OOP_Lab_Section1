// Space Battle OOP Lab
// ====================

// AlienShips' name list
const noOfAlienShips = 6;
const alienShipNames = ["Nebulon", "Xylarian", "Zorgon", "Arcturus", "Krylon", "Orion"];
const earthShipName = "US_AIREX";
let earthShip;
let alienShipArray = [];
let remainingAlienShips;

//creat dom variables 
const shootBtn = document.getElementById("shoot")
const resetGameBtn = document.getElementById("retret");
const loadGameBtn = document.getElementById("loadgame");
const ussshipDiv=document.querySelector(".ussshipDiv");
const alienshipDiv=document.querySelector(".alienshipDiv");
const messageDiv = document.querySelector(".messageDiv");
const gameStatusDiv = document.querySelector(".gameStatusDiv");


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

// Generate random numbers 
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

function loadingGame() {
    // Creating the earthShip object 
    earthShip = new Ship ("USS",earthShipName, 20, 5, .7);
    
    // Creating the alienShip objects 
    alienShipArray = [];
        for (let ships=1; ships<=noOfAlienShips; ships++) {
            const hull = generateRandomNumber(3,6); // Range between 3 and 6
            const firepower =  generateRandomNumber(2,4); // Range between 2 and 4
            const accuracy =  generateRandomNumber(0.6, 0.8); // Range between 0.6 and 0.8

            const alienShip = new Ship ("ALIEN", alienShipNames[ships-1],hull, firepower, accuracy);
            alienShipArray.push(alienShip);
        }

    remainingAlienShips=alienShipArray.length;
    //load the initial information to the front
    messageDisplay("Game is Loaded");
    displayShipStatus(earthShip);
    displayShipStatus(alienShipArray[0]);
    gameStatus(remainingAlienShips,earthShip.hull);
}

// Display messages 
function messageDisplay(msgText) {
    messageDiv.innerHTML="";
    const message = document.createElement ('p');
    message.textContent = msgText;
    messageDiv.append(message);
}

//display the status of the game
function gameStatus(remainingAlians, earthShipRemainingHulls) {
    gameStatusDiv.innerHTML="";
    const p1 = document.createElement('p');
    p1.textContent = "Remaining Alien Ships: " + remainingAlians;
    gameStatusDiv.append(p1);

    const p2 = document.createElement('p');
    p2.textContent = "Remaining Hulls of Earth Ship: " + earthShipRemainingHulls;
    gameStatusDiv.append(p2);
}

function validateGameStatus(){
    //remaining hull of the earthship
    //remaninng alien ship
    //if all true then call function attack

}



function attack() {
    
    messageDisplay ("Game Started...");
   //Check wether the game has been loaded
    if (!earthShip) {
        messageDisplay ("EarthShip is not initialized."); 
        return;
    }

    if (alienShipArray.length === 0) {
        messageDisplay ("No alien ships to attack.");  
        return;
    }

    //Checking EearthShip shoot
    const earthShipShootResult = earthShip.shoot(alienShipArray[0]);
    if(earthShipShootResult === true){
        messageDisplay("US_AIREX hit an alien"); 
    } else {
        messageDisplay("US_AIREX missed the target") 
    }
    setTimeout(function() {
    }, 1000);

    //Checking EearthShip shoot
    const alienShipShootResult = alienShipArray[1].shoot(earthShip);
    if(alienShipShootResult === true) {
        messageDisplay ("ALIEN hit the US_AIREX");
    } else {
        messageDisplay ("ALIEN missed the target");
    }
}



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