export function main(p5){

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


	p5.setup = _ =>{
		let elem = document.querySelector(".p5_container");
		let canvas = p5.createCanvas(window.innerWidth, window.innerHeight /2);
		
		canvas.parent(elem)
		canvas.style.width = "300px";

		nums = window.innerWidth * window.innerHeight / particleDensity;
		backgroundColor = p5.color(0);
		p5.background(backgroundColor);

		for(let i = 0; i < nums; i++){
			particles[i] = new Particle();
		}
	}






	p5.draw = _ => {
		p5.noStroke();
		
		++fadeFrame;
		
		if(fadeFrame % 5 == 0){
			invertColors ? p5.blendMode(p5.ADD) : p5.blendMode(p5.DIFFERENCE);

			p5.fill(1, 1, 1);
			p5.rect(0,0,p5.width,p5.height);

			invertColors ? p5.blendMode(p5.DARKEST) : p5.blendMode(p5.LIGHTEST);
			
			p5.fill(backgroundColor);
			p5.rect(0,0,p5.width,p5.height);
		}
		
		p5.blendMode(p5.BLEND);
		p5.smooth();
		
		for(let i = 0; i < nums; i++){
			let iterations = p5.map(i,0,nums,5,1);
			let radius = p5.map(i,0,nums,1,2);			
			
			particles[i].move(iterations);
			particles[i].checkEdge();
			
			let alpha = 255;
			let particleColor;
			let fadeRatio;
			
			fadeRatio = p5.min(particles[i].life * 5 / maxLife, 1);
			fadeRatio = p5.min((maxLife - particles[i].life) * 5 / maxLife, fadeRatio);
			
			let colorCase = visualMode;
			
			if(visualMode == 0) colorCase = p5.int(particles[i].pos.x / p5.width * 1) + 1;
			
			switch(colorCase){
				case 1:
					let lifeRatioGrayscale = p5.min(255, (255 * particles[i].life / maxLife) + p5.red(backgroundColor));
					particleColor = p5.color(lifeRatioGrayscale, alpha * fadeRatio);
					break;
				case 2:
					particleColor = particles[i].color;
					break;
				case 3:
					particleColor = p5.color(p5.blue(particles[i].color) + 70, p5.green(particles[i].color) + 20, p5.red(particles[i].color) - 50);
					break;
			}
			
			if(invertColors) particleColor = p5.color(255 - p5.red(particleColor), 255 - p5.green(particleColor), 255 - p5.blue(particleColor));
			
			p5.fill(p5.red(particleColor), p5.green(particleColor), p5.blue(particleColor), alpha * fadeRatio);
			particles[i].display(radius);
		} 
	}

	function Particle(){

		this.vel = p5.createVector(0, 0);
		this.pos = p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height));
		this.life = p5.random(0, maxLife);
		this.flip = p5.int(p5.random(0,2)) * 2 - 1;
		
		let randColor = p5.int(p5.random(0,3));
		
		switch(randColor)
		{
			case 0:
				this.color = p5.color(110,57,204);
				break;
			case 1:
				this.color = p5.color(7,153,242);
				break;
			case 2:
				this.color = p5.color(255,255,255);
				break;
		}
		
	// member functions
		this.move = (iterations) => {
			if((this.life -= 0.06667) < 0) this.respawn();
			while(iterations > 0){
				let angle = p5.noise(this.pos.x/noiseScale, this.pos.y/noiseScale)* p5.TWO_PI * noiseScale*this.flip;
				this.vel.x = p5.cos(angle);
				this.vel.y = p5.sin(angle);
				this.vel.mult(simulationSpeed);
				this.pos.add(this.vel);
				--iterations;
			}
		}

		this.checkEdge = () => {
			if(this.pos.x > p5.width || this.pos.x < 0 || this.pos.y > p5.height || this.pos.y < 0) this.respawn();
		}
		
		this.respawn = () => {
			this.pos.x = p5.random(0, p5.width);
			this.pos.y = p5.random(0, p5.height);
			this.life = maxLife;
		}

		this.display = (r) => {
			p5.ellipse(this.pos.x, this.pos.y, r, r);
		}
	}

	function advanceVisual(){
		visualMode = ++visualMode % numModes;
		
		if(visualMode == 0){
			invertColors = !invertColors;
			backgroundColor = invertColors ? p5.color(235, 235, 235) : p5.color(20, 20, 20);
		}
		
		p5.noiseSeed(p5.random()*Number.MAX_SAFE_INTEGER);
		p5.background(backgroundColor);
		
		for (let i = 0; i < nums; i++){
			particles[i].respawn();
			particles[i].life = p5.random(0,maxLife);
		}
	}

}