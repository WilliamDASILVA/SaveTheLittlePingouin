class Ground extends Elements{
	private size: any;
	constructor(world :any, size : number){
		super(0);

		this.setType("ground");
		this.canCollideWith("player");
		this.setSize(size + 1000, 500);
		this.setFixedRotation(true);

		var shape = new p2.Box(this.getSize());
		this.addShape(shape);

		var texture = new Render.Draw.Rectangle(0, 0, this.getSize().width, this.getSize().height);
		texture.setColor("#F4F4F4");
		this.assignDrawable(texture);

		if(world){
			world.addBody(this);
		}

		this.setDepth(1);

	}

	setSize(width, height){
		this.size = { width: width, height: height };
	}

	getSize(){
		return this.size;
	}
}