// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, and handles collisions with the player.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    var max_width = 505;
    // Variables to define the limits of enemies and player
    var leftEnemy, rightEnemy, topEnemy, bottomEnemy, leftPlayer, rightPlayer, topPlayer, bottomPlayer; 

    //Check if the enemy has reached the end of the screen and if that is the case, move it back 
    //to the beginning
    if (this.x >= max_width) {
        this.x = 0;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    
    this.x = this.x + (this.speed * dt);

    //Assigned enemy and player's limits to variables.

    leftEnemy = this.x;
    rightEnemy = this.x + 101;
    topEnemy = this.y + 27;
    bottomEnemy = this.y + 83;
    leftPlayer = player.x + 25;
    rightPlayer = player.x + 75;
    topPlayer = player.y + 21;
    bottomPlayer = player.y + 83;


    // Check for collisions (Found the algorithm on the forums).
    // If a collision occurs the game is reset and the score is decreased by 50 points.

    if (! (leftEnemy > rightPlayer || rightEnemy < leftPlayer || topEnemy > bottomPlayer  || bottomEnemy < topPlayer )) {
          player.reset();
          score.total = score.total - 50;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
}

//Do not know what to put on this method. In my program the method that updates 
//the position of the player is handleInput.
Player.prototype.update = function() {
}

//Draw the player in screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//This method is called when the player reaches the water. It moves
//the player back to its initial location.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
}

//This method receives user input (the key that was pressed) and moves
//the player accordingly. It also checks that the player does not 
//move off screen and if the player reaches the water, it calls the 
//reset method and add 100 to the score.
Player.prototype.handleInput = function (key) {
    var min_height = 0;
    var min_width = 0;
    var max_height = 415;
    var max_width = 404;
    var water_level = 83;
  
    switch (key) {
        case 'left' :  if (this.x > min_width) {
                        this.x = this.x - 101;
                       }
                       break;
        case 'up' :    if (this.y > min_height) {
                        if (this.y === water_level) {  //Player reaches the water
                            player.reset();
                            score.total = score.total + 100;
                        } else {
                            this.y = this.y - 83;
                        }                     
                       };
                       break;
        case 'right' : if (this.x < max_width) {
                        this.x = this.x + 101;
                       }
                       break;
        case 'down' :  if (this.y < max_height) {
                        this.y = this.y + 83;
                       }
                       break;
    }
}

//Score Class, this class requires a render method 
//to display the score in the right top corner.
//Every time the player reaches the water 100 points
//are added, and when it collides with an enemy 50 points are deducted.
var Score = function (total) {
    this.total = total;
}

Score.prototype.render = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeText (this.total,454,90);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = new Array();
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


