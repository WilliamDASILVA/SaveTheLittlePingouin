var _endFlags = [];

class EndFlag extends Elements{
	constructor(world : any){
		super(0);

		this.setType("endFlag");
		this.canCollideWith("player");

		var texture = new Render.Texture("assets/end.png");
		var sprite = new Render.Sprite(texture, 0, 0, 180,180, 64,64, 4, 0);
		sprite.setFrameSpeed(12);
		sprite.setOffset(0, -120);
		this.assignDrawable(sprite);

		var shape = new p2.Box({ width: 180, height: 180 });
		this.addShape(shape);
		this.shapes[0].sensor = true;


		if(world){
			world.addBody(this);
		}

		_endFlags.push(this);
	}

	destroy(){
		for (var i = _elements.length - 1; i >= 0; i--) {
			if(_elements[i] == this){
				_elements.splice(i, 1);
			}
		}
        
		for (var i = _endFlags.length - 1; i >= 0; i--) {
	        if(_endFlags[i] == this){
				_endFlags.splice(i, 1);
	        }
	    }

        delete this;
	}
}