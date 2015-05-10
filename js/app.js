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
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 

    this.x = this.x + (this.speed * dt);

    // Check for collisions

    if (! (this.x > (player.x + 75) || (this.x + 101) < (player.x + 25) || (this.y + 27) > (player.y + 83)  || (this.y + 83) < (player.y + 21) )) {
          console.log ("Collision !");
          console.log ("Enemy left-top-right-bottom " + this.x + " , " + this.y + " , " + (this.x + 101) + " , " + (this.y +83));
          console.log ("Player left-top-right-bottom " + player.x + " , " + player.y + " , " + (player.x + 101) + " , " + (player.y +83));
          player.reset();
          console.log ("Game reset !");
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
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    // console.log ("Position of player " + player.x + " , " + player.y);

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//This method is called when the player reaches the water. It moves
//the player back to its initial location.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
}

//This method receive user input (the key that was pressed) and moves
//the player accordingly. It also checked that the player does not 
//move off screen and if the player reaches the water, it calls the 
//reset method.
Player.prototype.handleInput = function (key) {
    var min_height = 0;
    var min_width = 0;
    var max_height = 415;
    var max_width = 404;
  
    switch (key) {
        case 'left' :  if (this.x > min_width) {
                        this.x = this.x - 101;
                       }
                       break;
        case 'up' :    if (this.y > min_height) {
                        if (this.y === 83) {
                            player.reset();
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
allEnemies[0] = new Enemy(0,83,50);
allEnemies[1] = new Enemy(0,166,70);
allEnemies[2] = new Enemy(0,249,90);
var player = new Player(202,415);



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


