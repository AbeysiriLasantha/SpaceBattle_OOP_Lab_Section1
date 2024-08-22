// Space Battle OOP Lab
// ====================

// AlienShips' name list
const noOfAlienShips = 6;
const alienShipNames = ["Nebulon", "Xylarian", "Zorgon", "Arcturus", "Krylon", "Orion"];
const earthShipName = "US_AIREX";
let earthShip;
let alienShipArray = [];
let remainingAlienShips;
let alienShipNo;

//creat dom variables 
const shootBtn = document.getElementById("shoot")
const resetGameBtn = document.getElementById("retret");
const loadGameBtn = document.getElementById("loadgame");
const ussshipDiv=document.querySelector(".ussshipDiv");
const alienshipDiv=document.querySelector(".alienshipDiv");
//const USAirexStatus = document.querySelector(".USAirexStatus");
const gameStatusDiv = document.querySelector(".gameStatusDiv");
const statusTitle = document.querySelector(".statusTitle");
const statusDisplayDiv = document.querySelector(".statusDisplayDiv");
const modalretret = document.getElementById('modalretret');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');



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
    playBackgroundMusic();
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
    //Initilize the  game control variable, number of alen ships & starting number of the array 
    remainingAlienShips=alienShipArray.length;
    alienShipNo=0
    //load the initial information to the front
    showPopup("Game is loading.....")
    messageDisplay("Game is Loaded");
    displayShipStatus(earthShip);
    displayShipStatus(alienShipArray[0]);
    gameStatus(remainingAlienShips,earthShip.hull);
    
}

// Display messages 
function messageDisplay(msgText) {
    //statusDisplayDiv.innerHTML="";
    statusDisplayDiv.replaceChildren();
    statusDisplayDiv.textContent="PROGRESS..."
    const message = document.createElement ('p');
    message.textContent = msgText;
    statusDisplayDiv.append(message);
}

//display the status of the game
function gameStatus(remainingAlians, earthShipRemainingHulls) {
    statusTitle.textContent= "Hulls Remaining...:" + earthShipRemainingHulls + "      Alien Space Ships Remaining...:"+ remainingAlians;
 }

//This function is used to run the game until 
//number of hull of the earthhip is 0 
//or
//remaining alien ships eqail to zero
function attack() {       
   //Check wether the game has been loaded
   if (!earthShip || alienShipArray.length === 0) {
        showPopup("Game is not initialized....")
        messageDisplay("Game is not initialized.");
        return;  
   }
   
   if (remainingAlienShips<=0||earthShip.isDestroy()) {
    showPopup("This game is over...load a new game...")
    messageDisplay("This game is over...load a new game");
    return;  
   }
   
    showPopup("US_AIREX is shootin...")
    //Shoot by earthship (US_AIREX)
    const earthShipShootResult = earthShip.shoot(alienShipArray[alienShipNo]);

    if(earthShipShootResult === true){
        showPopup("US_AIREX hit an alien...")
        messageDisplay("US_AIREX hit an alien"); 
             
        //Check the Alien shipe is destroyed
        if(alienShipArray[alienShipNo].isDestroy()){
            showPopup("Alen ship" + alienShipArray[alienShipNo].name + "is destroyed...")
            messageDisplay("Alen ship" + alienShipArray[alienShipNo].name + "is destroyed..");
            alienShipNo=alienShipNo+1;
            remainingAlienShips=remainingAlienShips-1;
            displayShipStatus(earthShip);
            //If the last alien ship is destroyed escape this 
            if(!remainingAlienShips<=0){
                displayShipStatus(alienShipArray[alienShipNo]);
            }            
            gameStatus(remainingAlienShips,earthShip.hull);
            return
        };
    //If US_AIREX missed the target
    } else {
        showPopup("US_AIREX missed the target")
        messageDisplay("US_AIREX missed the target") 
        showPopup("Alien ship"+  alienShipArray[alienShipNo].name + "is shootin...")
        const alienShipShootResult = alienShipArray[alienShipNo].shoot(earthShip);
        //check the status of the alienship attack
        if(alienShipShootResult === true) {
            showPopup("ALIEN hit the US_AIREX")
             messageDisplay ("ALIEN hit the US_AIREX");
             gameStatus(remainingAlienShips,earthShip.hull);
             displayShipStatus(earthShip);
             displayShipStatus(alienShipArray[alienShipNo]);
             
             //check whether the earthship (US_AIREX) is destroyed
             if(earthShip.isDestroy()){
                messageDisplay("US_AIREX is destroyed...Ganme Over");
                return
             }; 

        } 
    }    
    
}

// Display ship status
    function displayShipStatus(ship) {
        //const p1 = document.createElement ('p');
        //p1.textContent="Ship Type: " + ship.type;
        const p2 = document.createElement ('p');
        p2.textContent="Ship Name: " + ship.name;
        const p3 = document.createElement ('p');
        p3.textContent="Hulls Remaining: " + ship.hull;
        const p4 = document.createElement ('p');
        p4.textContent="Firepower: " + ship.firepower;
        const p5 = document.createElement ('p');
        p5.textContent="Accuracy: " + ship.accuracy;
        
        if (ship.type === "USS") {
            ussshipDiv.replaceChildren();
            ussshipDiv.textContent="USS ship Status"
            ussshipDiv.append(p2,p3,p4,p5);
        } else if (ship.type === "ALIEN"){
            alienshipDiv.replaceChildren();
            alienshipDiv.textContent="Next Alien Ship"
            alienshipDiv.append(p2,p3,p4,p5);
        }

    }
//poup window for the game progress messages 
function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message; // Set the message
    popup.style.display = 'block'; // Show the popup

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 10000); // 3000 milliseconds = 3 seconds
}
 // Function to play background music
 function playBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    music.volume = 0.5; // Adjust volume (0.0 to 1.0)
    music.play(); // Start playing the music
}


// Event Listners
    //Load the game
    loadGameBtn.addEventListener ("click", loadingGame);
    //Shooting
    shootBtn.addEventListener ("click", attack);

    //Retret the game
    resetGameBtn.addEventListener('click', () => {
        modalretret.style.display = 'block';
        
    });
    //Reload the the game if user confirm it
    confirmBtn.addEventListener('click', () => {
        modalretret.style.display = 'none';
        loadingGame();
    }); 

    cancelBtn.addEventListener('click', () => {
        modalretret.style.display = 'none';
        
    });