// Enemies our player must avoid
var Enemy = function(bugInitialX, bugInitialY, speed) {
	//initial location, speed and image
	this.x = bugInitialX;
	this.y = bugInitialY;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
	};

Enemy.prototype.update = function(dt) {
// Update x, multiplied by speed and dt to regularize speed.
// when bug reaches the edge of the canvas restart on the left with a random Speed
	this.x += this.speed * dt;
	
	if (this.x >= 505) {
		this.x = -60;
		this.randomSpeed();
		}
	
//collisions with player defined by pixel zone around bug
	var bugLeft = this.x - 60;
	var bugRight = this.x + 60;
	var bugTop = this.y - 60;
	var bugBottom = this.y +60;
	
	if (player.x >= bugLeft && player.x <= bugRight && player.y >= bugTop && player.y <= bugBottom)
		{
		player.reset();
		}
};

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function() {
	this.speed = 75 * (Math.floor(Math.random()*5 +1));
};

//Player

var PLAYER_X = 200;
var PLAYER_Y = 400;

var Player = function() {
	// Player initial coordinates
	this.x = PLAYER_X;
	this.y = PLAYER_Y;
	this.sprite = 'images/char-princess-girl.png';
	};

Player.prototype.update = function() {
	if (this.y < 80) {
		this.reset();
	}
	if (this.y > 420 ) {
		this.y = 420;
	}
	if (this.x > 420) {
		this.x = 420;
	}
	if (this.x < 0) {
		this.x = 0;
	}
};

Player.prototype.reset = function() {
	this.x = PLAYER_X;
	this.y = PLAYER_Y;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
	var STEP_X = 40;
	var STEP_Y = 40;
	
	if (keyPressed === 'left') {
		this.x -= STEP_X;
	} else if (keyPressed === 'right') {
		this.x += STEP_X;
	} else if (keyPressed === 'up' ) {
		this.y -= STEP_Y;
	} else if (keyPressed === 'down') {
		this.y += STEP_Y;
	} else {
		console.log ('Invalid Key');
		return null;
	}
};

allEnemies = [
	new Enemy (-50, 200, 80),
	new Enemy (-50, 300, 50),
	new Enemy (-50, 100, 30)];
			   
// Place the player object in a variable called player
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
