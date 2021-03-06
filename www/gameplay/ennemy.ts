var _ennemies = [];

class Ennemy extends Elements{

	hasBeenCaptured: boolean;

	constructor(world : any){
		super(0);

		this.setType("ennemy");
		this.canCollideWith("player");
		this.setFixedRotation(true);
		this.damping = 0;

		var shape = new p2.Box({width : 200, height : 188});
		this.addShape(shape);
		this.shapes[0].sensor = true;

		this.hasBeenCaptured = false;

		var texture = new Render.Texture("assets/spriter/ennemy.png");
		var sprite = new Render.Sprite(texture, 0, 0, 200,188, 83, 78, 20, 0);
		sprite.setFrameSpeed(60);
		sprite.setOffset(0, -60);
		this.assignDrawable(sprite);

		if(world ){
			world.addBody(this);
		}

		this.setDepth(2);

		_ennemies.push(this);

	}

	
	isCaptured(){
		return this.hasBeenCaptured;
	}

	setCaptured(value:boolean){
		this.hasBeenCaptured = value;
	}

	destroy(){
		for (var i = _elements.length - 1; i >= 0; i--) {
			if(_elements[i] == this){
				_elements.splice(i, 1);
			}
		}
        
		for (var i = _ennemies.length - 1; i >= 0; i--) {
	        if(_ennemies[i] == this){
				_ennemies.splice(i, 1);
	        }
	    }

        delete this;
	}
}