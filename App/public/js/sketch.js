
let particles = [];
let nums;
let particleDensity = 8000;
let noiseScale = 2400;
let maxLife = 1000;
let	simulationSpeed = 1.8;
let fadeFrame = 10;
let backgroundColor;
let visualMode = 0;
let numModes = 4;
let invertColors = false;


function setup() {
    let elem = document.querySelector(".p5_container")
    let canvas = createCanvas(window.innerWidth/3, window.innerHeight/3);
    
    canvas.parent(elem)
    canvas.style.width = "300px";
    canvas.style.width = "300px";


    nums = windowWidth * windowHeight / particleDensity;
	backgroundColor = color(2, 2, 2);
    background(backgroundColor);

    for(var i = 0; i < nums; i++){
		particles[i] = new Particle();
	}
}






function draw(){
	noStroke();
	
	++fadeFrame;
	if(fadeFrame % 5 == 0){
		if(invertColors){
			blendMode(ADD);
		} else {
			blendMode(DIFFERENCE);
		}
		fill(1, 1, 1);
		rect(0,0,width,height);

		if(invertColors){
			blendMode(DARKEST);
		} else {
			blendMode(LIGHTEST);
		}
		fill(backgroundColor);
		rect(0,0,width,height);
	}
	
	blendMode(BLEND);
	smooth();
	for(let i = 0; i < nums; i++){
		let iterations = map(i,0,nums,5,1);
		let radius = map(i,0,nums,1,2);			
		
		particles[i].move(iterations);
		particles[i].checkEdge();
		
		let alpha = 255;
		let particleColor;
		let fadeRatio;
		fadeRatio = min(particles[i].life * 5 / maxLife, 1);
		fadeRatio = min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
		let colorCase = visualMode;
		if(visualMode == 0)
		{
			colorCase = int(particles[i].pos.x / width * 1) + 1;
		}
		switch(colorCase)
		{
			case 1:
				let lifeRatioGrayscale = min(255, (255 * particles[i].life / maxLife) + red(backgroundColor));
				particleColor = color(lifeRatioGrayscale, alpha * fadeRatio);
				break;
			case 2:
				particleColor = particles[i].color;
				break;
			case 3:
				particleColor = color(blue(particles[i].color) + 70, green(particles[i].color) + 20, red(particles[i].color) - 50);
				break;
		}
		if(invertColors){
			particleColor = color(255 - red(particleColor), 255 - green(particleColor), 255 - blue(particleColor));
		}
		fill(red(particleColor), green(particleColor), blue(particleColor), alpha * fadeRatio);
		particles[i].display(radius);
	} 
}

function Particle(){
// member properties and initialization
	this.vel = createVector(0, 0);
	this.pos = createVector(random(0, width), random(0, height));
	this.life = random(0, maxLife);
	this.flip = int(random(0,2)) * 2 - 1;
	let randColor = int(random(0,3));
	switch(randColor)
	{
		case 0:
			this.color = color(110,57,204);
			break;
		case 1:
			this.color = color(7,153,242);
			break;
		case 2:
			this.color = color(255,255,255);
			break;
	}
	
// member functions
	this.move = function(iterations){
		if((this.life -= 0.06667) < 0)
			this.respawn();
		while(iterations > 0){
			let angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale*this.flip;
			this.vel.x = cos(angle);
			this.vel.y = sin(angle);
			this.vel.mult(simulationSpeed);
			this.pos.add(this.vel);
			--iterations;
		}
	}

	this.checkEdge = function(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.respawn();
		}
	}
	
	this.respawn = function(){
		this.pos.x = random(0, width);
		this.pos.y = random(0, height);
		this.life = maxLife;
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}

function advanceVisual()
{
	visualMode = ++visualMode % numModes;
	if(visualMode == 0){
		invertColors = !invertColors;
		backgroundColor = invertColors ? color(235, 235, 235) : color(20, 20, 20);
	}
	noiseSeed(random()*Number.MAX_SAFE_INTEGER);
	background(backgroundColor);
	for(let i = 0; i < nums; i++){
		particles[i].respawn();
		particles[i].life = random(0,maxLife);
  }
}

function keyPressed()
{
	advanceVisual();
}

function touchStarted()
{
	advanceVisual();
}