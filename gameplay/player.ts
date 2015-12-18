class Player extends Elements{
	private health: number;
	private size: any;

	constructor(world : any){
		super(100, false);

		this.setType("player");
		this.canCollideWith("ground", "ennemy", "endFlag");
		this.setFixedRotation(true);

		this.size = { width: 120, height: 92 };

		this.health = 100; 

		var texture = new Render.Texture("assets/spriter/walking_pingouin.png");
		var sprite = new Render.Sprite(texture, 0, 0, this.size.width, this.size.height, 78, 59, 20, 0);
		sprite.setFrameSpeed(60);
		this.assignDrawable(sprite);

		var shape = new p2.Box(this.size);
		this.addShape(shape);

		this.setDepth(1000);



		if(world){
			world.addBody(this);
		}
	}

	takeHealth(value :number){
		if (this.health - value <= 0) {
			this.health = 0;
			console.log("DEAD");
		}
		else{
			this.health = this.health - value;
		}
	}

	addHealth(value : number){
		this.health = this.health + value;
	}

	getHealth(){
		return this.health;
	}

	resetLocalStats(){
		this.health = 100;
	}
}