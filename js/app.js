// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 600) {
        this.x = -100;
        var setY = Math.floor(Math.random() * 3);//randomize bug columns
        if (setY === 0) {
            this.y = 62.25;
        } else if (setY === 1) {
            this.y = 145.25;
        } else if (setY === 2) {
            this.y = 228.25;
        }
    }

    //Collision detection +/- 50px
    if (Math.abs(this.x - player.x) <= 50 && this.y === player.y) {
        player.x = 202;
        player.y = 394.25;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 202;
    this.y = 394.25;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //Didn't end up using
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    if (e === 'left' && (this.x - 101 > -1)) {
        this.x = this.x - 101;
    } else if (e === 'right' && (this.x + 101 < 405)) {
        this.x = this.x + 101;
    } else if (e ==='up' && (this.y - 83 > 0)) {
        this.y = this.y - 83;
    } else if (e === 'up' && (this.y - 83 <= 0)) {
        this.x = 202;
        this.y = 394.25;
        console.log("CONGRATULATIONS, YOU WON!");
    } else if (e === 'down' && (this.y + 83 < 415)) {
        this.y = this.y + 83;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var e1 = new Enemy(-100, 62.25, 300);
var e2 = new Enemy(-100, 145.25, 200);
var e3 = new Enemy(-100, 228.25, 250);

allEnemies.push(e1);
allEnemies.push(e2);
allEnemies.push(e3);

var player = new Player();

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
