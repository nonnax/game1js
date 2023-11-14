#!/usr/bin/env node
// Id$ nonnax 2023-11-13 23:40:04 +0800
let gameSpeed=26;
const speedControl = document.getElementById('speedControl');
const speedDisplay = document.getElementById('speedDisplay');
speedControl.addEventListener('input', e=>{
  gameSpeed=e.target.value;
  speedDisplay.textContent = e.target.value;
});
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 2000;
const CANVAS_HEIGHT = canvas.height = 1000;
// const CANVAS_WIDTH = canvas.width = document.documentElement.clientWidth-200;
// const CANVAS_HEIGHT = canvas.height = document.documentElement.clientHeight - 300;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';


class Layer{
  constructor(image, speedMod){
    this.x=0;
    this.y=0;
    this.width=2000;
    this.height=1000;
    this.image=image;
    this.speedMod=speedMod;
    this.speed=gameSpeed * this.speedMod;
  }
  update(){
    this.speed = gameSpeed * this.speedMod;
    if (this.x <= -this.width){
      this.x = 0;
    };
    this.x = Math.floor(this.x-this.speed);
    // this.x2 = Math.floor(this.x2-this.speed);
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
  }
}

layer1 = new Layer(backgroundLayer1, 0.5);
layer2 = new Layer(backgroundLayer2, 0.6);
layer3 = new Layer(backgroundLayer3, 0.7);
layer4 = new Layer(backgroundLayer4, 0.8);
layer5 = new Layer(backgroundLayer5, 1);

const backgroundLayers = [
  layer1,
  layer2,
  layer3,
  layer4,
  layer5,
];

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  backgroundLayers.forEach(e=>{
    e.update();
    e.draw();
  })
	requestAnimationFrame(animate);
};

animate();
