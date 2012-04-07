
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var height = canvas.height;
var width = canvas.width;

var MalletRadius = 30;
var DIRECTION;
var COLLIDEDISTANCE = 1;
var goalWidth = 160;
var play = false;
var ballSpeed = 5;
var FPS = 35;

closestpointonline = function(lx1, ly1, lx2, ly2, x0, y0){ 
     A1 = ly2 - ly1; 
     B1 = lx1 - lx2; 
     C1 = (ly2 - ly1)*lx1 + (lx1 - lx2)*ly1; 
     C2 = -B1*x0 + A1*y0; 
     det = A1*A1 - -B1*B1; 
     cx = 0; 
     cy = 0; 
     if (det !== 0){ 
         cx = (float)((A1*C1 - B1*C2)/det); 
         cy = (float)((A1*C2 - -B1*C1)/det); 
     }
     else{ 
         cx = x0; 
         cy = y0; 
     } 
     return {x:cx, y:cy}; 
};


function draw() {

    c.clearRect(0, 0, canvas.width, canvas.height);
	Game.puck.drawGeometry();
	Game.mallet.drawGeometry();

}

function Puck() {
		this.x = width/2;
		this.y = height/2;
		this.velocityX = 0;
		this.velocityY = 0;
		this.mass = 10;
		this.radius = 15;
	}

Puck.prototype = {
  checkBounds: function() {
      if (this.x <= 30 && this.y > (height-goalWidth) / 2 && this.y < (height-goalWidth)/2 + goalWidth) Game.onGoal("left");
      if (this.x >= width - PuckRadius && this.y > (height-goalWidth)/2 && this.y < (height-goalWidth) / 2 + goalWidth) Game.onGoal("right");

      if (this.x >= width - PuckRadius) {
          this.x = width - PuckRadius;
          this.xDirection = -1;
          this.onBoundHit();
      }
      if (this.x <= PuckRadius) {
         this.x = PuckRadius;
         this.xDirection = 1;
         this.onBoundHit();
      }
      if (this.y >= height - PuckRadius) {
         this.y = height - PuckRadius;
         this.yDirection = -1;
         this.onBoundHit();
      }
      if (this.y <= PuckRadius) {
         this.y = PuckRadius;
         this.yDirection = 1;
         this.onBoundHit();
      }
  },
  resolveCollide: function() {
  	    var d = closestpointonline(this.x, this.y, this.x + this.vx, this.y + this.vy, Game.mallet.x, Game.mallet.y);
        var closestdistsq = Math.pow(this.x - d.x, 2) + Math.pow(this.y - d.y, 2);
        if ( closestdistsq <= Math.pow(Game.mallet.radius + Game.mallet.radius, 2) ) {
  	        var backdist = Math.sqrt(Math.pow(this.radius + Game.mallet.radius, 2) - closestdistsq);
            var movementvectorlength = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
            var c_x = d.x - backdist * (this.vx / movementvectorlength);
            var c_y = d.y - backdist * (this.vy / movementvectorlength);
	
  },
  onBoundHit: function() {
      if (this.speed >= 4) this.speed-=this.speed*Game.puckDecreaseRate;
  },
  drawGeometry: function() {
		this.x = this.x + this.xDirection * this.speed;
		this.y = this.y + this.yDirection * this.speed; 
	  this.checkBounds();
	  this.resolveCollide(); 
      c.beginPath();
      c.arc(this.x, this.y, PuckRadius, 0, Math.PI*2, false);
      c.fillStyle = "red";
      c.fill();
  },
  init: function() {

  }
};

function Mallet() {}

Mallet.prototype = {
  checkBounds: function() {
      if (this.x <= width / 2 + 2.5 + MalletRadius)  this.x = width / 2 + 2.5 + MalletRadius;
      if (this.x >= width - MalletRadius)  this.x = width - MalletRadius; 
      if (this.y <= MalletRadius) this.y = MalletRadius;
      if (this.y >= height - MalletRadius) this.y = height - MalletRadius;
  },
  drawGeometry: function() {
	  this.checkBounds();

      c.beginPath();
      c.arc(this.x, this.y, MalletRadius, 0, Math.PI*2, false);
      c.fillStyle = "darkgreen";
      c.fill();

      c.beginPath();
      c.arc(this.x, this.y, MalletRadius/2, 0, Math.PI*2, false);
      c.fillStyle = "rgba(0, 0, 0, .5)";
      c.fill();
  },
  init: function() {
      this.x = width/2;
      this.y = height/2;
      this.xDirection = 0;
      this.yDirection = 0;
  }
};

Game = {
    mallet: new Mallet(),
    puck: new Puck(),
    puckDecreaseRate: 0.10,
    message: function(text) {
        c.shadowBlur = 0;
        c.fillStyle = 'rgba(0, 0, 0, .8)';
        c.fillRect(0, height/2-50, width, 100);
        c.strokeStyle = 'rgba(255, 255, 255, .8)';
        c.font = '50px Arial';
        c.strokeText('Click to Play!', width/2-140, height/2+20);
    },
    score: {
        "left": "0",
        "right": "0"
    },
    onGoal: function() {
        Game.pause();
        //GOAL//
    },
    initialize: function() {
        Game.puck.init();
        Game.mallet.init();
    },
    play: function() {
          this.loopContext = setInterval(function() {
               draw();
          }, 1000/FPS);
    },
    pause: function() {
          clearInterval(this.loopContext);
    }
};

c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.lineWidth = 10;

c.beginPath();
c.arc(width/2, height/2, 60, 0, Math.PI*2, false);
c.fillStyle = "#fff";
c.shadowBlur = 10;
c.shadowColor = "#000";
c.fill();

/////////////////
///Middle Line///
/////////////////

c.beginPath();
c.lineWidth= 5;
c.strokeStyle = "rgba(0, 0, 0, .5)";
c.moveTo(width/2, 0);
c.lineTo(width/2, height);
c.shadowBlur = 0;
c.closePath();
c.stroke();

///////////
///Goals///
///////////

c.shadowBlur = 5;
c.beginPath();
c.arc(0, height/2, 80, 180, Math.PI, false);
c.moveTo(width, height/2);
c.arc(width, height/2, 80, 90, Math.PI, false);
c.shadowColor   = "#000";
c.fill();

c.beginPath();
c.arc(0, height/2, 60, 180, Math.PI, false);
c.moveTo(width, height/2);
c.arc(width, height/2, 60, 90, Math.PI, false);
c.fill();

url=canvas.toDataURL("image/png");

canvas.style.background="url('"+url+"')";

Game.message("Click to play!");    

window.onmousemove = function mouseMoved(e) {
    x = e.pageX-canvas.offsetLeft;
    y = e.pageY-canvas.offsetTop;
    Game.mallet.x = x;
    Game.mallet.y = y;
};

canvas.onclick = function() {
    Game.play();
};