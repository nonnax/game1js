// Id$ nonnax 2023-11-14 10:58:28 +0800
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH=canvas.width=2000;

const CANVAS_HEIGHT=canvas.height=1000;

const enemiesTemplate= [...Array(100).keys()];

let gameFrame = 0;

class Enemy{
	constructor(){
			this.image = new Image();
			this.image.src = 'enemy1.png';

		 this.speed=Math.random()*5 - 2;
		 this.spriteWidth = 293;
		 this.spriteHeight = 155;
		 this.width=this.spriteWidth/2.5;
		 this.height=this.spriteHeight/2.5;
		 this.x=Math.random() * (canvas.width-this.width);
		 this.y=Math.random() * (canvas.height-this.height);

		 this.frame=0;
		 this.flapSpeed=Math.floor(Math.random()*3+1);

	}
	update(){
			this.x+=Math.random()*7 - 3.5;
			this.y+=Math.random()*7 - 3.5;
			if (gameFrame % this.flapSpeed === 0){
				this.frame > 4 ? this.frame = 0 : this.frame++
			}
	}
	draw(){
		this.update();
		// ctx.strokeRect(this.x, this.y, this.width, this.height);
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
