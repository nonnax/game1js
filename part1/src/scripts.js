// Id$ nonnax 2023-11-13 18:08:55 +0800
let playerState = "run";

const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', e=>{
		playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src ="shadow_dog.png";

const spriteWidth  = 575,  //6876/12
						spriteHeight = 523; //5230/10

let gameFrame=0;
const staggerFrames=5;

const spriteAnimations={};

const animStates={
	idle: 7,
	jump: 7,
	fall: 7,
	run: 9,
	dizzy: 11,
	sit: 5,
	roll: 7,
	bite: 7,
	ko: 12,
	getHit:4,
}


Object.keys(animStates).forEach((k, index)=>{

 //populate loc
	let frames =
	[...Array(animStates[k]).keys()].map(i =>{
			 let px = i * spriteWidth,
			     py = index * spriteHeight;
			 return {x: px, y: py};
		});

	spriteAnimations[k]=frames;
});

// console.log(spriteAnimations);

function animate(){
	ctx.clearRect(0, 0, CANVAS_WIDTH,	CANVAS_HEIGHT);
	let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].length;
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState][position].y;

	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
 gameFrame++;
	requestAnimationFrame(animate);
}

animate();
