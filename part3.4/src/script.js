// Id$ nonnax 2023-11-14 10:58:28 +0800
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH=canvas.width=2000;

const CANVAS_HEIGHT=canvas.height=1000;

const numberOfEnemies=20;
const enemiesTemplate= [...Array(numberOfEnemies).keys()];

let gameFrame = 0;
let mouseX=0;
let mouseY=0;

document.addEventListener('mousedown', function(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

class Enemy{
	constructor(){
			this.image = new Image();
			this.image.src = 'enemy4.png';
			this.speed=Math.random()*4 + 1;
			this.spriteWidth = 213;
			this.spriteHeight = 213;
			this.width=this.spriteWidth/2;
			this.height=this.spriteHeight/2;
			this.x=Math.random() * (canvas.width-this.width);
			this.y=Math.random() * (canvas.height-this.height);
			this.newX=Math.random() * (canvas.width-this.width);
			this.newY=Math.random() * (canvas.height-this.height);
			this.frame=0;
			this.flapSpeed = Math.floor(Math.random()*3+1);
			this.interval  = ~~(Math.random() * 200+50);
 	}
	update(){
	  if (gameFrame % this.interval === 0){
	  		this.newX = Math.random() * (canvas.width - this.width);
	  		this.newY = Math.random() * (canvas.height - this.height);
	  }
	  else {
	  	 this.newX=mouseX-this.width/2;
	  	 this.newY=mouseY-this.height/2;
	  }

	  let dx = this.x - this.newX;
	  let dy = this.y - this.newY;
	  this.x -= dx/10;
	  this.y -= dy/10;

	  if (this.x + this.width < 0) this.x = canvas.width;

			if (gameFrame % this.flapSpeed === 0){
				this.frame > 4 ? this.frame = 0 : this.frame++;
			}
	}
	draw(){
		this.update();
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
		this.spriteWidth, this.spriteHeight,	this.x, this.y, this.width, this.height)
	}
};

const enemiesArray = enemiesTemplate.map(e=>new Enemy());

function animate(){
	 ctx.clearRect(0, 0, CANVAS_WIDTH,	CANVAS_HEIGHT);
	 enemiesArray.forEach(e=>e.draw());
	 gameFrame++;
	 requestAnimationFrame(animate);
}

animate();
