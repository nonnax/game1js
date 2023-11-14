// Id$ nonnax 2023-11-14 10:58:28 +0800
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH=canvas.width=2000;

const CANVAS_HEIGHT=canvas.height=1000;

const numberOfEnemies=10;
const enemiesTemplate= [...Array(numberOfEnemies).keys()];

let gameFrame = 0;

class Enemy{
	constructor(){
			this.image = new Image();
			this.image.src = 'enemy2.png';
		 this.speed=Math.random()*15 + 1;
		 this.spriteWidth = 266;
		 this.spriteHeight = 188;
		 this.width=this.spriteWidth/2.5;
		 this.height=this.spriteHeight/2.5;
		 this.x=Math.random() * (canvas.width-this.width);
		 this.y=Math.random() * (canvas.height-this.height);

		 this.frame=0;
		 this.flapSpeed=Math.floor(Math.random()*3+1);
		 this.angle=0;
		 this.angleSpeed=Math.random()*0.1;
			this.waveCurve=Math.random()*15;
	}
	update(){
			this.x -= this.speed;
			this.y += this.waveCurve * Math.sin(this.angle);

			if (this.y + this.height > canvas.height) this.y = canvas.height-this.height; // prevent overlap
			if (this.y < 0) this.y = 0;

		 if (this.x + this.width < 0) this.x = canvas.width;
			this.angle+=this.angleSpeed;

			if (gameFrame % this.flapSpeed === 0){
				this.frame > 4 ? this.frame = 0 : this.frame++
			}
	}
	draw(){
		this.update();
		ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
		this.spriteWidth, this.spriteHeight,	this.x, this.y, this.width, this.height)
		// if (this.y < 0) ctx.fillText(String(this.y), this.x, this.y);

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
