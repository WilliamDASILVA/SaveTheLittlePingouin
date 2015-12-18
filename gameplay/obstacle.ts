var _obstacles = [];

class Obstacle extends Elements{
	constructor(world : any, obstacleType : string){
		super(0, false);

		this.setType("ground");
		this.canCollideWith("player");
		this.setFixedRotation(true);
		this.damping = 0;

		var shape = new p2.Box({ width: 50, height: 50 });
		this.addShape(shape);
		this.shapes[0].sensor = true;

		var drawable: any;
		var texture: any;

		
		texture = new Render.Texture("assets/hole_sprite.png");
		drawable = new Render.Sprite(texture, 0, 0, 150, 150, 64, 64, 5, 0);
		drawable.setFrameSpeed(5);
		drawable.setOffset(0, -50);

		this.setDepth(9);
		this.assignDrawable(drawable);


		if(world){
			world.addBody(this);
		}

		_obstacles.push(this);
	}
	destroy(){
		for (var i = _elements.length - 1; i >= 0; i--) {
			if(_elements[i] == this){
				_elements.splice(i, 1);
			}
		}
        
		for (var i = _obstacles.length - 1; i >= 0; i--) {
	        if(_obstacles[i] == this){
				_obstacles.splice(i, 1);
	        }
	    }

        delete this;
	}
}