// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Enemy x,y location
    this.x = x; 
    this.y = y; 
    //Enemy limits
    this.leftEnemy = x;
    this.rightEnemy = x + 101;
    this.topEnemy = y + 27;
    this.bottomEnemy = y + 83;
   
    this.speed = speed;
};

// Update the enemy's position and limits.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    var MAX_WIDTH = 505;

    //Check if the enemy has reached the end of the screen and if that is the case, move it back 
    //to the beginning
    if (this.x >= MAX_WIDTH) {
        this.x = 0;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    
    this.x = this.x + (this.speed * dt);

    //Update enemy limits

    this.leftEnemy = this.x;
    this.rightEnemy = this.x + 101;   
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collisions (Found the algorithm on the forums).
// If a collision occurs the game is reset and the score is decreased by 50 points.

function checkCollisions () {
    allEnemies.forEach(function(enemy) {
        
        if (! (enemy.leftEnemy > player.rightPlayer || enemy.rightEnemy < player.leftPlayer || enemy.topEnemy > player.bottomPlayer  || enemy.bottomEnemy < player.topPlayer )) {
            player.reset();
            score.total = score.total - 50;
        }
    });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x,y) {
    this.sprite = 'images/char-cat-girl.png';
    //Player x,y location
    this.x = x;
    this.y = y;
    //Player limits
    this.leftPlayer = x + 25;
    this.rightPlayer = x + 75;
    this.topPlayer = y + 21;
    this.bottomPlayer = y + 83;

};

//Update player's limits.
Player.prototype.update = function() {
    //Update player limits
    this.leftPlayer =  this.x + 25;
    this.rightPlayer = this.x + 75;
    this.topPlayer = this.y + 21;
    this.bottomPlayer = this.y + 83;
};

//Draw the player in screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This method is called when the player reaches the water or when she collides with
//an enemy. It moves the player back to its initial location.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
};

//This method receives user input (the key that was pressed) and moves
//the player accordingly. It also checks that the player does not 
//move off screen and if the player reaches the water, it calls the 
//reset method and add 100 to the score.
Player.prototype.handleInput = function (key) {
    var MIN_HEIGHT = 0;
    var MIN_WIDTH = 0;
    var MAX_HEIGHT = 415;
    var MAX_WIDTH = 404;
    var REC_WIDTH = 101;
    var REC_HEIGHT = 83;
    var WATER_LEVEL = 83;
  
    switch (key) {
        case 'left' :  if (this.x > MIN_WIDTH) {
                        this.x = this.x - REC_WIDTH;
                       }
                       break;
        case 'up' :    if (this.y > MIN_HEIGHT) {
                        if (this.y === WATER_LEVEL) {  //Player reaches the water
                            this.reset();
                            score.total = score.total + 100;
                        } else {
                            this.y = this.y - REC_HEIGHT;
                        }                     
                       }
                       break;
        case 'right' : if (this.x < MAX_WIDTH) {
                        this.x = this.x + REC_WIDTH;
                       }
                       break;
        case 'down' :  if (this.y < MAX_HEIGHT) {
                        this.y = this.y + REC_HEIGHT;
                       }
                       break;
    }
};

//Score Class, this class requires a render method 
//to display the score in the right top corner.
//Every time the player reaches the water 100 points
//are added, and when it collides with an enemy 50 points are deducted.
var Score = function (total) {
    this.total = total;
};

Score.prototype.render = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeText (this.total,454,90);
};                                                                                                       

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies[0] = new Enemy(101,83,130);
allEnemies[1] = new Enemy(0,166,120);
allEnemies[2] = new Enemy(202,166,100);
allEnemies[3] = new Enemy(0,249,110);
var player = new Player(202,415);
var score = new Score(0);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


