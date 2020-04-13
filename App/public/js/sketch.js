export function main(p5){

	let objects = [
        {
           speed: 0.02,
           angle : 20,
           size : 880,
           pos : {
               x : 0,
               y : 0,
               z : 0
           },
           shape : 0
        },
        {
           speed: 0.005,
           angle : 0,
           size : 900,
           pos : {
               x : 120,
               y : 20,
               z : 0
           },
           shape : 0
        },
        {
           speed: 0.008,
           angle : 120,
           size : 790,
           pos : {
               x : 230,
               y : 0,
               z : 40
           },
           shape : 1
        },
        {
           speed: 0.01,
           angle : 290,
           size : 670,
           pos : {
               x : -230,
               y : 0,
               z : 30
           },
           shape : 2
        },
    ]

    let hueVal = 0 ;

	p5.setup = () => {	
		let elem = document.querySelector(".childContainer");
		let canvas = p5.createCanvas(window.innerWidth, window.innerHeight /2, p5.WEBGL);
		canvas.parent(elem)
		canvas.style.width = "1920px";

        p5.noFill()
        p5.background(255)
        p5.colorMode(p5.HSB)
        p5.stroke(290, 82, 78)
	}

	p5.draw = () => {
		
		//push()
		//fill(255,15)
		//rect(-width/2,-height/2,width,height)
		//pop()

		p5.push()
		p5.fill(267, 9, 13, .03)
		p5.rotate(p5.map(p5.sin(hueVal), -1, 1, 0, p5.TWO_PI * 4))
		p5.box(1000)
		//box(map(cos(hueVal * 6), -1, 1, 0, 1000))
		p5.pop()


		hueVal += 0.02;
		let hue = p5.map(p5.cos(hueVal), -1, 1, 290, 360)
		p5.stroke(hue, 82, 78)
		

		for (let obj of objects){
			p5.push()
			p5.translate(0, 0, 0);
			p5.rotateX(obj.angle + p5.cos(p5.frameCount * obj.speed));
			p5.rotateY(obj.angle + p5.sin(p5.frameCount * obj.speed));

			p5.box(obj.size)
			//if (obj.shape == 0)
			//if (obj.shape = 1) sphere(obj.size)
			//if (obj.shape == 2) cone(obj.size, obj.size / 4)

			p5.pop()
		}
	}

}