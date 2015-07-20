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
	// when bug reaches the edge of the canvase restart on the left with a random Speed
	this.x += this.speed * dt;
	
	if (this.x >= 505) {
		this.x = -60;
		this.randomSpeed();
		}
	
	//collisions with player defined by pixel zone around bug
	var bugLeft = this.x - 50;
	var bugRight = this.x + 50;
	var bugTop = this.y - 50;
	var bugBottom = this.y +50;
	
	if (player.x > bugLeft && player.x < bugRight && player.y > bugTop && player.y < bugBottom)
		{
		player.reset();
		}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function() {
	this.speed = 75 * (Math.floor(Math.random()*5 +1));
};

//Player

var playerInitialX = 200;
var playerInitialY = 400;

var Player = function() {
	// Player initial coordinates
	this.x = playerInitialX;
	this.y = playerInitialY;
	this.sprite = 'images/char-princess-girl.png';
	};

Player.prototype.update = function() {
	if (player.y < 0) {
		player.reset();
	}
	if (player.y > 420 ) {
		player.y = 420;
	}
	if (player.x > 420) {
		player.x = 420;
	}
	if (player.x < 0) {
		player.x = 0;
	}
};

Player.prototype.reset = function() {
	this.x = playerInitialX;
	this.y = playerInitialY;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
	var stepHorizontal = 40;
	var stepVertical = 40;
	
	if (keyPressed === 'left') {
		player.x -= stepHorizontal;
	} else if (keyPressed === 'right') {
		player.x += stepHorizontal;
	} else if (keyPressed === 'up' ) {
		player.y -= stepVertical;
	} else if (keyPressed === 'down') {
		player.y += stepVertical;
	} else {
		console.log ('Invalid Key');
		return null;
	}
};

allEnemies = [
	new Enemy (-50, 200, 80),
	new Enemy (-50, 300, 50),
	new Enemy (-50, 100, 30)]
			   
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
